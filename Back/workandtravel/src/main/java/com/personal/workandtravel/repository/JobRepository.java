package com.personal.workandtravel.repository;

import com.personal.workandtravel.entity.JobEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, Long> {
    Optional<JobEntity> findJobByEmail(String email);

    Optional<JobEntity> findJobById(Long id);
    Page<JobEntity> findAll(Pageable pageable);
}
