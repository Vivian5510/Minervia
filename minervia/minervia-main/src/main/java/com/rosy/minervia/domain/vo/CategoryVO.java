package com.rosy.minervia.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryVO {
    private Integer id;

    /**
     * 宫格中的文本
     */
    private String text;

    /**
     * 宫格中的图片地址
     */
    private String src;

    /**
     * 宫格技术名称
     */
    private String name;
}
