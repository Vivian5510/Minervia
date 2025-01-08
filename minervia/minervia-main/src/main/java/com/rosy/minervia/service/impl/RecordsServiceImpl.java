package com.rosy.minervia.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.common.constant.AIConstants;
import com.rosy.minervia.domain.dto.MpRequest;
import com.rosy.minervia.domain.entity.AIChatMessage;
import com.rosy.minervia.domain.entity.Records;
import com.rosy.minervia.domain.vo.RecordPair;
import com.rosy.minervia.domain.vo.RecordsVO;
import com.rosy.minervia.mapper.RecordsMapper;
import com.rosy.minervia.service.IRecordsService;
import com.rosy.minervia.service.IWxLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2024-12-23
 */
@Service
public class RecordsServiceImpl extends ServiceImpl<RecordsMapper, Records> implements IRecordsService {
    @Autowired
    IWxLoginService wxLoginService;

    @Override
    public List<AIChatMessage> loadChatMessages(String sessionId) {
        LambdaQueryWrapper<Records> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Records::getSessionId, sessionId);
        List<Records> records = list(queryWrapper);
        return BeanUtil.copyToList(records, AIChatMessage.class);
    }

    @Override
    public boolean saveChatMessages(List<AIChatMessage> messages, MpRequest mpRequest, String openId) {
        List<Records> records = BeanUtil.copyToList(messages, Records.class);
        return saveBatch(records.stream().peek(record -> {
                    record.setOpenid(openId);
                    record.setSessionId(mpRequest.getSessionId());
                    record.setCategory(mpRequest.getContent());
                    record.setSubject(mpRequest.getSubject());
                }).toList()
        );
    }

    @Override
    public List<RecordPair> getRecords(Integer pageNum, String category, String sessionKey) {
        int offset = (pageNum - 1) * AIConstants.RECORD_PAGE_SIZE;
        int pageSize = AIConstants.RECORD_PAGE_SIZE;
        String openId = wxLoginService.getOpenIdBySessionKey(sessionKey);
        LambdaQueryWrapper<Records> queryWrapperForQuestions = new LambdaQueryWrapper<Records>()
                .eq(Records::getOpenid, openId)
                .eq(Records::getRole, "assistant")
                .notIn(Records::getCategory, "A", "B", "C", "D")
                .last("LIMIT " + offset + ", " + pageSize);

        List<String> sessionIds = list(queryWrapperForQuestions).stream().map(Records::getSessionId).toList();

        LambdaQueryWrapper<Records> queryWrapperForAnswers = new LambdaQueryWrapper<Records>()
                .eq(Records::getRole, "assistant")
                .in(Records::getSessionId, sessionIds);
        List<RecordsVO> records = BeanUtil.copyToList(list(queryWrapperForAnswers), RecordsVO.class);

        // 将问题和答案组合成一个 RecordPair
        List<RecordPair> recordPairs = new ArrayList<>();
        for (int i = 0; i < records.size(); ) {
            RecordsVO question = records.get(i); // 当前记录是问题
            RecordsVO answer = null;

            // 判断下一条记录是否是同一个 sessionId，且为答案
            if (i + 1 < records.size() && question.getSessionId().equals(records.get(i + 1).getSessionId())) {
                answer = records.get(i + 1); // 下一条记录是答案
                i += 2; // 跳过问题和答案
            } else {
                i += 1; // 仅跳过当前问题
            }

            // 添加到结果集
            recordPairs.add(RecordPair.builder()
                    .question(question)
                    .answer(answer)
                    .build());
        }

        return recordPairs;
    }
}
