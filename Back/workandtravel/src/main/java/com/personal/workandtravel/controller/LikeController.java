package com.personal.workandtravel.controller;

import com.personal.workandtravel.service.LikeService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Data
@RestController
@RequestMapping("like")
public class LikeController {

    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {this.likeService = likeService;}

    @PostMapping("/like")
    public void like(
            @RequestParam("userId") Long userId,
            @RequestParam(value = "threadId", required = false) Long threadId,
            @RequestParam(value = "jobId", required = false) Long jobId,
            @RequestParam(value = "commentId", required = false) Long commentId) {
        likeService.like(userId, threadId, jobId, commentId, true);
    }

    @PostMapping("/dislike")
    public void dislike(
            @RequestParam("userId") Long userId,
            @RequestParam(value = "threadId", required = false) Long threadId,
            @RequestParam(value = "jobId", required = false) Long jobId,
            @RequestParam(value = "commentId", required = false) Long commentId) {
        likeService.like(userId, threadId, jobId, commentId, false);
    }
}
