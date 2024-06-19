package com.personal.workandtravel.controller;

import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.service.ImageService;
import lombok.Data;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Data
@RestController
@RequestMapping("image")
public class ImageController{
    private final ImageService imageService;
    @GetMapping( value = "/{id}")
    public Optional<String> getImage(@PathVariable("id") Long id) {
        String uuid = imageService.getimageUUID(id);
        String imagePath = "C:\\Users\\zmeui\\Licenta\\DB\\" + uuid + ".jpg";

        File imageFile = new File(imagePath);
        if (imageFile.exists()) {
            try {
                byte[] fileContent = FileCopyUtils.copyToByteArray(imageFile);
                String base64EncodedImage = Base64.getEncoder().encodeToString(fileContent);
                return Optional.of("data:image/jpeg;base64," + base64EncodedImage);
            } catch (IOException e) {
                System.out.println("Error reading image file");
                e.printStackTrace();
                // Handle exception appropriately
            }
        }
        return Optional.empty();
    }

    @GetMapping( value = "/pfp/{id}")
    public Optional<String> getProfileImage(@PathVariable("id") Long id) {
        String uuid = imageService.getProfileImageFromUserId(id);
        String imagePath = "C:\\Users\\zmeui\\Licenta\\DB\\" + uuid + ".jpg";

        File imageFile = new File(imagePath);
        if (imageFile.exists()) {
            try {
                byte[] fileContent = FileCopyUtils.copyToByteArray(imageFile);
                String base64EncodedImage = Base64.getEncoder().encodeToString(fileContent);
                return Optional.of("data:image/jpeg;base64," + base64EncodedImage);
            } catch (IOException e) {
                System.out.println("Error reading image file");
                e.printStackTrace();
                // Handle exception appropriately
            }
        }
        return Optional.empty();
    }

}
