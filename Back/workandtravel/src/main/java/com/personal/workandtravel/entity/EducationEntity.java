package com.personal.workandtravel.entity;

import com.personal.workandtravel.dto.EducationDTO;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class EducationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String degree;
    private String institution;
    private int year;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public EducationDTO toDTO() {
        EducationDTO educationDTO = new EducationDTO();
        educationDTO.setId(this.id);
        educationDTO.setDegree(this.degree);
        educationDTO.setInstitution(this.institution);
        educationDTO.setYear(this.year);
        return educationDTO;
    }
}