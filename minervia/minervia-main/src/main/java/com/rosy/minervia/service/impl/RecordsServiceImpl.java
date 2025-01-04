package com.rosy.minervia.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.minervia.domain.entity.AIChatMessage;
import com.rosy.minervia.domain.entity.Records;
import com.rosy.minervia.mapper.RecordsMapper;
import com.rosy.minervia.service.IRecordsService;
import org.springframework.stereotype.Service;

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

    @Override
    public List<AIChatMessage> loadChatMessages(String sessionId) {
        LambdaQueryWrapper<Records> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Records::getSessionId, sessionId);
        List<Records> records = list(queryWrapper);
        return BeanUtil.copyToList(records, AIChatMessage.class);
    }
}
