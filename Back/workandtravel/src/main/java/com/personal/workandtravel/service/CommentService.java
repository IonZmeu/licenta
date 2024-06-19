package com.personal.workandtravel.service;

import com.personal.workandtravel.dto.CommentDTO;
import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private  final CommentRepository commentRepository;
    private  final JobRepository jobRepository;
    private  final UserRepository userRepository;

    private  final LikeRepository likeRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, JobRepository jobRepository, UserRepository userRepository, LikeRepository likeRepository) {
        this.commentRepository = commentRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
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
        return commentRepository.findCommentsByJobIdAndDepthOrderByTimeCreated(jobId,0L);
    }

    public List<CommentDTO> getCommentsDTOByJob(Long id) {
        List<CommentEntity> comments = commentRepository.findCommentsByJobIdAndDepthOrderByTimeCreated(id, 0L);
        return comments.stream().map(this::mapToCommentDTO).collect(Collectors.toList());
    }

    private CommentDTO mapToCommentDTO(CommentEntity comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setJobId(comment.getJob() != null ? comment.getJob().getId() : null);
        commentDTO.setThreadId(comment.getThread() != null ? comment.getThread().getId() : null);
        commentDTO.setUserId(comment.getUser().getId());
        commentDTO.setDepth(comment.getDepth());
        commentDTO.setParentId(comment.getParent() != null ? comment.getParent().getId() : null);
        commentDTO.setLikes(likeRepository.countByCommentAndLiked(comment, true));
        commentDTO.setDislikes(likeRepository.countByCommentAndLiked(comment, false));
        commentDTO.setUsername(comment.getUsername());
        commentDTO.setCommentContent(comment.getCommentContent());
        commentDTO.setTimeCreated(comment.getTimeCreated());
        commentDTO.setChildren(comment.getChildren().stream().map(this::mapToCommentDTO).collect(Collectors.toList()));
        return commentDTO;
    }

    public List<CommentDTO> getCommentsDTOByThread(Long id) {
        List<CommentEntity> comments = commentRepository.findCommentsByThreadIdAndDepthOrderByTimeCreated(id, 0L);
        return comments.stream().map(this::mapToCommentDTO).collect(Collectors.toList());
    }
}
