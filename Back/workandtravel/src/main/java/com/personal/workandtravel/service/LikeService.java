package com.personal.workandtravel.service;

import com.personal.workandtravel.entity.*;
import com.personal.workandtravel.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final ThreadRepository threadRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository, ThreadRepository threadRepository, UserRepository userRepository, JobRepository jobRepository, CommentRepository commentRepository) {
        this.likeRepository = likeRepository;
        this.threadRepository = threadRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.commentRepository = commentRepository;
    }

    @Transactional
    public void likeThread(ThreadEntity thread, UserEntity user, boolean liked) {
        Optional<LikeEntity> existingLike = likeRepository.findByThreadAndUser(thread, user);

        if(liked){
            if (existingLike.isPresent()) {
                LikeEntity like = existingLike.get();
                if (!like.isLiked()) {
                    like.setLiked(true);
                    likeRepository.save(like);
                } else{
                    likeRepository.delete(like);
                }
            } else {
                LikeEntity like = new LikeEntity();
                like.setUser(user);
                like.setThread(thread);
                like.setLiked(true);
                likeRepository.save(like);
                thread.getGivenLikesAndDislikes().add(like);
            }
        } else {
            if (existingLike.isPresent()) {
                LikeEntity like = existingLike.get();
                if (like.isLiked()) {
                    like.setLiked(false);
                    likeRepository.save(like);
                } else{
                    likeRepository.delete(like);
                }
            } else {
                LikeEntity like = new LikeEntity();
                like.setUser(user);
                like.setThread(thread);
                like.setLiked(false);
                likeRepository.save(like);
                thread.getGivenLikesAndDislikes().add(like);
            }
        }
    }

    @Transactional
    public void likeJob(JobEntity job, UserEntity user, boolean liked) {
        Optional<LikeEntity> existingLike = likeRepository.findByJobAndUser(job, user);

        if (liked) {
            if (existingLike.isPresent()) {
                LikeEntity like = existingLike.get();
                if (!like.isLiked()) {
                    like.setLiked(true);
                    likeRepository.save(like);
                } else {
                    likeRepository.delete(like);
                }
            } else {
                LikeEntity like = new LikeEntity();
                like.setUser(user);
                like.setJob(job);
                like.setLiked(true);
                likeRepository.save(like);
                job.getGivenLikesAndDislikes().add(like);
            }
        } else {
            if (existingLike.isPresent()) {
                LikeEntity like = existingLike.get();
                if (like.isLiked()) {
                    like.setLiked(false);
                    likeRepository.save(like);
                } else {
                    likeRepository.delete(like);
                }
            } else {
                LikeEntity like = new LikeEntity();
                like.setUser(user);
                like.setJob(job);
                like.setLiked(false);
                likeRepository.save(like);
                job.getGivenLikesAndDislikes().add(like);
            }
        }
    }

    @Transactional
    public void likeComment(CommentEntity comment, UserEntity user, boolean liked) {
        Optional<LikeEntity> existingLike = likeRepository.findByCommentAndUser(comment, user);

        if (liked) {
            if (existingLike.isPresent()) {
                LikeEntity like = existingLike.get();
                if (!like.isLiked()) {
                    like.setLiked(true);
                    likeRepository.save(like);
                } else {
                    likeRepository.delete(like);
                }
            } else {
                LikeEntity like = new LikeEntity();
                like.setUser(user);
                like.setComment(comment);
                like.setLiked(true);
                likeRepository.save(like);
                comment.getGivenLikesAndDislikes().add(like);
            }
        } else {
            if (existingLike.isPresent()) {
                LikeEntity like = existingLike.get();
                if (like.isLiked()) {
                    like.setLiked(false);
                    likeRepository.save(like);
                } else {
                    likeRepository.delete(like);
                }
            } else {
                LikeEntity like = new LikeEntity();
                like.setUser(user);
                like.setComment(comment);
                like.setLiked(false);
                likeRepository.save(like);
                comment.getGivenLikesAndDislikes().add(like);
            }
        }
    }



    public void like(Long userId, Long threadId, Long jobId, Long commentId, boolean liked) {
        if(threadId != null){
            ThreadEntity thread = threadRepository.findById(threadId).orElseThrow(() -> new RuntimeException("Thread not found"));
            UserEntity user = userRepository.findUserById(userId).orElseThrow(() -> new RuntimeException("User not found"));

            likeThread(thread, user, liked);
        }

        if(jobId != null){
            JobEntity job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
            UserEntity user = userRepository.findUserById(userId).orElseThrow(() -> new RuntimeException("User not found"));

            likeJob(job, user, liked);
        }

        if(commentId != null){
            CommentEntity comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
            UserEntity user = userRepository.findUserById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            likeComment(comment, user, liked);
        }
    }
}


