package com.rosy.minervia.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usage {
    private Integer prompt_tokens;
    private Integer completion_tokens;
    private Integer total_tokens;
}
