package com.rosy.common.utils;

import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.util.ArrayList;
import java.util.List;

public class RestTemplateMessageConverter extends MappingJackson2HttpMessageConverter {
    public RestTemplateMessageConverter() {
        List<MediaType> supportedMediaTypes = List.of(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN);
        setSupportedMediaTypes(supportedMediaTypes);
    }
}
