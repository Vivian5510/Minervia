package com.rosy.minervia.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> {
                            // 配置 WebClient 以支持处理 text/plain 格式的 JSON
                            configurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder());
                        })
                        .build())
                .build();
    }
}
