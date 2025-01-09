package com.rosy.minervia.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.minervia.domain.entity.Category;
import com.rosy.minervia.domain.entity.Models;
import com.rosy.minervia.mapper.ModelsMapper;
import com.rosy.minervia.service.IModelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
@Service
public class ModelsServiceImpl extends ServiceImpl<ModelsMapper, Models> implements IModelsService {
    @Autowired
    ModelsMapper modelsMapper;

    @Override
    public List<Models> getAllModels() {
        LambdaQueryWrapper<Models> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByAsc(Models::getOrderNum);
        return list(queryWrapper);
    }

    @Override
    public List<Models> selectModelsList(Models model) {
        return modelsMapper.selectModelsList(model);
    }

    @Override
    public boolean checkNameExists(Models model) {
        LambdaQueryWrapper<Models> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Models::getName, model.getName());
        Models existCategory = getOne(queryWrapper);
        return existCategory != null && !existCategory.getId().equals(model.getId());
    }
}
