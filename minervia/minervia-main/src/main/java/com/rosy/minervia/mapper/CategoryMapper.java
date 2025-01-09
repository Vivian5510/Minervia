package com.rosy.minervia.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rosy.minervia.domain.entity.Category;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
public interface CategoryMapper extends BaseMapper<Category> {

    List<Category> selectCategoryList(Category category);
}
