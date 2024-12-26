package com.rosy.minervia.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BannerVO {
    private Integer id;

    /**
     * 图片路径
     */
    private String image;

    /**
     * banner中的标题
     */
    private String title;

    /**
     * 点击banner图片跳转路径
     */
    private String url;
}
