package com.personal.workandtravel.service;

import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}


