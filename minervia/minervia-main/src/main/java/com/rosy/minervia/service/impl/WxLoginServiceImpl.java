package com.rosy.minervia.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.common.constant.CacheConstants;
import com.rosy.common.core.redis.RedisCache;
import com.rosy.common.utils.uuid.UUID;
import com.rosy.minervia.config.properties.MpProperties;
import com.rosy.minervia.domain.entity.WxLogin;
import com.rosy.minervia.mapper.WxLoginMapper;
import com.rosy.minervia.service.IWxLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
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
        // 构建 URI
        URI uri = UriComponentsBuilder.fromUriString(mpProperties.getLoginUrl())  // 从基础 URL 构建
                .queryParam("js_code", jsCode)
                .queryParam("appid", mpProperties.getAppId())
                .queryParam("secret", mpProperties.getAppSecret())
                .queryParam("grant_type", mpProperties.getGrantType())  // 使用正确的 grant_type
                .build()
                .toUri();  // 转换为 URI 对象

        // 使用 RestTemplate 发送请求
        WxLogin wxLogin = webClient
                .get()
                .uri(uri)
                .retrieve()
                .bodyToMono(WxLogin.class)
                .block();
        assert wxLogin != null;
        if (wxLogin.getErrcode() == null || (wxLogin.getOpenid() != null && !wxLogin.getOpenid().isEmpty())) {
            //成功
            LambdaQueryWrapper<WxLogin> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(WxLogin::getOpenid, wxLogin.getOpenid());
            WxLogin existedUser = getOne(queryWrapper);
            wxLogin.setId(existedUser == null ? null : existedUser.getId());
            wxLogin.setUnionid(jsCode);
            wxLogin.setSessionKey(UUID.randomUUID().toString());

            saveOrUpdate(wxLogin);
            save2Redis(wxLogin);
        }


        return wxLogin;
    }

    @Override
    public String getOpenIdBySessionKey(String sessionKey) {
        LambdaQueryWrapper<WxLogin> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(WxLogin::getSessionKey, sessionKey);
        return getOne(queryWrapper).getOpenid();
    }

    private void save2Redis(WxLogin wxLogin) {
        redisCache.setCacheObject(CacheConstants.WX_LOGIN_TOKEN_KEY + wxLogin.getSessionKey(), wxLogin, 60, TimeUnit.MINUTES);
    }
}
