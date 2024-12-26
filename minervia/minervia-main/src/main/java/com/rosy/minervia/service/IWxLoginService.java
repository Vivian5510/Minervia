package com.rosy.minervia.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.minervia.domain.entity.WxLogin;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
public interface IWxLoginService extends IService<WxLogin> {

    WxLogin login(String jsCode);
}
