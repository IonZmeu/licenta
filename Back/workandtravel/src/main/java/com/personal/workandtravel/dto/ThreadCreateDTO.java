package com.personal.workandtravel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ThreadCreateDTO {
    private String userId;
    private String title;
    private String description;
    private MultipartFile[] images;
}
