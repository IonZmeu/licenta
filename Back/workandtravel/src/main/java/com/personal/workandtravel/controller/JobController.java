package com.personal.workandtravel.controller;

import com.personal.workandtravel.dto.JobDTO;
import com.personal.workandtravel.dto.JobPageDTO;
import com.personal.workandtravel.dto.JobRequestDTO;
import com.personal.workandtravel.dto.JobsPagesResponse;
import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.service.CurrencyConversionService;
import com.personal.workandtravel.service.JobService;
import com.personal.workandtravel.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@RestController
@RequestMapping("job")
public class JobController {
    @Autowired
    CurrencyConversionService currencyConversionService;

    private final JobService jobService;
    private final UserService userService;

    @GetMapping(value = "/{id}")
    public JobPageDTO getJob(@PathVariable("id") Long id) {
        return jobService.getJob(id);
    }

    @GetMapping(value = "/pages")
    public String getPages() {
        return jobService.getTotalPages();
    }

    @GetMapping(value = "/names")
    public List<String> getJobUniqueNames() {
        return jobService.getDistinctByJob();
    }

    @GetMapping(value = "/countries")
    public List<String> getCountryUniqueNames() {
        return jobService.getDistinctByCountry();
    }

    @GetMapping("/page/{page}")
    public ResponseEntity<JobsPagesResponse> getJobs(
            @PathVariable(value = "page") String page,
            @RequestParam(value = "sort") String sortType,
            @RequestParam(value = "min", required = false) Double minSalaryUSD,
            @RequestParam(value = "max", required = false) Double maxSalaryUSD,
            @RequestParam(value = "countryName", required = false) String country,
            @RequestParam(value = "jobName", required = false) String job) {

        System.out.println("info obtained");
        System.out.println(sortType);
        System.out.println(minSalaryUSD);
        System.out.println(maxSalaryUSD);
        System.out.println(country);
        System.out.println(job);
        // Null check and parameter validation
        if (sortType == null || !isValidSortType(sortType)) {
            // Handle invalid sortType
            throw new IllegalArgumentException("Invalid sort type: " + sortType);
        }

        // Handle default values
        if (minSalaryUSD == null) {
            minSalaryUSD = 0.0;
        }
        if (maxSalaryUSD == null) {
            maxSalaryUSD = Double.MAX_VALUE;
        }
        if(country.isEmpty()) {
            country = null;
        }
        if(job.isEmpty()) {
            job = null;
        }
        Map<String, Object> jobs;
        // Invoke service method based on sortType
        switch (sortType) {
            case "new":
                jobs =  jobService.getJobsSortedByTimeCreated(page, minSalaryUSD, maxSalaryUSD, country, job);
                break;
            case "likes":
                jobs =  jobService.getJobsSortedByLikes(page, minSalaryUSD, maxSalaryUSD, country, job);
                break;
            case "hot":
                jobs =  jobService.getMostLikedJobsInPastWeek(page, minSalaryUSD, maxSalaryUSD, country, job);
                break;
            default:
                jobs =  jobService.getJobsSortedByTimeCreated(page, minSalaryUSD, maxSalaryUSD, country, job);
        }
        JobsPagesResponse response = new JobsPagesResponse();
        response.setJobs((List<JobDTO>) jobs.get("jobs"));
        response.setTotalPages((Long) jobs.get("totalPages"));

        return ResponseEntity.ok(response);
    }

    private boolean isValidSortType(String sortType) {
        // Add logic to validate sortType
        return sortType.equals("new") || sortType.equals("likes") || sortType.equals("hot");
    }

    @PutMapping("/follow")
    public void followJob(@RequestParam("jobId") Long jobId, @RequestParam("userId") Long userId) {
        jobService.followJob(jobId, userId);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String addNewJob(@ModelAttribute JobRequestDTO jobRequest) throws IOException {

        System.out.println("called on job post");
        System.out.println(jobRequest.toString());

        List<ImageEntity> imagePaths = new ArrayList<>();
        if(jobRequest.getSecondaryImages() != null ) {
            for (MultipartFile image : jobRequest.getSecondaryImages()) {
                String uuid = UUID.randomUUID().toString();
                imagePaths.add(new ImageEntity(uuid, "0"));
                File file = new File("C:\\Users\\zmeui\\Licenta\\DB\\" + uuid + ".jpg");
                image.transferTo(file);  // Save the uploaded file to your local directory
            }
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
                currencyConversionService.convertToUSD(jobRequest.getSalary(), jobRequest.getCurrency()),
                jobRequest.getCurrency(),
                jobRequest.getDescription(),
                jobRequest.getContactInfo(),
                imagePaths,
                userService.getUser((long) jobRequest.getAuthorId())
        ));

        return "Form submission received";
    }

    @PostMapping(value = "/hi")
    public String hi() {
        return "Hi";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

}
