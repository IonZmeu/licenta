package com.personal.workandtravel.controller;

import com.personal.workandtravel.dto.CommentDTO;
import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.service.CommentService;
import com.personal.workandtravel.service.JobService;
import com.personal.workandtravel.service.ThreadService;
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
    private final ThreadService threadService;

    public CommentController(JobService jobService, UserService userService, CommentService commentService, ThreadService threadService) {
        this.jobService = jobService;
        this.userService = userService;
        this.commentService = commentService;
        this.threadService = threadService;
    }

    @GetMapping(value = "/{id}")
    public Optional<CommentEntity> getComment(@PathVariable("id") Long id) {
        return commentService.getComment(id);
    }

    @GetMapping(value = "/jobDTO/{id}")
    public List<CommentDTO> getJobDTOComments(@PathVariable("id") Long id) {
        return commentService.getCommentsDTOByJob(id);
    }

    @GetMapping(value = "/threadDTO/{id}")
    public List<CommentDTO> getThreadDTOComments(@PathVariable("id") Long id) {
        return commentService.getCommentsDTOByThread(id);
    }

    //@GetMapping(value = "/job/{id}")
    public List<CommentEntity> getJobComments(@PathVariable("id") Long job_id) {
        List<CommentEntity> comments = commentService.getCommentsByJob(job_id);
        return comments;
    }

    @PostMapping
    public String postComment(@RequestBody CommentDTO requestDTO) {
        CommentEntity commentEntity = new CommentEntity();
        if(requestDTO.getJobId() != null){
            JobEntity job = jobService.getJobEntity(requestDTO.getJobId());
            commentEntity.setJob(job);
        }
        if(requestDTO.getThreadId() != null){
            ThreadEntity thread = threadService.getThread(requestDTO.getThreadId());
            commentEntity.setThread(thread);
        }

        UserEntity user = userService.getUser(requestDTO.getUserId());
        Optional<CommentEntity> parent = commentService.getComment(requestDTO.getParentId());
        commentEntity.setUser(user);
        commentEntity.setCommentContent(requestDTO.getCommentContent());
        commentEntity.setUsername(requestDTO.getUsername());
        commentEntity.setDepth(requestDTO.getDepth());
        commentEntity.setChildren(null);
        commentEntity.setParent(parent.orElse(null));
        commentService.addNewComment(commentEntity);
        return "Comment created successfully!";
    }
}
