package com.rosy.minervia.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BaiduAIAuthResponseBody {
    private String refreshToken;
    private int expiresIn;
    private String sessionKey;
    private String accessToken;
    private String scope;
    private String sessionSecret;
}
