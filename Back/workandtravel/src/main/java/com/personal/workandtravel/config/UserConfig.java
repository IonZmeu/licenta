package com.personal.workandtravel.config;

import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
@Configuration
@RequiredArgsConstructor
public class UserConfig {
    private final PasswordEncoder passwordEncoder;


    @Bean(name = "userCommandLineRunner")
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            UserEntity usr1 = new UserEntity(
                    //"Ion",
                    //"Zmeu",
                    "smth@gmail.com",
                    passwordEncoder.encode("123456")
                    //"USER"
            );

            UserEntity usr2 = new UserEntity(
                    //"Andrei",
                    //"Habasescu",
                    "smthelse@gmail.com",
                    passwordEncoder.encode("password")
                    //"USER"
            );

            repository.saveAll(
                    List.of(usr1,usr2)
            );
        };
    }
}
