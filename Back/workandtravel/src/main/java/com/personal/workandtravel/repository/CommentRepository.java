package com.personal.workandtravel.repository;

import com.personal.workandtravel.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    Optional<CommentEntity> findCommentById(Long id);

    List<CommentEntity> findCommentsByJobId(Long jobId);
    List<CommentEntity> findCommentsByJobIdAndDepth(Long jobId, Long depth);
}
