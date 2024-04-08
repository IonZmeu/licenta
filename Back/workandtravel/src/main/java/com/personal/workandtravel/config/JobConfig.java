package com.personal.workandtravel.config;

import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.repository.JobRepository;
import com.personal.workandtravel.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;

@Configuration
public class AppConfig {

private final PasswordEncoder passwordEncoder;

public AppConfig(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
}

@Bean(name = "userCommandLineRunner")
CommandLineRunner userCommandLineRunner(UserRepository userRepository, JobRepository jobRepository
    return args -> {
        // User Comments
        List<CommentEntity> comments = Arrays.asList(
                new CommentEntity("1", "Nice place", "0"),
                new CommentEntity("2", "I would like to go there", "0")
        );

        List<CommentEntity> comments2 = Arrays.asList(
                new CommentEntity("1", "Nice place", "0"),
                new CommentEntity("2", "I would like to go there fr", "0")
        );

        // Images for Jobs
        List<ImageEntity> images = Arrays.asList(
                new ImageEntity("n1", "1"),
                new ImageEntity("n2", "0"),
                new ImageEntity("n3", "0"),
                new ImageEntity("n4", "0"),
                new ImageEntity("n5", "0"),
                new ImageEntity("n6", "0"),
                new ImageEntity("n7", "0")
        );

        List<ImageEntity> images2 = Arrays.asList(
                new ImageEntity("n2", "1")
        );

        List<ImageEntity> images3 = Arrays.asList(
                new ImageEntity("n3", "1")
        );

        List<ImageEntity> images4 = Arrays.asList(
                new ImageEntity("n4", "1")
        );

        List<ImageEntity> images5 = Arrays.asList(
                new ImageEntity("n5", "1")
        );

        List<ImageEntity> images6 = Arrays.asList(
                new ImageEntity("n6", "1")
        );

        List<ImageEntity> images7 = Arrays.asList(
                new ImageEntity("n7", "1")
        );

        // User Entities
        UserEntity usr1 = new UserEntity(
                "smth@gmail.com",
                passwordEncoder.encode("123456"),
                comments
        );

        UserEntity usr2 = new UserEntity(
                "smthelse@gmail.com",
                passwordEncoder.encode("password"),
                comments2
        );

        userRepository.saveAll(List.of(usr1, usr2));

        // Job Entities
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

        JobEntity accountant = new JobEntity(
                "TopMath",
                "TopMath@gmail.com",
                "United Kingdom",
                "32.445753",
                "71.941273",
                "Accountant",
                "1200 pounds",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "012953346 whatsapp, 0129553346 phone",
                images5
        );

        JobEntity salesman = new JobEntity(
                "Sales",
                "SalesInc@gmail.com",
                "America",
                "35.445753",
                "72.941273",
                "salesman",
                "800 USD ",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012957746 whatsapp, 012957746 phone",
                images6
        );

        JobEntity cashier = new JobEntity(
                "Walmart",
                "WalmartEmploy@gmail.com",
                "America",
                "35.445753",
                "72.941273",
                "cashier",
                "1300 USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "018955346 whatsapp, 018955346 phone",
                images7
        );

        jobRepository.saveAll(List.of(usa, uk, fr, pub, accountant, salesman, cashier));
    };
}