package com.rosy.web.controller.minervia;

import com.rosy.common.annotation.Log;
import com.rosy.common.core.controller.BaseController;
import com.rosy.common.core.domain.AjaxResult;
import com.rosy.common.core.page.TableDataInfo;
import com.rosy.common.enums.BusinessType;
import com.rosy.minervia.domain.entity.CategoryItem;
import com.rosy.minervia.service.ICategoryItemService;
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
@RequestMapping("/categoryItem")
public class CategoryItemController extends BaseController {
    @Autowired
    ICategoryItemService categoryItemService;

    @PreAuthorize("@ss.hasPermi('minervia:categoryItem:list')")
    @GetMapping("/list")
    public TableDataInfo list(CategoryItem categoryItem) {
        startPage();
        List<CategoryItem> list = categoryItemService.selectCategoryItemList(categoryItem);
        return getDataTable(list);
    }

    @PreAuthorize("@ss.hasPermi('minervia:categoryItem:query')")
    @GetMapping("/{id}")
    public AjaxResult getInfo(@PathVariable(name = "id") Long id) {
        return success(categoryItemService.getById(id));
    }

    @PreAuthorize("@ss.hasPermi('minervia:categoryItem:add')")
    @Log(title = "CategoryItem管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody CategoryItem categoryItem) {
        if (categoryItemService.checkValueExists(categoryItem)) {
            return error("新增CategoryItem'" + categoryItem.getValue() + "'失败，CategoryItem值已存在");
        }
        return toAjax(categoryItemService.save(categoryItem));
    }

    @PreAuthorize("@ss.hasPermi('minervia:categoryItem:remove')")
    @Log(title = "Category管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{categoryItemIds}")
    public AjaxResult remove(@PathVariable(name = "categoryItemIds") Long[] roleIds) {
        return toAjax(categoryItemService.removeBatchByIds(Arrays.asList(roleIds)));
    }

    @PreAuthorize("@ss.hasPermi('minervia:categoryItem:edit')")
    @Log(title = "CategoryItem管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody CategoryItem categoryItem) {
        if (categoryItemService.checkValueExists(categoryItem)) {
            return error("修改CategoryItem'" + categoryItem.getValue() + "'失败，CategoryItem值已存在");
        }

        return toAjax(categoryItemService.updateById(categoryItem));
    }
}
