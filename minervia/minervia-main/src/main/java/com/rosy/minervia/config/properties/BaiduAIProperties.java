package com.rosy.minervia.config.properties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "baidu.ai")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaiduAIProperties {
    private String grantType;
    private String clientId;
    private String clientSecret;
    private String accessTokenUrl;
}
