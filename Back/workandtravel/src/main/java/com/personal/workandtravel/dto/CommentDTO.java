package com.personal.workandtravel.dto;

import com.personal.workandtravel.entity.CommentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDTO {

    private Long id;
    private Long jobId;
    private Long threadId;
    private Long userId;
    private Long depth;
    private Long parentId;
    private Long likes;
    private Long dislikes;
    private String username;
    private String commentContent;
    private Date timeCreated;

    private List<CommentDTO> children;


    // Getters and setters
}
