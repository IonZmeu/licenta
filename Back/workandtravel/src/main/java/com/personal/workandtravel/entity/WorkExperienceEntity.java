package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.personal.workandtravel.dto.WorkExperienceDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class WorkExperienceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String company;
    private String role;
    private String description;
    @Column(name = "start_year")
    private LocalDateTime startDate;

    @Column(name = "end_year")
    private LocalDateTime endDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public WorkExperienceDTO toDTO() {
        WorkExperienceDTO workExperienceDTO = new WorkExperienceDTO();
        workExperienceDTO.setId(this.id);
        workExperienceDTO.setCompany(this.company);
        workExperienceDTO.setRole(this.role);
        workExperienceDTO.setDescription(this.description);
        workExperienceDTO.setStartDate(this.startDate);
        workExperienceDTO.setEndDate(this.endDate);
        return workExperienceDTO;
    }

    public WorkExperienceEntity(String company, String role, String description, LocalDateTime startDate, LocalDateTime endDate, UserEntity user) {
        this.company = company;
        this.role = role;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.user = user;
    }
}