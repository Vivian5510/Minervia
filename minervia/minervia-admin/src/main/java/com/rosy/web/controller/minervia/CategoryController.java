package com.rosy.web.controller.minervia;

import com.rosy.common.annotation.Log;
import com.rosy.common.core.controller.BaseController;
import com.rosy.common.core.domain.AjaxResult;
import com.rosy.common.core.page.TableDataInfo;
import com.rosy.common.enums.BusinessType;
import com.rosy.minervia.domain.entity.Category;
import com.rosy.minervia.domain.entity.Category;
import com.rosy.minervia.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
@RestController
@RequestMapping("/category")
public class CategoryController extends BaseController {
    @Autowired
    ICategoryService categoryService;

    @PreAuthorize("@ss.hasPermi('minervia:category:list')")
    @GetMapping("/list")
    public TableDataInfo list(Category category) {
        startPage();
        List<Category> list = categoryService.selectCategoryList(category);
        return getDataTable(list);
    }

    @PreAuthorize("@ss.hasPermi('minervia:category:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable(name = "id") Long id) {
        return success(categoryService.getById(id));
    }

    @PreAuthorize("@ss.hasPermi('minervia:category:add')")
    @Log(title = "Category管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody Category category) {
        if (categoryService.checkNameExists(category)) {
            return error("新增Category'" + category.getName() + "'失败，Category名称已存在");
        }
        return toAjax(categoryService.save(category));
    }

    @PreAuthorize("@ss.hasPermi('minervia:category:remove')")
    @Log(title = "角色管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{categoryIds}")
    public AjaxResult remove(@PathVariable(name = "categoryIds") Long[] categoryIds) {
        return toAjax(categoryService.removeBatchByIds(Arrays.asList(categoryIds)));
    }

    @PreAuthorize("@ss.hasPermi('minervia:category:edit')")
    @Log(title = "Category管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody Category category) {
        if (categoryService.checkNameExists(category)) {
            return error("修改Category'" + category.getName() + "'失败，Category名称已存在");
        }

        return toAjax(categoryService.updateById(category));
    }
}
