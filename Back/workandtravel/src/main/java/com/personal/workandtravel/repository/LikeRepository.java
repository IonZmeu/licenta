package com.personal.workandtravel.repository;

import com.personal.workandtravel.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity, Long> {

    Optional<LikeEntity> findByThreadAndUser(ThreadEntity thread, UserEntity user);

    Optional<LikeEntity> findByCommentAndUser(CommentEntity comment, UserEntity user);

    Optional<LikeEntity> findByJobAndUser(JobEntity job, UserEntity user);

    @Query("SELECT COUNT(l) FROM LikeEntity l WHERE l.comment = :comment AND l.liked = :likeType")
    long countByCommentAndLiked(@Param("comment") CommentEntity comment, @Param("likeType") boolean likeType);

    @Query("SELECT COUNT(l) FROM LikeEntity l WHERE l.thread = :thread AND l.liked = :likeType")
    long countByThreadAndLiked(@Param("thread") ThreadEntity thread, @Param("likeType") boolean likeType);

    @Query("SELECT COUNT(l) FROM LikeEntity l WHERE l.job = :job AND l.liked = :likeType")
    long countByJobAndLiked(@Param("job") JobEntity job, @Param("likeType") boolean likeType);
}