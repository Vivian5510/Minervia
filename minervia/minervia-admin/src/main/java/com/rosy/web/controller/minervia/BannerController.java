package com.rosy.web.controller.minervia;

import com.rosy.common.annotation.Log;
import com.rosy.common.core.controller.BaseController;
import com.rosy.common.core.domain.AjaxResult;
import com.rosy.common.core.page.TableDataInfo;
import com.rosy.common.enums.BusinessType;
import com.rosy.minervia.domain.entity.Banner;
import com.rosy.minervia.service.IBannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
@RequestMapping("/banner")
public class BannerController extends BaseController {
    @Autowired
    IBannerService bannerService;

    @PreAuthorize("@ss.hasPermi('minervia:banner:list')")
    @GetMapping("/list")
    public TableDataInfo list(Banner banner) {
        startPage();
        List<Banner> list = bannerService.selectBannerList(banner);
        return getDataTable(list);
    }

    @PreAuthorize("@ss.hasPermi('minervia:banner:query')")
    @GetMapping("/{id}")
    public AjaxResult getInfo(@PathVariable(name = "id") Long id) {
        return success(bannerService.getById(id));
    }

    @PreAuthorize("@ss.hasPermi('minervia:banner:add')")
    @Log(title = "Banner管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody Banner banner) {
        if (bannerService.checkTitleExists(banner)) {
            return error("新增Banner'" + banner.getTitle() + "'失败，Banner标题已存在");
        }
        return toAjax(bannerService.save(banner));
    }

    @PreAuthorize("@ss.hasPermi('minervia:banner:remove')")
    @Log(title = "Banner管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{bannerIds}")
    public AjaxResult remove(@PathVariable(name = "bannerIds") Long[] roleIds) {
        return toAjax(bannerService.removeBatchByIds(Arrays.asList(roleIds)));
    }

    @PreAuthorize("@ss.hasPermi('minervia:banner:edit')")
    @Log(title = "Banner管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody Banner banner) {
        if (bannerService.checkTitleExists(banner)) {
            return error("修改Banner'" + banner.getTitle() + "'失败，Banner标题已存在");
        }

        return toAjax(bannerService.updateById(banner));
    }
}
