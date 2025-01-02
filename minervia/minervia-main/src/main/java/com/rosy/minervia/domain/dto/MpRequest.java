package com.rosy.minervia.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MpRequest {
    /**
     * 小程序发过来的主体内容
     * 提问时发送的面试题类型，比如JVM，JavaSE，JavaEE等
     */
    private String content;

    /**
     * 会话ID
     * 一道完整的题目是一个会话，会话ID用来标识这个会话
     */
    private String sessionId;

    /**
     * 消息类型 q 表示提问 a 表示回答
     */
    private String type;

    /**
     * 模型名称
     * 用来标识当前使用的模型
     */
    private String modelName;
}
