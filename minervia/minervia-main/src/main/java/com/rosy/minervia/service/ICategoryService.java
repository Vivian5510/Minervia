package com.rosy.minervia.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.minervia.domain.entity.Category;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
public interface ICategoryService extends IService<Category> {

    List<Category> getAllCategories();

    List<Category> selectCategoryList(Category category);

    boolean checkNameExists(Category category);
}
