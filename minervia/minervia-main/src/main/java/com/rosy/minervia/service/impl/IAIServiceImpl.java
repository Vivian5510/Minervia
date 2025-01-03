package com.rosy.minervia.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.constant.AIConstants;
import com.rosy.common.core.redis.RedisCache;
import com.rosy.minervia.config.properties.BaiduAIProperties;
import com.rosy.minervia.domain.dto.MpRequest;
import com.rosy.minervia.domain.entity.BaiduAIAuthResponseBody;
import com.rosy.minervia.domain.entity.Models;
import com.rosy.minervia.domain.vo.MpAnswer;
import com.rosy.minervia.service.IAIService;
import com.rosy.minervia.service.IModelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
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

    /**
     * 服务端支持多轮对话，所以需要传递sessionKey
     *
     * @param mpRequest
     * @param sessionKey
     * @return
     */
    @Override
    public MpAnswer chat(MpRequest mpRequest, String sessionKey) {
        //1.先去进行AI大模型调用认证
        String accessToken = getAccessToken();
        //2.根据小程序传递的模型名称，去查询这个模型的信息
        Models model = getModel(mpRequest.getModelName());
        //3.读取当前对话的上下文信息
         
        return null;
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
