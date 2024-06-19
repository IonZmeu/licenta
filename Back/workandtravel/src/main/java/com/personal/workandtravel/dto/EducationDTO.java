package com.personal.workandtravel.dto;

import lombok.Data;

@Data
public class EducationDTO {
    private Long id;
    private String degree;
    private String institution;
    private int year;
}