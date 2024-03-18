package com.personal.workandtravel.config;

import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.repository.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class JobConfig {

    @Bean(name = "jobCommandLineRunner")
    CommandLineRunner commandLineRunner(JobRepository repository) {
        return args -> {
            JobEntity usa = new JobEntity(
                    "sunnyholiday",
                    "work@gmail.com",
                    "USA",
                    "image",
                    39.045753,
                    76.641273
            );

            JobEntity uk = new JobEntity(
                    "UK"
            );

            repository.saveAll(
                    List.of(usa,uk)
            );
        };
    }
}
