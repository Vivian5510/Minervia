package com.rosy.minervia.domain.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BaiduAIAuthResponseBody {
    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("expires_in")
    private int expiresIn;
    @JsonProperty("session_key")
    private String sessionKey;
    @JsonProperty("access_token")
    private String accessToken;
    private String scope;
    @JsonProperty("session_secret")
    private String sessionSecret;
}
