package com.rosy.web.controller.minervia;

import cn.hutool.core.bean.BeanUtil;
import com.rosy.common.annotation.RateLimiter;
import com.rosy.common.core.domain.AjaxResult;
import com.rosy.common.enums.LimitType;
import com.rosy.minervia.domain.dto.MpRequest;
import com.rosy.minervia.domain.entity.WxLogin;
import com.rosy.minervia.domain.vo.*;
import com.rosy.minervia.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


/**
 * 专门用来处理跟小程序有关的请求
 */

@RestController
@RequestMapping("/mp")
public class MpController {
    @Autowired
    IWxLoginService wxLoginService;
    @Autowired
    ICategoryService categoryService;
    @Autowired
    IBannerService bannerService;
    @Autowired
    IAIService aiService;
    @Autowired
    IModelsService modelsService;
    @Autowired
    ICategoryItemService categoryItemService;
    @Autowired
    IRecordsService recordsService;

    @PostMapping("/login")
    public AjaxResult login(@RequestParam("js_code") String jsCode) {
        WxLogin wxLogin = wxLoginService.login(jsCode);
        return Optional.ofNullable(wxLogin)
                .map(WxLogin::getOpenid)
                .filter(openid -> !openid.isEmpty())
                .map(openid -> AjaxResult.success((Object) wxLogin.getSessionKey()))
                .orElse(AjaxResult.error(401, "登录失败"));
    }

    @GetMapping("/banners")
    public List<BannerVO> getAllBanners() {
        return BeanUtil.copyToList(bannerService.getAllBanners(), BannerVO.class);
    }

    @GetMapping("/categories")
    public List<CategoryVO> getAllCategories() {
        return BeanUtil.copyToList(categoryService.getAllCategories(), CategoryVO.class);
    }

    @PostMapping("/chat")
    @RateLimiter(key = "mp-chat", time = 3, count = 1, limitType = LimitType.ID)
    public MpAnswer chat(@RequestBody MpRequest mpRequest, @RequestHeader("mp-token") String sessionKey) {
        return aiService.chat(mpRequest, sessionKey);
    }

    @GetMapping("/models")
    public List<ModelVO> getAllModels() {
        return BeanUtil.copyToList(modelsService.getAllModels(), ModelVO.class);
    }

    @GetMapping("/categoryItems/{categoryName}")
    public List<CategoryItemVO> getCategoryItems(@PathVariable("categoryName") String categoryName) {
        return BeanUtil.copyToList(categoryItemService.getCategoryItems(categoryName), CategoryItemVO.class);
    }

    @GetMapping("/records")
    public List<RecordPair> getRecords(@RequestParam(name = "page_number", defaultValue = "1") Integer pageNum,
                                       @RequestParam(name = "category", defaultValue = "all") String category,
                                       @RequestHeader("mp-token") String sessionKey) {

        return recordsService.getRecords(pageNum, category, sessionKey);
    }
}
