package com.personal.workandtravel.dto;

import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ThreadDTO {

        private Long id;
        private Long authorId;
        private Long likes;
        private Long dislikes;
        private String authorName;
        private String threadTitle;
        private String threadContent;
        private LocalDateTime timeCreated;
        private List<CommentEntity> comments;
        private List<ImageEntity> images;

        // Getters and setters
}
