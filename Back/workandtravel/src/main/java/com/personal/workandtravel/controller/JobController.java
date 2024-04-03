package com.personal.workandtravel.controller;

import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.service.JobService;
import lombok.Data;
import org.springframework.http.MediaType;
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

    @GetMapping( value = "/test")
    public String tests() {
        String names = "";
        for (JobEntity job : jobService.getJobs()) {
            names += job.getName() + " ";
        }
        return "You accessed the job controller!" + names;}


    @GetMapping
    public List<JobEntity> getJobs() {
        return jobService.getJobs();
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String addNewJob(
            @RequestParam("email") String email,
            @RequestParam("name") String name,
            @RequestParam("country") String country,
            @RequestParam("long_coordinate") String long_coordinate,
            @RequestParam("lat_coordinate") String lat_coordinate,
            @RequestPart("images") MultipartFile[] images) throws IOException {

        System.out.println("called on job post");
        System.out.println(long_coordinate + " " + lat_coordinate);
        List<ImageEntity> imagePaths = new ArrayList<>();
        for(MultipartFile image : images){
            String uuid = UUID.randomUUID().toString();
            imagePaths.add(new ImageEntity(uuid));
            File file = new File("C:\\Users\\zmeui\\Licenta\\DB\\" + uuid + ".jpg");
            image.transferTo(file);  // Save the uploaded file to your local directory
        }
        jobService.addNewJob(new JobEntity(name,email,country,lat_coordinate,long_coordinate,imagePaths));


        return "Form submission received";
    }
    

}
