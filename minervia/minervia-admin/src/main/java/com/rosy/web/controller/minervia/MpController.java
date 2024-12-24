package com.rosy.web.controller.minervia;

import com.rosy.common.core.controller.BaseController;
import com.rosy.common.core.domain.AjaxResult;
import com.rosy.minervia.domain.WxLogin;
import com.rosy.minervia.service.IWxLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


/**
 * 专门用来处理跟小程序有关的请求
 */

@RestController
@RequestMapping("/mp")
public class MpController {
    @Autowired
    IWxLoginService wxLoginService;

    @PostMapping("/login")
    public AjaxResult login(String jsCode) {
        WxLogin wxLogin = wxLoginService.login(jsCode);
        return Optional.ofNullable(wxLogin)
                .map(WxLogin::getOpenid)
                .filter(openid -> !openid.isEmpty())
                .map(openid -> AjaxResult.success(wxLogin))
                .orElse(AjaxResult.error(401, "登录失败"));
    }
}
