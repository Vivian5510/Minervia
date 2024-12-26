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
@TableName("minervia_category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
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

    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    /**
     * 1正常 0删除
     */
    @TableLogic
    private Integer delFlag;

    /**
     * 排序字段
     */
    private Integer orderNum;

    /**
     * 是否启用
     */
    private Boolean enable;
}
