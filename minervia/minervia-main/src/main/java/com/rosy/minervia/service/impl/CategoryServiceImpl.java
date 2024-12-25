package com.rosy.minervia.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.minervia.domain.Category;
import com.rosy.minervia.mapper.CategoryMapper;
import com.rosy.minervia.service.ICategoryService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements ICategoryService {

}
