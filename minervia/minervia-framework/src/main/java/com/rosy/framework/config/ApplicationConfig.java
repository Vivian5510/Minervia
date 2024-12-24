package com.rosy.framework.config;

import com.rosy.common.utils.RestTemplateMessageConverter;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.client.RestTemplate;

import java.util.TimeZone;

/**
 * 程序注解配置
 *
 * @author rosy
 */
@Configuration
// 表示通过aop框架暴露该代理对象,AopContext能够访问
@EnableAspectJAutoProxy(exposeProxy = true)
// 指定要扫描的Mapper类的包的路径
@MapperScan("com.rosy.**.mapper")
public class ApplicationConfig {
    /**
     * 时区配置
     */
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer jacksonObjectMapperCustomization() {
        return jacksonObjectMapperBuilder -> jacksonObjectMapperBuilder.timeZone(TimeZone.getDefault());
    }

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        /*因为微信登录接口返回的是text/plain格式的json所以要设置消息格式转化器*/
        restTemplate.getMessageConverters().add(new RestTemplateMessageConverter());
        return restTemplate;
    }
}
