package com.personal.workandtravel.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.personal.workandtravel.dto.ProfileDTOGet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.personal.workandtravel.dto.ProfileDTO;
import com.personal.workandtravel.service.ProfileService;
import java.io.IOException;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{userId}")
    public ProfileDTOGet getUserProfile(@PathVariable Long userId) {
        return profileService.getUserProfile(userId);
    }
    @PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> updateProfile(
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam(value = "cvImages", required = false) MultipartFile[] cvImages,
            @RequestPart(value = "profileDTO") ProfileDTO profileDTO
    ) {
        try {
            System.out.println(profileDTO.getUserId());
            System.out.println(profileDTO.getSkills());
            System.out.println(profileDTO.getEducation());
            System.out.println(profileDTO.getWorkExperiences());
            profileService.updateProfile(profileDTO, profileImage, cvImages);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid profile data: " + e.getMessage());
        }
    }
}
