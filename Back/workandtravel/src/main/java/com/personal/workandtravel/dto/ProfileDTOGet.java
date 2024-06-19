package com.personal.workandtravel.dto;

import com.personal.workandtravel.entity.ImageEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProfileDTOGet {
    private Long userId;
    private String username;
    private List<SkillDTO> skills = new ArrayList<>();
    private List<EducationDTO> education = new ArrayList<>();
    private List<WorkExperienceDTO> workExperiences = new ArrayList<>();
    private ImageEntity[] cvImages;
    private ImageEntity pfpImage;
}
