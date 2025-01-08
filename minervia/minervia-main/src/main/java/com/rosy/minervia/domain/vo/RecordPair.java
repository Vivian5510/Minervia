package com.rosy.minervia.domain.vo;

import com.rosy.minervia.domain.entity.Records;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordPair {
    private RecordsVO question;
    private RecordsVO answer;
}
