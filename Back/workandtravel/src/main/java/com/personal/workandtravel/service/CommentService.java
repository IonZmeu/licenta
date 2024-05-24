package com.personal.workandtravel.service;

import com.personal.workandtravel.dto.CommentDTO;
import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.repository.CommentRepository;
import com.personal.workandtravel.repository.ImageRepository;
import com.personal.workandtravel.repository.JobRepository;
import com.personal.workandtravel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private  final CommentRepository commentRepository;
    private  final JobRepository jobRepository;
    private  final UserRepository userRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public Optional<CommentEntity> getComment(Long id) {
        return commentRepository.findCommentById(id);
    }

    public void createComment(String jobId, String userId, String commentContent, String username, String depth, List<CommentEntity> children) {
        CommentEntity comment = new CommentEntity();
        JobEntity job = jobRepository.findJobById(Long.parseLong(jobId)).get();
        UserEntity user = userRepository.findUserById(Long.parseLong(userId)).get();
        comment.setUser(user);
        comment.setJob(job);
        comment.setCommentContent(commentContent);
        comment.setUsername(username);
        comment.setDepth(Long.parseLong(depth));
        comment.setChildren(children);

        commentRepository.save(comment);
    }

    public void addNewComment(CommentEntity comment) {
        commentRepository.save(comment);
    }

    public List<CommentEntity> getCommentsByJob(Long jobId) {
        return commentRepository.findCommentsByJobIdAndDepth(jobId,0L);
    }
}
