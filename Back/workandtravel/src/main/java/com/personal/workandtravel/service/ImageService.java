package com.personal.workandtravel.service;

import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.repository.ImageRepository;
import com.personal.workandtravel.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    private  final ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public String getimageUUID(Long id) {
        Optional<ImageEntity> image = imageRepository.findImageById(id);
        return image.get().getImageUrl();
    }

    public String getProfileImageFromUserId(Long id) {
        Optional<ImageEntity> image = imageRepository.findImageByUserIdAndImageType(id, "1");
        return image.map(ImageEntity::getImageUrl).orElse("");
    }
}
