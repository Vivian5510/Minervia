package com.rosy.minervia.domain;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

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
@TableName("minervia_banner")
public class Banner implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
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

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    /**
     * 1 正常 0 删除
     */
    @TableLogic
    private Integer delFlag;

    /**
     * 排序字段
     */
    private Integer orderNum;
}
