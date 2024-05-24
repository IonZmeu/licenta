package com.personal.workandtravel.controller;

import com.personal.workandtravel.dto.CommentDTO;
import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.service.CommentService;
import com.personal.workandtravel.service.JobService;
import com.personal.workandtravel.service.UserService;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Data
@RestController
@RequestMapping("comment")
public class CommentController {
    private final JobService jobService;
    private final UserService userService;
    private final CommentService commentService;

    public CommentController(JobService jobService, UserService userService, CommentService commentService) {
        this.jobService = jobService;
        this.userService = userService;
        this.commentService = commentService;
    }

    @GetMapping(value = "/{id}")
    public Optional<CommentEntity> getComment(@PathVariable("id") Long id) {
        return commentService.getComment(id);
    }

    @GetMapping(value = "/job/{id}")
    public List<CommentEntity> getJobComments(@PathVariable("id") Long job_id) {
        List<CommentEntity> comments = commentService.getCommentsByJob(job_id);
        return comments;
    }

    @PostMapping
    public String postComment(@RequestBody CommentDTO requestDTO) {
        CommentEntity commentEntity = new CommentEntity();
        JobEntity job = jobService.getJob(requestDTO.getJobId());
        UserEntity user = userService.getUser(requestDTO.getUserId());
        Optional<CommentEntity> parent = commentService.getComment(requestDTO.getParentId());
        commentEntity.setJob(job);
        commentEntity.setUser(user);
        commentEntity.setCommentContent(requestDTO.getCommentContent());
        commentEntity.setUsername(requestDTO.getUsername());
        commentEntity.setDepth(requestDTO.getDepth());
        commentEntity.setChildren(requestDTO.getChildren());
        commentEntity.setParent(parent.orElse(null));
        commentService.addNewComment(commentEntity);
        return "Comment created successfully!";
    }
}
