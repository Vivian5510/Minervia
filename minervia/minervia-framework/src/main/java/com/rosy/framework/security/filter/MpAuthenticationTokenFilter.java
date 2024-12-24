package com.rosy.framework.security.filter;

import com.fasterxml.jackson.core.filter.TokenFilter;
import com.rosy.common.constant.CacheConstants;
import com.rosy.common.core.redis.RedisCache;
import com.rosy.minervia.domain.WxLogin;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class MpAuthenticationTokenFilter extends OncePerRequestFilter {
    @Autowired
    RedisCache redisCache;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        if (requestURI.contains("/mp") && !requestURI.contains("/mp/login")) {
            WxLogin wxLogin = redisCache.getCacheObject(CacheConstants.WX_LOGIN_TOKEN_KEY + request.getHeader("mp-token"));
        }
    }
}
