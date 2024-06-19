package com.personal.workandtravel.repository;

import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    Optional<CommentEntity> findCommentById(Long id);

    List<CommentEntity> findCommentsByJobId(Long jobId);
    List<CommentEntity> findCommentsByJobIdAndDepthOrderByTimeCreated(Long jobId, Long depth);

    List<CommentEntity> findCommentsByThreadIdAndDepthOrderByTimeCreated(Long id, long l);

    @Query("SELECT c FROM CommentEntity c JOIN c.givenLikesAndDislikes l WHERE l.user.id = :userId AND l.liked = false")
    List<CommentEntity> findDislikedCommentsByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM CommentEntity c JOIN c.givenLikesAndDislikes l WHERE l.user.id = :userId AND l.liked = true")
    List<CommentEntity> findLikedCommentsByUserId(@Param("userId") Long userId);
}
