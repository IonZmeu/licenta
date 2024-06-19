package com.personal.workandtravel.service;

import com.personal.workandtravel.dto.ImageDTO;
import com.personal.workandtravel.dto.ProfileDTO;
import com.personal.workandtravel.dto.ProfileDTOGet;
import com.personal.workandtravel.entity.EducationEntity;
import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.SkillEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.entity.WorkExperienceEntity;
import com.personal.workandtravel.repository.EducationRepository;
import com.personal.workandtravel.repository.ImageRepository;
import com.personal.workandtravel.repository.SkillRepository;
import com.personal.workandtravel.repository.UserRepository;
import com.personal.workandtravel.repository.WorkExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProfileService {

    private final SkillRepository skillRepository;
    private final EducationRepository educationRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProfileService(SkillRepository skillRepository,
                          EducationRepository educationRepository,
                          WorkExperienceRepository workExperienceRepository,
                          ImageRepository imageRepository,
                          UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.educationRepository = educationRepository;
        this.workExperienceRepository = workExperienceRepository;
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void updateProfile(ProfileDTO profileDTO,
                              MultipartFile profileImage,
                              MultipartFile[] cvImages) throws IOException {
        // Null checks and initialization
        if (profileDTO.getSkills() == null) {
            profileDTO.setSkills(new ArrayList<>());
        }
        if (profileDTO.getEducation() == null) {
            profileDTO.setEducation(new ArrayList<>());
        }
        if (profileDTO.getWorkExperiences() == null) {
            profileDTO.setWorkExperiences(new ArrayList<>());
        }

        // Logging for debugging
        System.out.println("Updating profile for user: " + profileDTO.getUserId());

        UserEntity user = userRepository.findById(profileDTO.getUserId())
                .orElseThrow(() -> new IllegalStateException("User not found"));

        // Update skills if provided
        if (!profileDTO.getSkills().isEmpty()) {
            System.out.println("Updating skills...");
            skillRepository.deleteAllByUserId(user.getId());
            profileDTO.getSkills().forEach(skillDTO -> {
                SkillEntity skill = SkillEntity.builder()
                        .name(skillDTO.getName())
                        .user(user)
                        .build();
                skillRepository.save(skill);
            });
        }else {
            skillRepository.deleteAllByUserId(user.getId());
        }

        // Update education if provided
        if (!profileDTO.getEducation().isEmpty()) {
            System.out.println("Updating education...");
            educationRepository.deleteAllByUserId(user.getId());
            profileDTO.getEducation().forEach(educationDTO -> {
                EducationEntity education = EducationEntity.builder()
                        .degree(educationDTO.getDegree())
                        .institution(educationDTO.getInstitution())
                        .year(educationDTO.getYear())
                        .user(user)
                        .build();
                educationRepository.save(education);
            });
        }else {
            educationRepository.deleteAllByUserId(user.getId());
        }

        // Update work experiences if provided
        if (!profileDTO.getWorkExperiences().isEmpty()) {
            System.out.println("Updating work experiences...");
            workExperienceRepository.deleteAllByUserId(user.getId());
            profileDTO.getWorkExperiences().forEach(workExperienceDTO -> {
                WorkExperienceEntity workExperience = WorkExperienceEntity.builder()
                        .company(workExperienceDTO.getCompany())
                        .role(workExperienceDTO.getRole())
                        .description(workExperienceDTO.getDescription())
                        .startYear(workExperienceDTO.getStartYear())
                        .endYear(workExperienceDTO.getEndYear())
                        .user(user)
                        .build();
                workExperienceRepository.save(workExperience);
            });
        }else {
            workExperienceRepository.deleteAllByUserId(user.getId());
        }


        // Update profile image if provided
        if (profileImage != null) {
            System.out.println("Updating profile image...");
            imageRepository.deleteAllByImageTypeAndUser("1", user);
            String imageUrl = saveImage(profileImage, "profile", user.getId());
            ImageEntity profileImageEntity = ImageEntity.builder()
                    .imageUrl(imageUrl)
                    .imageType("1") // Profile picture type
                    .user(user)
                    .build();
            imageRepository.save(profileImageEntity);
        }else {
            imageRepository.deleteAllByImageTypeAndUser("1", user);
        }

        if(cvImages != null) {
            System.out.println(cvImages.length);
            // Update CV images if provided
            for (MultipartFile cvImageFile : cvImages) {
                if (cvImageFile != null) {
                    System.out.println("Updating CV image...");
                    imageRepository.deleteAllByImageTypeAndUser("0", user);
                    String imageUrl = saveImage(cvImageFile, "cv", user.getId());
                    ImageEntity cvImageEntity = ImageEntity.builder()
                            .imageUrl(imageUrl)
                            .imageType("0") // CV image type
                            .user(user)
                            .build();
                    imageRepository.save(cvImageEntity);
                }
            }
        }else {
            imageRepository.deleteAllByImageTypeAndUser("0", user);
        }
    }


    private String saveImage(MultipartFile imageFile, String type, Long userId) throws IOException {
        String uuid = UUID.randomUUID().toString();
        String directoryPath = "C:\\Users\\zmeui\\Licenta\\DB\\";
        String filePath = directoryPath + uuid + ".jpg";

        // Create directory if it doesn't exist
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();  // Create directories including any necessary but nonexistent parent directories
        }

        // Save the file to the specified path
        File file = new File(filePath);
        imageFile.transferTo(file);

        // Assuming you return the relative path or URL to access the image
        return uuid;  // You can modify this to return a URL or relative path if needed
    }

    public ProfileDTOGet getUserProfile(Long userId) {
        // Fetch user details from the database
        System.out.println("Fetching profile for user: " + userId);
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        System.out.println("Found the user: " + userId);
        // Fetch skills, education, and work experiences for the user
        List<SkillEntity> skills = skillRepository.findAllByUser(user);
        List<EducationEntity> education = educationRepository.findAllByUser(user);
        List<WorkExperienceEntity> workExperiences = workExperienceRepository.findAllByUser(user);
        System.out.println("Fetched the skills education workExperiences ");
        // Create a ProfileDTO object to return
        ProfileDTOGet profileDTOGet = new ProfileDTOGet();
        profileDTOGet.setUsername(user.getUsername());
        profileDTOGet.setUserId(userId);
        profileDTOGet.setSkills(new ArrayList<>());
        profileDTOGet.setEducation(new ArrayList<>());
        profileDTOGet.setWorkExperiences(new ArrayList<>());

        // Populate the ProfileDTO object with the fetched data
        if (skills != null) {
            skills.forEach(skill -> profileDTOGet.getSkills().add(skill.toDTO()));
        }
        if (education != null) {
            education.forEach(edu -> profileDTOGet.getEducation().add(edu.toDTO()));
        }
        if (workExperiences != null) {
            workExperiences.forEach(work -> profileDTOGet.getWorkExperiences().add(work.toDTO()));
        }
        System.out.println("Populated the ProfileDTO object with the fetched data");
        ImageEntity[] cvImages = imageRepository.findAllByImageTypeAndUserId("0", userId).toArray(new ImageEntity[0]);
        ImageEntity pfpImage = imageRepository.findByImageTypeAndUser("1", user);
        System.out.println("Populated the images entities");
        profileDTOGet.setCvImages(cvImages != null ? cvImages : new ImageEntity[0]);
        profileDTOGet.setPfpImage(pfpImage);
        System.out.println("Populated the profileDTOGet with images entities");
        return profileDTOGet;
    }
}
