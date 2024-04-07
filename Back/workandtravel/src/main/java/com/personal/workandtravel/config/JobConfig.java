package com.personal.workandtravel.config;

import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.repository.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class JobConfig {

    @Bean(name = "jobCommandLineRunner")
    CommandLineRunner commandLineRunner(JobRepository repository) {
        return args -> {
            List<ImageEntity> images = Arrays.asList(
                    new ImageEntity("n1","1"),
                    new ImageEntity("n2","0")
            );

            List<ImageEntity> images2 = Arrays.asList(
                    new ImageEntity("n2","1")
            );

            List<ImageEntity> images3 = Arrays.asList(
                    new ImageEntity("n3","1")
            );

            List<ImageEntity> images4 = Arrays.asList(
                    new ImageEntity("n4","1")
            );

            JobEntity usa = new JobEntity(
                    "sunnyholiday",
                    "work@gmail.com",
                    "America",
                    "39.045753",
                    "76.641273",
                    "Software Engineer",
                    "1200 USD",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                    "077965446 whatsapp, 077965446 phone",
                    images
            );

            JobEntity uk = new JobEntity(
                    "Starbucks",
                    "StarJobs@gmail.com",
                    "United Kingdom",
                    "35.045753",
                    "72.641273",
                    "Barista",
                    "1000 USD",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                    "077962346 whatsapp, 077962346 phone",
                    images2
            );

            JobEntity fr = new JobEntity(
                    "Paris pool",
                    "ParisPoolJobs@gmail.com",
                    "France",
                    "31.045753",
                    "75.641273",
                    "Life guard",
                    "1100 USD",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                    "012962346 whatsapp, 012962346 phone",
                    images3
            );

            JobEntity pub = new JobEntity(
                    "Popular pub",
                    "PopularPublJobs@gmail.com",
                    "United Kingdom",
                    "35.445753",
                    "72.941273",
                    "Server",
                    "700 pounds + tips",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                    "012955346 whatsapp, 012955346 phone",
                    images4
            );

            repository.saveAll(
                    List.of(usa,uk,fr,pub)
            );
        };
    }
}
