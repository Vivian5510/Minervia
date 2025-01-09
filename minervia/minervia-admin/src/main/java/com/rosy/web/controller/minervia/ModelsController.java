package com.rosy.web.controller.minervia;

import com.rosy.common.annotation.Log;
import com.rosy.common.core.controller.BaseController;
import com.rosy.common.core.domain.AjaxResult;
import com.rosy.common.core.page.TableDataInfo;
import com.rosy.common.enums.BusinessType;
import com.rosy.minervia.domain.entity.Models;
import com.rosy.minervia.service.IModelsService;
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
@RequestMapping("/model")
public class ModelsController extends BaseController {
    @Autowired
    IModelsService modelsService;

    @PreAuthorize("@ss.hasPermi('minervia:model:list')")
    @GetMapping("/list")
    public TableDataInfo list(Models model) {
        startPage();
        List<Models> list = modelsService.selectModelsList(model);
        return getDataTable(list);
    }

    @PreAuthorize("@ss.hasPermi('minervia:model:query')")
    @GetMapping("/{id}")
    public AjaxResult getInfo(@PathVariable(name = "id") Long id) {
        return success(modelsService.getById(id));
    }

    @PreAuthorize("@ss.hasPermi('minervia:model:add')")
    @Log(title = "Model管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody Models model) {
        if (modelsService.checkNameExists(model)) {
            return error("新增Models'" + model.getName() + "'失败，Models标题已存在");
        }
        return toAjax(modelsService.save(model));
    }

    @PreAuthorize("@ss.hasPermi('minervia:model:remove')")
    @Log(title = "Model管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{modelIds}")
    public AjaxResult remove(@PathVariable(name = "modelIds") Long[] roleIds) {
        return toAjax(modelsService.removeBatchByIds(Arrays.asList(roleIds)));
    }

    @PreAuthorize("@ss.hasPermi('minervia:model:edit')")
    @Log(title = "Model管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody Models model) {
        if (modelsService.checkNameExists(model)) {
            return error("修改Models'" + model.getName() + "'失败，Models标题已存在");
        }

        return toAjax(modelsService.updateById(model));
    }
}
