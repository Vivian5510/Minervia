package com.rosy.minervia.service.impl;

import com.rosy.common.constant.CacheConstants;
import com.rosy.common.core.redis.RedisCache;
import com.rosy.common.utils.uuid.UUID;
import com.rosy.minervia.config.properties.MpProperties;
import com.rosy.minervia.domain.WxLogin;
import com.rosy.minervia.mapper.WxLoginMapper;
import com.rosy.minervia.service.IWxLoginService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
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
    RestTemplate restTemplate;

    @Autowired
    MpProperties mpProperties;

    @Autowired
    RedisCache redisCache;

    @Override
    public WxLogin login(String jsCode) {
        Map<String, String> params = Map.of(
                "js_code", jsCode,
                "appid", mpProperties.getAppId(),
                "secret", mpProperties.getAppSecret(),
                "grant_type", mpProperties.getAppId()
        );
        WxLogin wxLogin = restTemplate.getForObject(mpProperties.getLoginUrl(), WxLogin.class, params);
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
