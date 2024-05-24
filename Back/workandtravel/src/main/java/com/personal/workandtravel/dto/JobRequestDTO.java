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

public class JobRequestDTO {
    private String email;
    private String name;
    private String country;
    private String job;
    private String salary;
    private String currency;
    private String description;
    private String contactInfo;
    private String longCoordinate;
    private String latCoordinate;
    private MultipartFile mainImage;
    private MultipartFile[] secondaryImages;

    // Getters and setters
}
