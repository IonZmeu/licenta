package com.personal.workandtravel.entity;

import com.personal.workandtravel.dto.SkillDTO;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class SkillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public SkillDTO toDTO() {
        SkillDTO skillDTO = new SkillDTO();
        skillDTO.setId(this.id);
        skillDTO.setName(this.name);
        return skillDTO;
    }

    public SkillEntity(String name, UserEntity user) {
        this.name = name;
        this.user = user;
    }
}