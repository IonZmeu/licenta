package com.personal.workandtravel.dto;

import com.personal.workandtravel.entity.CommentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDTO {

    private Long jobId;

    private Long threadId;

    private Long userId;

    private Long depth;

    private Long parentId;

    private String username;

    private String commentContent;

    private List<CommentEntity> children;


    // Getters and setters
}
