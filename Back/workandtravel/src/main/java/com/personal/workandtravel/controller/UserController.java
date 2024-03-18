package com.personal.workandtravel.controller;

import com.personal.workandtravel.service.UserService;
import com.personal.workandtravel.entity.UserEntity;

import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserEntity> getUsers() {
        return userService.getUsers();
    }

    @PostMapping
    public void registerNewUser(@RequestBody UserEntity user) {
        userService.addNewUser(user);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }


    @PutMapping("{userId}")
    public void updateUser(
            @PathVariable("userId") Long userId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String email) {
        userService.updateUser(userId, email);//firstName, lastName,
    }
}
