package com.rosy.minervia.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.constant.AIConstants;
import com.rosy.common.core.redis.RedisCache;
import com.rosy.minervia.config.properties.BaiduAIProperties;
import com.rosy.minervia.domain.dto.MpRequest;
import com.rosy.minervia.domain.entity.*;
import com.rosy.minervia.domain.vo.MpAnswer;
import com.rosy.minervia.service.IAIService;
import com.rosy.minervia.service.IModelsService;
import com.rosy.minervia.service.IRecordsService;
import com.rosy.minervia.service.IWxLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@EnableConfigurationProperties(BaiduAIProperties.class)
public class IAIServiceImpl implements IAIService {
    @Autowired
    RedisCache redisCache;
    @Autowired
    WebClient webClient;
    @Autowired
    BaiduAIProperties baiduAIProperties;
    @Autowired
    IModelsService modelsService;
    @Autowired
    IWxLoginService wxLoginService;
    @Autowired
    IRecordsService recordsService;

    /**
     * 服务端支持多轮对话，所以需要传递sessionKey
     *
     * @param mpRequest  小程序请求
     * @param sessionKey 会话标识
     * @return 小程序回答
     */
    @Override
    public MpAnswer chat(MpRequest mpRequest, String sessionKey) {
        String openId = wxLoginService.getOpenIdBySessionKey(sessionKey);

        //1.先去进行AI大模型调用认证
        String accessToken = getAccessToken();
        //2.根据小程序传递的模型名称，去查询这个模型的信息
        Models model = getModel(mpRequest.getModelName());
        //3.读取当前对话的上下文信息
        List<AIChatMessage> messages = loadChatMessages(mpRequest.getSessionId());
        //4.构建请求参数
        String content;
        if (AIConstants.AI_MESSAGE_TYPE_QUESTION.equals(mpRequest.getType())) {
            content = String.format(model.getQuestionPrompt(), mpRequest.getContent());
        } else if (AIConstants.AI_MESSAGE_TYPE_ANSWER.equals(mpRequest.getType())) {
            content = String.format(model.getAnswerPrompt(), mpRequest.getContent());
        } else {
            throw new RuntimeException("未知的消息类型");
        }
        messages.add(AIChatMessage.builder()
                .role(AIConstants.AI_ROLE_USER)
                .content(content)
                .build());
        //5.发起请求 调用AI接口
        URI uri = UriComponentsBuilder.fromUriString(model.getUrl())
                .queryParam("access_token", accessToken)
                .build()
                .toUri();
        AIResponseBody aiResponseBody = webClient
                .post()
                .uri(uri)
                .bodyValue(AIRequestBody.builder()
                        .messages(messages)
                        .system(model.getRole())
                        .userId(openId)
                        .build())
                .retrieve()
                .bodyToMono(AIResponseBody.class)
                .block();
        AIChatMessage answer = AIChatMessage.builder()
                .role(AIConstants.AI_ROLE_ASSISTANT)
                .content(Optional.ofNullable(aiResponseBody)
                        .map(AIResponseBody::getResult)
                        .orElse(""))
                .build();
        messages.add(answer);

        //6.保存对话信息
        saveMessages(messages.subList(messages.size() - 2, messages.size()), mpRequest, openId);

        return MpAnswer.builder()
                .type(AIConstants.QUESTION_TYPE_CHOICE)
                .content(answer.getContent())
                .build();
    }

    private void saveMessages(List<AIChatMessage> messages, MpRequest mpRequest, String openId) {
        // 保存到缓存
        redisCache.setCacheList(AIConstants.AI_SESSION_PREFIX + mpRequest.getSessionId(), messages);
        // 保存到数据库
        recordsService.saveChatMessages(messages, mpRequest, openId);
    }

    private List<AIChatMessage> loadChatMessages(String sessionId) {
        List<AIChatMessage> messages = redisCache.getCacheList(AIConstants.AI_SESSION_PREFIX + sessionId);
        messages = Optional.ofNullable(messages)
                .filter(msgs -> !msgs.isEmpty())
                .orElseGet(() -> {
                    // 如果缓存中没有，就去数据库中查询
                    return loadChatMessagesFromDB(sessionId);
                });
        return Optional.ofNullable(messages)
                .filter(msgs -> !msgs.isEmpty())
                .orElse(new ArrayList<>());
    }

    private List<AIChatMessage> loadChatMessagesFromDB(String sessionId) {
        return recordsService.loadChatMessages(sessionId);
    }

    private Models getModel(String modelName) {
        modelName = Optional.ofNullable(modelName)
                .filter(name -> !name.isEmpty())
                .orElseGet(() -> AIConstants.DEFAULT_AI_MODEL_NAME);

        //从缓存中获取模型信息
        Models model = redisCache.getCacheMapValue(AIConstants.AI_MODELS_KEY, modelName);
        if (model == null) {
            // 如果缓存中没有，就去数据库中查询
            LambdaQueryWrapper<Models> queryWrapper = new LambdaQueryWrapper<Models>()
                    .eq(Models::getName, modelName);
            model = modelsService.getOne(queryWrapper);
            if (model != null) {
                // 更新缓存
                redisCache.setCacheMapValue(AIConstants.AI_MODELS_KEY, modelName, model);
            } else {
                // 模型不存在 抛出异常
                throw new RuntimeException("模型不存在");
            }
        }
        return model;
    }

    private String getAccessToken() {
        String accessToken = redisCache.getCacheObject(AIConstants.AI_ACCESS_TOKEN_KEY);
        return Optional.ofNullable(accessToken)
                .filter(token -> !token.isEmpty())
                .orElseGet(() -> {
                    // 构建 URI
                    URI uri = UriComponentsBuilder.fromUriString(baiduAIProperties.getAccessTokenUrl())
                            .queryParam("client_id", baiduAIProperties.getClientId())
                            .queryParam("client_secret", baiduAIProperties.getClientSecret())
                            .queryParam("grant_type", baiduAIProperties.getGrantType())  // 使用正确的 grant_type
                            .build()
                            .toUri();

                    BaiduAIAuthResponseBody authResponse = webClient
                            .post()
                            .uri(uri)
                            .retrieve()
                            .bodyToMono(BaiduAIAuthResponseBody.class)
                            .block();  // 阻塞直到获取到结果
                    if (authResponse == null) {
                        throw new RuntimeException("Failed to get access token from Baidu AI");
                    }

                    // 更新缓存并返回新的 accessToken
                    String newAccessToken = authResponse.getAccessToken();
                    redisCache.setCacheObject(AIConstants.AI_ACCESS_TOKEN_KEY, newAccessToken, authResponse.getExpiresIn(), TimeUnit.SECONDS);
                    return newAccessToken;
                });
    }

}
