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
@TableName("minervia_records")
public class Records implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 会话ID
     */
    private String sessionId;

    /**
     * 角色 assistant/user
     */
    private String role;

    /**
     * 消息主体内容
     */
    private String content;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    /**
     * 用户唯一ID
     */
    private String openid;

    /**
     * 具体的技术分类，关联category_item
     */
    private String category;

    /**
     * 面试科目，关联category
     */
    private String subject;

    /**
     * 1 正常 0 删除
     */
    @TableLogic
    private Integer delFlag;
}
