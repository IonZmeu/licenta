package com.personal.workandtravel.repository;

import com.personal.workandtravel.entity.ImageEntity;


import com.personal.workandtravel.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    Optional<ImageEntity> findImageById(Long id);
    void deleteAllByImageTypeAndUser(String imageType, UserEntity userId);

    <E> Collection<E> findAllByImageTypeAndUserId(String number, Long userId);

    ImageEntity findByImageTypeAndUser(String number, UserEntity userId);

    Optional<ImageEntity> findImageByUserIdAndImageType(Long id, String number);
}
