package com.personal.workandtravel.repository;
import com.personal.workandtravel.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkExperienceRepository extends JpaRepository<WorkExperienceEntity, Long> {
    List<WorkExperienceEntity> findAllByUser(UserEntity user);
    void deleteAllByUserId(Long userId);
}
