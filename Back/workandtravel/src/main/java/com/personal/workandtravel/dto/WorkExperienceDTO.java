package com.personal.workandtravel.dto;

import lombok.Data;

@Data
public class WorkExperienceDTO {
    private Long id;
    private String company;
    private String role;
    private String description;
    private int startYear;
    private int endYear;
}