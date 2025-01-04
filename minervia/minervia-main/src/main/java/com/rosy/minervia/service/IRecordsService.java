package com.rosy.minervia.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.minervia.domain.dto.MpRequest;
import com.rosy.minervia.domain.entity.AIChatMessage;
import com.rosy.minervia.domain.entity.Records;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
public interface IRecordsService extends IService<Records> {

    List<AIChatMessage> loadChatMessages(String sessionId);

    boolean saveChatMessages(List<AIChatMessage> messages, MpRequest mpRequest, String openId);
}
