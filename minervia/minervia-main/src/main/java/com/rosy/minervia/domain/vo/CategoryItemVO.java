package com.rosy.minervia.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryItemVO {
    /**
     * 下拉框展示的文本
     */
    private String text;

    /**
     * 下拉框具体的值
     */
    private String value;
}
