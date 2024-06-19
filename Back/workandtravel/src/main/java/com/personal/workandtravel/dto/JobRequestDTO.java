package com.personal.workandtravel.dto;

import com.personal.workandtravel.entity.UserEntity;
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
    private double salary;
    private String currency;
    private String description;
    private String contactInfo;
    private String longCoordinate;
    private String latCoordinate;
    private MultipartFile mainImage;
    private MultipartFile[] secondaryImages;
    private double authorId;


    // Getters and setters
}
