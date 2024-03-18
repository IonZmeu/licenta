package com.personal.workandtravel.service;

import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private  final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserEntity> getUsers() {
        return userRepository.findAll();
    }

    public void addNewUser(UserEntity user) {
        Optional<UserEntity> userOptional = userRepository
                .findUserByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        boolean exists = userRepository.existsById(userId);
        if (!exists) {
            throw new IllegalStateException("user with id " + userId + " does not exists");
        }
        userRepository.deleteById(userId);
    }

    @Transactional
    public void updateUser(Long userId, String email) { //String firstName, String lastName,
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id " + userId + " does not exists"
                ));

        //if (firstName != null && firstName.length() > 0 && !user.getFirstName().equals(firstName)) {
        //    user.setFirstName(firstName);
        //}

        //if (lastName != null && lastName.length() > 0 && !user.getLastName().equals(lastName)) {
        //    user.setLastName(lastName);
        //}

        if (email != null && email.length() > 0 && !user.getEmail().equals(email)) {
            Optional<UserEntity> userOptional = userRepository
                    .findUserByEmail(email);
            if (userOptional.isPresent()) {
                throw new IllegalStateException("email taken");
            }
            user.setEmail(email);
        }
    }
}


