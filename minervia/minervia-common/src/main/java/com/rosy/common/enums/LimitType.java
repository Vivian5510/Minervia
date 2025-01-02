package com.rosy.common.enums;

/**
 * 限流类型
 *
 * @author rosy
 */

public enum LimitType {
    /**
     * 默认策略全局限流
     */
    DEFAULT,

    /**
     * 根据请求者的身份认真ID进行限流
     */
    ID,
    /**
     * 根据请求者IP进行限流
     */
    IP
}
