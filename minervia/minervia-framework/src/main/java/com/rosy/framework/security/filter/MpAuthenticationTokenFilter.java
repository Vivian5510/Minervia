package com.rosy.framework.security.filter;

import com.rosy.common.constant.CacheConstants;
import com.rosy.common.core.redis.RedisCache;
import com.rosy.minervia.domain.entity.WxLogin;
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
        //TODO: 防止用户重复登录
        
        String requestURI = request.getRequestURI();
        if (requestURI.contains("/mp") && !requestURI.contains("/mp/login")) {
            WxLogin wxLogin = redisCache.getCacheObject(CacheConstants.WX_LOGIN_TOKEN_KEY + request.getHeader("mp-token"));
            if (wxLogin == null) {
                response.setContentType("application/json;charset=utf-8");
                response.getWriter().write("{\"code\":401,\"msg\":\"尚未登录，请登录\"}");
                return;
            }
        }
        doFilter(request, response, filterChain);
    }
}
