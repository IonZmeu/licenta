package com.personal.workandtravel.dto;

import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.ImageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobPageDTO {
    private Long id;
    private String name;
    private String country;
    private String job;
    private String latCoordinate;
    private String longCoordinate;
    private double salary;
    private double userId;
    private Long likes;
    private Long dislikes;
    private String creatorName;
    private String currency;
    private String description;
    private List<ImageEntity> images;
    private List<CommentEntity> comments;
}

