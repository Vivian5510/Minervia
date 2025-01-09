package com.rosy.minervia.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.minervia.domain.entity.CategoryItem;

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
public interface ICategoryItemService extends IService<CategoryItem> {

    List<CategoryItem> getCategoryItems(String categoryName);

    List<CategoryItem> selectCategoryItemList(CategoryItem categoryItem);

    boolean checkValueExists(CategoryItem categoryItem);
}
