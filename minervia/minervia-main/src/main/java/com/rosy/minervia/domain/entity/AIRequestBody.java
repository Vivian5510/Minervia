package com.rosy.minervia.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * AIRequestBody用于描述发送到AI模型的请求参数
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AIRequestBody {

    /**
     * 聊天上下文信息
     * 必填项，包含用户和助手的对话记录，必须为奇数个成员，且role顺序依次为user、assistant
     */
    private List<AIChatMessage> messages;

    /**
     * 是否以流式接口的形式返回数据
     * 可选项，默认为false
     */
    private Boolean stream;

    /**
     * 控制模型输出的随机性
     * 默认值0.95，取值范围(0, 1.0]，不能为0
     */
    private Float temperature;

    /**
     * 控制生成文本的多样性
     * 默认值0.7，取值范围[0, 1.0]
     */
    private Float topP;

    /**
     * 通过对已生成的token增加惩罚，减少重复生成的现象
     * 默认值1.0，取值范围[1.0, 2.0]
     */
    private Float penaltyScore;

    /**
     * 模型人设，主要用于设定AI的角色和背景
     * 可选项，长度限制为516096个字符，且不超过126976 tokens
     */
    private String system;

    /**
     * 生成停止标识
     * 可选项，最大4个元素，每个元素长度不超过20字符
     */
    private List<String> stop;

    /**
     * 指定模型最大输出token数
     * 可选项，范围[2, 4096]，默认为4096
     */
    private Integer maxOutputTokens;

    /**
     * 正值根据迄今为止文本中的现有频率对新token进行惩罚，降低重复生成的可能性
     * 默认值0.1，取值范围[-2.0, 2.0]
     */
    private Float frequencyPenalty;

    /**
     * 正值根据token在文本中是否已经出现来对其进行惩罚，从而增加模型谈论新主题的可能性
     * 默认值0.0，取值范围[-2.0, 2.0]
     */
    private Float presencePenalty;

    /**
     * 表示最终用户的唯一标识符
     * 用于识别不同用户的请求
     */
    private String userId;
}

