package com.personal.workandtravel.repository;

import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ThreadRepository extends JpaRepository<ThreadEntity, Long> {
    Page<ThreadEntity> findAll(Pageable pageable);
    Optional<ThreadEntity> findThreadById(Long id);
    ThreadEntity save(ThreadEntity thread);
    void deleteById(Long id);
}
