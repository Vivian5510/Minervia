package com.rosy.framework.web.service;

import com.rosy.common.constant.AIConstants;
import com.rosy.common.core.redis.RedisCache;
import com.rosy.minervia.domain.entity.Models;
import com.rosy.minervia.service.IModelsService;
import com.rosy.minervia.service.impl.ModelsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CacheWarmUpService implements ApplicationRunner {
    @Autowired
    RedisCache redisCache;
    @Autowired
    IModelsService modelsService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        //AI模型信息预热
        modelsService.list()
                .forEach(models -> redisCache.setCacheMapValue(AIConstants.AI_MODELS_KEY, models.getName(), models));
    }
}
