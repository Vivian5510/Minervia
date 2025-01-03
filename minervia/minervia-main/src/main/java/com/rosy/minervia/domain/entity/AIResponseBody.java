package com.rosy.minervia.domain.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AIResponseBody用于描述AI模型返回的响应参数
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AIResponseBody {

    /**
     * 本轮对话的唯一ID
     */
    @JsonProperty("id")
    private String id;

    /**
     * 回包类型，表示响应类型
     * chat.completion：表示多轮对话返回
     */
    @JsonProperty("object")
    private String object;

    /**
     * 响应时间戳
     */
    @JsonProperty("created")
    private Integer created;

    /**
     * 表示当前子句的序号
     * 只有在流式接口模式下会返回该字段
     */
    @JsonProperty("sentence_id")
    private Integer sentenceId;

    /**
     * 表示当前子句是否是最后一句
     * 只有在流式接口模式下会返回该字段
     */
    @JsonProperty("is_end")
    private Boolean isEnd;

    /**
     * 当前生成的结果是否被截断
     */
    @JsonProperty("is_truncated")
    private Boolean isTruncated;

    /**
     * 对话返回的结果
     */
    @JsonProperty("result")
    private String result;

    /**
     * 表示用户输入是否存在安全风险，是否关闭当前会话，清理历史会话信息
     * true：表示有安全风险，建议关闭当前会话并清理历史信息
     * false：表示无安全风险
     */
    @JsonProperty("need_clear_history")
    private Boolean needClearHistory;

    /**
     * 当needClearHistory为true时，告知第几轮对话存在敏感信息
     * 如果是当前问题，banRound为-1
     */
    @JsonProperty("ban_round")
    private Integer banRound;

    /**
     * Token统计信息，用于描述请求的使用情况
     */
    @JsonProperty("usage")
    private Usage usage;
}
