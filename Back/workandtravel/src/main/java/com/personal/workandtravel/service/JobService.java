package com.personal.workandtravel.service;

import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}


