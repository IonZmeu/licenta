package com.personal.workandtravel.repository;

import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, Long> {
    Optional<JobEntity> findJobByEmail(String email);

    Optional<JobEntity> findJobById(Long id);
    Page<JobEntity> findAll(Pageable pageable);

    @Query("SELECT j FROM JobEntity j " +
            "WHERE (:minSalaryInUSD IS NULL OR :maxSalaryInUSD IS NULL OR j.salaryInUSD BETWEEN :minSalaryInUSD AND :maxSalaryInUSD) " +
            "AND (:country IS NULL OR j.country = :country) " +
            "AND (:job IS NULL OR j.job = :job) " +
            "ORDER BY j.timeCreated DESC")
    Page<JobEntity> findByCriteriaOrderByTimeCreatedDesc(@Param("minSalaryInUSD") Double minSalaryInUSD, @Param("maxSalaryInUSD") Double maxSalaryInUSD, @Param("country") String country, @Param("job") String job, Pageable pageable);

    @Query("SELECT j FROM JobEntity j " +
            "LEFT JOIN j.givenLikesAndDislikes l " +
            "WHERE (:minSalaryInUSD IS NULL OR :maxSalaryInUSD IS NULL OR j.salaryInUSD BETWEEN :minSalaryInUSD AND :maxSalaryInUSD) " +
            "AND (:country IS NULL OR j.country = :country) " +
            "AND (:job IS NULL OR j.job = :job) " +
            "GROUP BY j " +
            "ORDER BY COUNT(l) DESC")
    Page<JobEntity> findByCriteriaOrderByLikesDesc(@Param("minSalaryInUSD") Double minSalaryInUSD, @Param("maxSalaryInUSD") Double maxSalaryInUSD, @Param("country") String country, @Param("job") String job, Pageable pageable);
    @Query("SELECT j FROM JobEntity j " +
            "LEFT JOIN j.givenLikesAndDislikes l " +
            "WHERE (:minSalaryInUSD IS NULL OR :maxSalaryInUSD IS NULL OR j.salaryInUSD BETWEEN :minSalaryInUSD AND :maxSalaryInUSD) " +
            "AND (:country IS NULL OR j.country = :country) " +
            "AND (:job IS NULL OR j.job = :job) " +
            "AND (CAST(:oneWeekAgo AS TIMESTAMP) IS NULL OR j.timeCreated >= CAST(:oneWeekAgo AS TIMESTAMP)) " +
            "GROUP BY j " +
            "ORDER BY COUNT(l) DESC")
    Page<JobEntity> findHotJobs(@Param("minSalaryInUSD") Double minSalaryInUSD, @Param("maxSalaryInUSD") Double maxSalaryInUSD, @Param("country") String country, @Param("job") String job, @Param("oneWeekAgo") LocalDateTime oneWeekAgo, Pageable pageable);


    @Query("SELECT DISTINCT l.job FROM LikeEntity l WHERE l.user.id = :userId AND l.liked = true")
    List<JobEntity> findLikedJobsByUserId(@Param("userId") Long userId);
    @Query("SELECT DISTINCT l.job FROM LikeEntity l WHERE l.user.id = :userId AND l.liked = false")
    List<JobEntity> findDislikedJobsByUserId(@Param("userId") Long userId);
    @Query("SELECT j FROM JobEntity j JOIN j.usersFollowing u WHERE u.id = :userId")
    List<JobEntity> findFollowedJobsByUserId(@Param("userId") Long userId);
}
