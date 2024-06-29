package com.personal.workandtravel.dto;

import com.personal.workandtravel.entity.ImageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobDTO {
    private Long id;
    private String name;
    private String country;
    private String job;
    private double salary;
    private double userId;
    private Long likes;
    private Long dislikes;
    private String creatorName;
    private String currency;
    private String description;
    private LocalDateTime timeCreated;
    private ImageEntity mainImage;
}


