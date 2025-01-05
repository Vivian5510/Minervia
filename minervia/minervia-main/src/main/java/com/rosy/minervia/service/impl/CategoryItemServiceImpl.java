package com.rosy.minervia.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.minervia.domain.entity.CategoryItem;
import com.rosy.minervia.mapper.CategoryItemMapper;
import com.rosy.minervia.service.ICategoryItemService;
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

    @Override
    public List<CategoryItem> getCategoryItems(String categoryName) {
        LambdaQueryWrapper<CategoryItem> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(CategoryItem::getCategory, categoryName)
                .orderByAsc(CategoryItem::getOrderNum);
        return list(queryWrapper);
    }
}
