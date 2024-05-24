package com.personal.workandtravel.service;

import com.personal.workandtravel.dto.JobDTO;
import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private  final JobRepository jobRepository;

    @Autowired
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<JobEntity> getJobs() {
        return jobRepository.findAll();
    }

    public JobEntity getJob(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "job with id " + id + " does not exist"
                ));
    }

    public void addNewJob(JobEntity job) {
        Optional<JobEntity> jobOptional = jobRepository
                .findJobByEmail(job.getEmail());
        if (jobOptional.isPresent()) {
            //throw new IllegalStateException("email taken");
        }
        jobRepository.save(job);
    }

    public List<JobEntity> getPage(int page) {
        int pageNumber = page;
        int pageSize = 24;
        Page<JobEntity> jobEntitiesPage = jobRepository.findAll(PageRequest.of(pageNumber, pageSize));

        // Retrieve entities from the page
        List<JobEntity> jobEntities = jobEntitiesPage.getContent();
        return jobEntities;
    }

    public List<JobDTO> getPageDTO(String page) {
        List<JobEntity> jobEntities = getPage(Integer.parseInt(page)-1);
        List<JobDTO> jobDTOS = new java.util.ArrayList<>();
        for (JobEntity jobEntity : jobEntities) {
            JobDTO jobDTO = new JobDTO();
            jobDTO.setId(jobEntity.getId());
            jobDTO.setName(jobEntity.getName());
            jobDTO.setCountry(jobEntity.getCountry());
            jobDTO.setJob(jobEntity.getJob());
            jobDTO.setCurrency(jobEntity.getCurrency());
            jobDTO.setSalary(jobEntity.getSalary());
            jobDTO.setDescription(jobEntity.getDescription());
            for (ImageEntity image : jobEntity.getImages()) {
                if(image.getImageType().equals("1")){
                    jobDTO.setMainImage(image);
                }
            }

            jobDTOS.add(jobDTO);
        }
        return jobDTOS;
    }

    public String getTotalPages() {
        Integer pageSize = 24;
        Integer totalJobs = jobRepository.findAll().size();
        Integer totalPages = totalJobs / pageSize;
        if (totalJobs % pageSize != 0) {
            totalPages++;
        }

        return totalPages.toString();
    }
}


