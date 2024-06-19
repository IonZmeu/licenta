package com.personal.workandtravel.repository;

import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import com.personal.workandtravel.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findUserById(Long id);

    Optional<UserEntity> findUserByEmail(String email);

    Optional<UserEntity> findUserIdByEmail(String email);

    @Query("SELECT u.followedThreads FROM UserEntity u WHERE u.id = :userId")
    List<ThreadEntity> findFollowedThreadsByUserId(@Param("userId") Long userId);

}