package com.personal.workandtravel.controller;

import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.service.JobService;
import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@Data
@RestController
@RequestMapping("job")
public class JobController {

    private final JobService jobService;

    @GetMapping
    public List<JobEntity> getJobs() {
        return jobService.getJobs();
    }
}
