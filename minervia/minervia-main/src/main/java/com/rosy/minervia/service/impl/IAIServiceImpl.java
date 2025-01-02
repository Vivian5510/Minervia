package com.rosy.minervia.service.impl;

import com.rosy.minervia.domain.dto.MpRequest;
import com.rosy.minervia.domain.vo.MpAnswer;
import com.rosy.minervia.service.IAIService;
import org.springframework.stereotype.Service;

@Service
public class IAIServiceImpl implements IAIService {
    @Override
    public MpAnswer chat(MpRequest mpRequest, String sessionKey) {
        return null;
    }
}
