package com.rosy.minervia.service;

import com.rosy.minervia.domain.dto.MpRequest;
import com.rosy.minervia.domain.vo.MpAnswer;

public interface IAIService {
    MpAnswer chat(MpRequest mpRequest, String sessionKey);
}
