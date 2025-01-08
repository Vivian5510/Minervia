package com.rosy.minervia.domain.vo;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordsVO {
    /**
     * 会话ID
     */
    private String sessionId;

    /**
     * 消息主体内容
     */
    private String content;


    private Date createTime;

    /**
     * 具体的技术分类，关联category_item
     */
    private String category;

    /**
     * 面试科目，关联category
     */
    private String subject;
}
