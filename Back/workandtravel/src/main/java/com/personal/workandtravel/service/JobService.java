package com.personal.workandtravel.service;

import com.personal.workandtravel.dto.JobDTO;
import com.personal.workandtravel.dto.JobPageDTO;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.repository.JobRepository;
import com.personal.workandtravel.repository.LikeRepository;
import com.personal.workandtravel.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    private int pageSize = 24;

    @Autowired
    public JobService(JobRepository jobRepository, UserRepository userRepository, LikeRepository likeRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
    }

    public List<JobEntity> getJobs() {
        return jobRepository.findAll();
    }

    public JobPageDTO getJob(Long id) {
        JobEntity job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "job with id " + id + " does not exist"
                ));
        return convertToPageDTO(job);
    }

    private JobPageDTO convertToPageDTO(JobEntity job) {
        JobPageDTO jobPageDTO = new JobPageDTO();
        jobPageDTO.setId(job.getId());
        jobPageDTO.setName(job.getName());
        jobPageDTO.setCountry(job.getCountry());
        jobPageDTO.setJob(job.getJob());
        jobPageDTO.setCurrency(job.getCurrency());
        jobPageDTO.setSalary(job.getSalary());
        jobPageDTO.setDescription(job.getDescription());
        jobPageDTO.setUserId(job.getAuthor().getId());
        jobPageDTO.setCreatorName(job.getAuthor().getUsername());
        jobPageDTO.setImages(job.getImages());
        jobPageDTO.setComments(job.getComments());
        jobPageDTO.setLatCoordinate(job.getLatCoordinate());
        jobPageDTO.setLongCoordinate(job.getLongCoordinate());
        jobPageDTO.setLikes(likeRepository.countByJobAndLiked(job, true));
        jobPageDTO.setDislikes(likeRepository.countByJobAndLiked(job, false));
        jobPageDTO.setEmail(job.getEmail());
        jobPageDTO.setContactInfo(job.getContactInfo());
        jobPageDTO.setTimeCreated(job.getTimeCreated());
        return jobPageDTO;
    }

    public JobEntity getJobEntity(Long id) {
         return jobRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "job with id " + id + " does not exist"
                ));
    }

    public void addNewJob(JobEntity job) {
        if (jobRepository.findJobByEmail(job.getEmail()).isPresent()) {
            // throw new IllegalStateException("email taken");
        }
        jobRepository.save(job);
    }


    public Map<String, Object> getPageDTONoSort(String page, Double minSalaryUSD, Double maxSalaryUSD, String country, String job) {
        Page<JobEntity> jobEntities = jobRepository.findAll(PageRequest.of(Integer.parseInt(page) - 1, pageSize));

        List<JobDTO> jobDTOs = jobEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        long totalPages = jobEntities.getTotalPages(); // Assuming you have a method to calculate total pages

        Map<String, Object> result = new HashMap<>();
        result.put("jobs", jobDTOs);
        result.put("totalPages", totalPages);

        return result;
    }

    public  Map<String, Object> getJobsSortedByTimeCreated(String page, Double minSalaryUSD, Double maxSalaryUSD, String country, String job) {
        Page<JobEntity> jobEntities = jobRepository.findByCriteriaOrderByTimeCreatedDesc(minSalaryUSD,maxSalaryUSD,country,job,PageRequest.of(Integer.parseInt(page)-1, pageSize));
        long totalPages = jobEntities.getTotalPages();
        List<JobDTO> jobDTOs = jobEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("jobs", jobDTOs);
        result.put("totalPages", totalPages);

        return result;
    }

    public Map<String, Object> getJobsSortedByLikes(String page, Double minSalaryUSD, Double maxSalaryUSD, String country, String job) {
        Page<JobEntity> jobEntities = jobRepository.findByCriteriaOrderByLikesDesc(minSalaryUSD, maxSalaryUSD, country, job, PageRequest.of(Integer.parseInt(page) - 1, pageSize));

        List<JobDTO> jobDTOs = jobEntities.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        long totalPages = jobEntities.getTotalPages();

        Map<String, Object> result = new HashMap<>();
        result.put("jobs", jobDTOs);
        result.put("totalPages", totalPages);

        return result;
    }

    public Map<String, Object> getMostLikedJobsInPastWeek(String page, Double minSalaryUSD, Double maxSalaryUSD, String country, String job) {
        LocalDateTime date = LocalDateTime.now().minusDays(7);

        Page<JobEntity> jobEntities = jobRepository.findHotJobs(minSalaryUSD, maxSalaryUSD, country, job, date, PageRequest.of(Integer.parseInt(page) - 1, pageSize));

        List<JobDTO> jobDTOs = jobEntities.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        long totalPages = jobEntities.getTotalPages();

        Map<String, Object> result = new HashMap<>();
        result.put("jobs", jobDTOs);
        result.put("totalPages", totalPages);

        return result;
    }
    private JobDTO convertToDTO(JobEntity jobEntity) {
        JobDTO jobDTO = new JobDTO();
        jobDTO.setId(jobEntity.getId());
        jobDTO.setName(jobEntity.getName());
        jobDTO.setCountry(jobEntity.getCountry());
        jobDTO.setJob(jobEntity.getJob());
        jobDTO.setCurrency(jobEntity.getCurrency());
        jobDTO.setSalary(jobEntity.getSalary());
        jobDTO.setDescription(jobEntity.getDescription());
        jobDTO.setUserId(jobEntity.getAuthor().getId());
        jobDTO.setCreatorName(jobEntity.getAuthor().getUsername());
        jobDTO.setLikes(likeRepository.countByJobAndLiked(jobEntity, true));
        jobDTO.setDislikes(likeRepository.countByJobAndLiked(jobEntity, false));
        jobDTO.setTimeCreated(jobEntity.getTimeCreated());
        jobEntity.getImages().stream()
                .filter(image -> "1".equals(image.getImageType()))
                .findFirst()
                .ifPresent(jobDTO::setMainImage);
        return jobDTO;
    }

    public String getTotalPages() {
        long totalJobs = jobRepository.count();
        int totalPages = (int) Math.ceil((double) totalJobs / pageSize);
        return String.valueOf(totalPages);
    }

    public List<String> getDistinctByJob() {
        List<JobEntity> jobs = jobRepository.findAll();
        return jobs.stream()
                .map(JobEntity::getJob)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> getDistinctByCountry() {
        List<JobEntity> jobs = jobRepository.findAll();
        return jobs.stream()
                .map(JobEntity::getCountry)
                .distinct()
                .collect(Collectors.toList());
    }

    @Transactional
    public void followJob(Long jobId, Long userId) {
        System.out.println("userId: " + userId + " jobId: " + jobId);
        JobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalStateException(
                        "Job with id " + jobId + " does not exist"
                ));
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "User with id " + userId + " does not exist"
                ));

        if (user.getFollowedJobs().contains(job)) {
            user.getFollowedJobs().remove(job); // Remove the job if already followed
        } else {
            user.getFollowedJobs().add(job); // Otherwise, add the job to followed jobs
        }

        userRepository.save(user);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}


