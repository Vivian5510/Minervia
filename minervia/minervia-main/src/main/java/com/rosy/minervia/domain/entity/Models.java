package com.rosy.minervia.domain.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName("minervia_models")
public class Models implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 模型名称
     */
    private String name;

    /**
     * 调用模型的地址
     */
    private String url;

    /**
     * 提问提示词
     */
    private String questionPrompt;

    /**
     * 回答提示词
     */
    private String answerPrompt;

    /**
     * AI模型的身份设定
     */
    private String role;

    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    /**
     * 1 正常 0 删除
     */
    @TableLogic
    private Integer delFlag;

    /**
     * 0 免费 1 收费
     */
    private Integer charge;

    /**
     * 0 单轮对话 1 多轮对话
     */
    private Integer multiple;

    /**
     * 排序字段
     */
    private Integer orderNum;
}
