package com.rosy.framework.security.filter;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.constant.CacheConstants;
import com.rosy.common.core.redis.RedisCache;
import com.rosy.minervia.domain.entity.WxLogin;
import com.rosy.minervia.service.IWxLoginService;
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
    @Autowired
    IWxLoginService wxLoginService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        if (requestURI.contains("/mp")) {
            if (requestURI.contains("/mp/login")) {
                String jsCode = request.getParameter("js_code");
                LambdaQueryWrapper<WxLogin> queryWrapper = new LambdaQueryWrapper<>();
                queryWrapper.eq(WxLogin::getUnionid, jsCode);
                if (wxLoginService.getOne(queryWrapper) != null) {
                    long login_expire_time = wxLoginService.getOne(queryWrapper).getUpdateTime().getTime() + 3600 * 1000;
                    if (System.currentTimeMillis() < login_expire_time) {
                        response.setContentType("application/json;charset=utf-8");
                        response.getWriter().write("{\"code\":401,\"msg\":\"登录过于频繁，请勿重复登录，或稍后重试\"}");
                        return;
                    }
                }
            } else {
                WxLogin wxLogin = redisCache.getCacheObject(CacheConstants.WX_LOGIN_TOKEN_KEY + request.getHeader("mp-token"));
                if (wxLogin == null) {
                    response.setContentType("application/json;charset=utf-8");
                    response.getWriter().write("{\"code\":401,\"msg\":\"尚未登录，请登录\"}");
                    return;
                }
            }
        }
        doFilter(request, response, filterChain);
    }
}
