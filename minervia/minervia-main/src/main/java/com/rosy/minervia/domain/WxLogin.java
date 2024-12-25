package com.rosy.minervia.domain;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@TableName("wx_login")
public class WxLogin implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 用户唯一ID
     */
    private String openid;

    /**
     * 会话Key
     */
    @JsonProperty("session_key")
    private String sessionKey;

    private String unionid;

    private String errcode;

    private String errmsg;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
