package com.rosy.minervia.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rosy.minervia.domain.entity.CategoryItem;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
public interface CategoryItemMapper extends BaseMapper<CategoryItem> {

    List<CategoryItem> selectCategoryItemList(CategoryItem categoryItem);
}
