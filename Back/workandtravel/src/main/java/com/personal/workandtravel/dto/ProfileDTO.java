package com.personal.workandtravel.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProfileDTO {
    private Long userId;
    private String username;
    private List<SkillDTO> skills = new ArrayList<>();
    private List<EducationDTO> education = new ArrayList<>();
    private List<WorkExperienceDTO> workExperiences = new ArrayList<>();
}
