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
                    new ImageEntity("n1"),
                    new ImageEntity("n2")
            );

            JobEntity usa = new JobEntity(
                    "sunnyholiday",
                    "work@gmail.com",
                    "USA",
                    "39.045753",
                    "76.641273",
                    images
            );

            JobEntity uk = new JobEntity(
                    "UK",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.@gmail.com"
            );

            repository.saveAll(
                    List.of(usa,uk)
            );
        };
    }
}
