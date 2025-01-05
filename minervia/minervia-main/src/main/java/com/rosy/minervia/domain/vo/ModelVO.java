package com.rosy.minervia.domain.vo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelVO {
    /**
     * 模型名称
     */
    private String name;

    /**
     * 0 免费 1 收费
     */
    private Integer charge;

    /**
     * 0 单轮对话 1 多轮对话
     */
    private Integer multiple;
}
