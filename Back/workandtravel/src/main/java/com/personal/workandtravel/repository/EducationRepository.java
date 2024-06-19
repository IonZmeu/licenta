package com.personal.workandtravel.repository;
import com.personal.workandtravel.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<EducationEntity, Long> {
    List<EducationEntity> findAllByUser(UserEntity user);
    void deleteAllByUserId(Long userId);
}
