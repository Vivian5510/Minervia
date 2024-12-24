package com.rosy.minervia.config.properties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mp")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MpProperties {
    String appId;
    String appSecret;
    String grantType;
    String loginUrl;
}
