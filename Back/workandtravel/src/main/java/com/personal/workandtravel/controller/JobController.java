package com.personal.workandtravel.controller;

import com.personal.workandtravel.dto.JobDTO;
import com.personal.workandtravel.dto.JobRequestDTO;
import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.service.JobService;
import lombok.Data;
import org.springframework.http.MediaType;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@RestController
@RequestMapping("job")
public class JobController {

    private final JobService jobService;
    @GetMapping(value = "/{id}")
    public JobEntity getJob(@PathVariable("id") Long id) {
        return jobService.getJob(id);
    }

    @GetMapping(value = "/pages")
    public String getPages() {
        return jobService.getTotalPages();
    }

    @GetMapping( value = "/page/{page}")
    public List<JobDTO> getJobsPage(@PathVariable("page") String page) {
        List<JobDTO> jobs = jobService.getPageDTO(page);
        return jobs;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String addNewJob(@ModelAttribute JobRequestDTO jobRequest) throws IOException {

        System.out.println("called on job post");
        System.out.println(jobRequest.toString());
        System.out.println(jobRequest.getLongCoordinate() + " " + jobRequest.getLatCoordinate());

        List<ImageEntity> imagePaths = new ArrayList<>();

        for (MultipartFile image : jobRequest.getSecondaryImages()) {
            String uuid = UUID.randomUUID().toString();
            imagePaths.add(new ImageEntity(uuid, "0"));
            File file = new File("C:\\Users\\zmeui\\Licenta\\DB\\" + uuid + ".jpg");
            image.transferTo(file);  // Save the uploaded file to your local directory
        }

        String uuid = UUID.randomUUID().toString();
        imagePaths.add(new ImageEntity(uuid, "1"));
        File file = new File("C:\\Users\\zmeui\\Licenta\\DB\\" + uuid + ".jpg");
        jobRequest.getMainImage().transferTo(file);

        jobService.addNewJob(new JobEntity(
                jobRequest.getName(),
                jobRequest.getEmail(),
                jobRequest.getCountry(),
                jobRequest.getLatCoordinate(),
                jobRequest.getLongCoordinate(),
                jobRequest.getJob(),
                jobRequest.getSalary(),
                jobRequest.getCurrency(),
                jobRequest.getDescription(),
                jobRequest.getContactInfo(),
                imagePaths
        ));

        return "Form submission received";
    }

    @PostMapping(value = "/hi")
    public String hi() {
        return "Hi";
    }

}
