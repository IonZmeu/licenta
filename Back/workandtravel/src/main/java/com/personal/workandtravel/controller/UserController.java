package com.personal.workandtravel.controller;

import com.personal.workandtravel.dto.JobDTO;
import com.personal.workandtravel.dto.ThreadDTO;
import com.personal.workandtravel.dto.UserDTO;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import com.personal.workandtravel.service.UserService;
import com.personal.workandtravel.entity.UserEntity;

import lombok.Data;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("{userId}")
    public UserDTO getUserById(@PathVariable("userId") Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/threads/followed")
    public List<ThreadDTO> getFollowedThreads(@RequestParam(value = "userId") Long userId) {
        return userService.getFollowedThreadsByUserId(userId);
    }

    @GetMapping("/jobs/followed")
    public List<JobDTO> getFollowedJobs(@RequestParam(value = "userId") Long userId) {
        return  userService.getFollowedJobsByUserId(userId);
    }
    @GetMapping("/{userId}/followed-jobs")
    public ResponseEntity<List<Long>> getFollowedJobIds(@PathVariable Long userId) {
        List<Long> followedJobIds = userService.getFollowedJobIds(userId);
        return ResponseEntity.ok(followedJobIds);
    }

    @GetMapping("/{userId}/liked-jobs")
    public ResponseEntity<List<Long>> getLikedJobIds(@PathVariable Long userId) {
        List<Long> likedJobIds = userService.getLikedJobIds(userId);
        return ResponseEntity.ok(likedJobIds);
    }

    @GetMapping("/{userId}/disliked-jobs")
    public ResponseEntity<List<Long>> getDislikedJobIds(@PathVariable Long userId) {
        List<Long> dislikedJobIds = userService.getDislikedJobIds(userId);
        return ResponseEntity.ok(dislikedJobIds);
    }

    @GetMapping("/{userId}/followed-threads")
    public ResponseEntity<List<Long>> getFollowedThreadIds(@PathVariable Long userId) {
        List<Long> followedThreadIds = userService.getFollowedThreadIds(userId);
        return ResponseEntity.ok(followedThreadIds);
    }

    @GetMapping("/{userId}/liked-threads")
    public ResponseEntity<List<Long>> getLikedThreadIds(@PathVariable Long userId) {
        List<Long> likedThreadIds = userService.getLikedThreadIds(userId);
        return ResponseEntity.ok(likedThreadIds);
    }

    @GetMapping("/{userId}/disliked-threads")
    public ResponseEntity<List<Long>> getDislikedThreadIds(@PathVariable Long userId) {
        List<Long> dislikedThreadIds = userService.getDislikedThreadIds(userId);
        return ResponseEntity.ok(dislikedThreadIds);
    }

    @GetMapping("/{userId}/liked-comments")
    public ResponseEntity<List<Long>> getLikedCommentIds(@PathVariable Long userId) {
        List<Long> likedThreadIds = userService.getLikedCommentIds(userId);
        return ResponseEntity.ok(likedThreadIds);
    }

    @GetMapping("/{userId}/disliked-comments")
    public ResponseEntity<List<Long>> getDislikedCommentIds(@PathVariable Long userId) {
        List<Long> dislikedThreadIds = userService.getDislikedCommentIds(userId);
        return ResponseEntity.ok(dislikedThreadIds);
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
