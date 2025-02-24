package com.rosy.minervia.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rosy.minervia.domain.entity.Models;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
public interface ModelsMapper extends BaseMapper<Models> {

    List<Models> selectModelsList(Models model);
}
