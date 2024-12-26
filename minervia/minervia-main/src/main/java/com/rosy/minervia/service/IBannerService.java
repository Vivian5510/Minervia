package com.rosy.minervia.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.minervia.domain.entity.Banner;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
public interface IBannerService extends IService<Banner> {

    List<Banner> getAllBanners();
}
