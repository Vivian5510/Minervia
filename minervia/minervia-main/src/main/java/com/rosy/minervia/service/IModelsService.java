package com.rosy.minervia.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.minervia.domain.entity.Models;

import java.util.Collection;
import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
public interface IModelsService extends IService<Models> {

    List<Models> getAllModels();

    List<Models> selectModelsList(Models model);

    boolean checkNameExists(Models model);
}
