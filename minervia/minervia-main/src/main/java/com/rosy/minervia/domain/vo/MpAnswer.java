package com.rosy.minervia.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MpAnswer {
    /**
     * 题目类型 选择 判断
     */
    private String type;

    /**
     * 响应内容
     */
    private String content;
}
