package com.personal.workandtravel.dto;

import com.personal.workandtravel.entity.ImageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobDTO {
    private Long id;
    private String name;
    private String country;
    private String job;
    private String salary;
    private String currency;
    private String description;
    private ImageEntity mainImage;
}


