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
@TableName("minervia_category_item")
public class CategoryItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 下拉框展示的文本
     */
    private String text;

    /**
     * 下拉框具体的值
     */
    private String value;

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
     * 所属的技术分类
     */
    private String category;

    /**
     * 排序字段
     */
    private Integer orderNum;
}
