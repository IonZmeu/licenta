package com.personal.workandtravel.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WorkExperienceDTO {
    private Long id;
    private String company;
    private String role;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}