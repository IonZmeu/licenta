package com.personal.workandtravel.repository;

import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ThreadRepository extends JpaRepository<ThreadEntity, Long> {
    Page<ThreadEntity> findAll(Pageable pageable);
    Optional<ThreadEntity> findThreadById(Long id);
    ThreadEntity save(ThreadEntity thread);

    List<ThreadEntity> findAllByUserId(Long userId);
    void deleteById(Long id);

    @Query("SELECT t FROM ThreadEntity t JOIN t.givenLikesAndDislikes l WHERE l.user.id = :userId AND l.liked = true")
    List<ThreadEntity> findLikedThreadsByUserId(@Param("userId") Long userId);

    @Query("SELECT t FROM ThreadEntity t JOIN t.givenLikesAndDislikes l WHERE l.user.id = :userId AND l.liked = false")
    List<ThreadEntity> findDislikedThreadsByUserId(@Param("userId") Long userId);

    @Query("SELECT t FROM ThreadEntity t JOIN t.user u WHERE u.id = :userId")
    List<ThreadEntity> findFollowedThreadsByUserId(@Param("userId") Long userId);

    @Query("SELECT t FROM ThreadEntity t LEFT JOIN t.givenLikesAndDislikes l WITH l.liked = true GROUP BY t.id ORDER BY COUNT(l.id) DESC")
    Page<ThreadEntity> getThreadsSortedByLikes(Pageable page);

    @Query("SELECT t FROM ThreadEntity t LEFT JOIN t.givenLikesAndDislikes l WITH l.liked = true AND l.timeCreated > :oneWeekAgo GROUP BY t.id ORDER BY COUNT(l.id) DESC")
    Page<ThreadEntity> getMostLikedThreadsInPastWeek(@Param("oneWeekAgo") LocalDateTime oneWeekAgo, Pageable page);

    @Query("SELECT t FROM ThreadEntity t ORDER BY t.timeCreated DESC")
    Page<ThreadEntity> getThreadsSortedByTimeCreated(Pageable page);

    @Query("SELECT t FROM ThreadEntity t WHERE t.author.id = :userId OR EXISTS (SELECT u FROM t.user u WHERE u.id = :userId)")
    List<ThreadEntity> findAllFollowedAndCreatedByUserId(@Param("userId") Long userId);
}
