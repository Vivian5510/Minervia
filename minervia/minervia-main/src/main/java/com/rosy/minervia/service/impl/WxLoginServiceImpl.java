package com.rosy.minervia.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.common.constant.CacheConstants;
import com.rosy.common.core.redis.RedisCache;
import com.rosy.common.utils.uuid.UUID;
import com.rosy.minervia.config.properties.MpProperties;
import com.rosy.minervia.domain.WxLogin;
import com.rosy.minervia.mapper.WxLoginMapper;
import com.rosy.minervia.service.IWxLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
@Service
@EnableConfigurationProperties(MpProperties.class)
public class WxLoginServiceImpl extends ServiceImpl<WxLoginMapper, WxLogin> implements IWxLoginService {

    @Autowired
    MpProperties mpProperties;

    @Autowired
    RedisCache redisCache;

    @Autowired
    WebClient webClient;

    @Override
    public WxLogin login(String jsCode) {
        WxLogin wxLogin = webClient
                .get()
                .uri(
                        uriBuilder -> uriBuilder
                                .path(mpProperties.getLoginUrl())
                                .queryParam("js_code", jsCode)
                                .queryParam("appid", mpProperties.getAppId())
                                .queryParam("secret", mpProperties.getAppSecret())
                                .queryParam("grant_type", mpProperties.getAppId())
                                .build()
                )
                .retrieve()
                .bodyToMono(WxLogin.class)
                .block();

        assert wxLogin != null;
        if (wxLogin.getErrcode() == null || (wxLogin.getOpenid() != null && !wxLogin.getOpenid().isEmpty())) {
            //成功
            saveOrUpdate(wxLogin);
            save2Redis(wxLogin);
            wxLogin.setSessionKey(UUID.randomUUID().toString());
        }
        return wxLogin;
    }

    private void save2Redis(WxLogin wxLogin) {
        redisCache.setCacheObject(CacheConstants.WX_LOGIN_TOKEN_KEY + wxLogin.getSessionKey(), wxLogin, 60, TimeUnit.MINUTES);
    }
}
