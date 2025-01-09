package com.rosy.minervia.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.minervia.domain.entity.Category;
import com.rosy.minervia.domain.entity.CategoryItem;
import com.rosy.minervia.mapper.CategoryItemMapper;
import com.rosy.minervia.service.ICategoryItemService;
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
public class CategoryItemServiceImpl extends ServiceImpl<CategoryItemMapper, CategoryItem> implements ICategoryItemService {
    @Autowired
    CategoryItemMapper categoryItemMapper;

    @Override
    public List<CategoryItem> getCategoryItems(String categoryName) {
        LambdaQueryWrapper<CategoryItem> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(CategoryItem::getCategory, categoryName)
                .orderByAsc(CategoryItem::getOrderNum);
        return list(queryWrapper);
    }

    @Override
    public List<CategoryItem> selectCategoryItemList(CategoryItem categoryItem) {
        return categoryItemMapper.selectCategoryItemList(categoryItem);
    }

    @Override
    public boolean checkValueExists(CategoryItem categoryItem) {
        LambdaQueryWrapper<CategoryItem> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(CategoryItem::getValue, categoryItem.getValue());
        CategoryItem existCategory = getOne(queryWrapper);
        return existCategory != null && !existCategory.getId().equals(categoryItem.getId());
    }
}
