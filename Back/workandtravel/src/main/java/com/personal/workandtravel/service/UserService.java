package com.personal.workandtravel.service;

import com.personal.workandtravel.dto.JobDTO;
import com.personal.workandtravel.dto.ThreadDTO;
import com.personal.workandtravel.dto.UserDTO;
import com.personal.workandtravel.entity.CommentEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private  final UserRepository userRepository;

    private  final ThreadRepository threadRepository;

    private  final LikeRepository likeRepository;

    private final JobRepository jobRepository;

    private final CommentRepository commentRepository;
    @Autowired
    public UserService(UserRepository userRepository, ThreadRepository threadRepository, LikeRepository likeRepository, JobRepository jobRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.threadRepository = threadRepository;
        this.likeRepository = likeRepository;
        this.jobRepository = jobRepository;
        this.commentRepository = commentRepository;
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

    public UserEntity getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id " + id + " does not exist"
                ));
    }

    public List<ThreadDTO> getFollowedThreadsByUserId(Long userId) {
        List<ThreadEntity> threadsEntity = threadRepository.findAllByUserId(userId);
        return threadsEntity.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ThreadDTO convertToDTO(ThreadEntity threadEntity) {
        ThreadDTO threadDTO = new ThreadDTO();
        threadDTO.setId(threadEntity.getId());
        threadDTO.setDislikes(likeRepository.countByThreadAndLiked(threadEntity, false));
        threadDTO.setLikes(likeRepository.countByThreadAndLiked(threadEntity, true));
        threadDTO.setAuthorName(threadEntity.getAuthor().getUsername());
        threadDTO.setAuthorId(threadEntity.getAuthor().getId());
        threadDTO.setImages(threadEntity.getImages());
        threadDTO.setThreadTitle(threadEntity.getThreadTitle());
        threadDTO.setThreadContent(threadEntity.getThreadContent());
        return threadDTO;

    }


    public UserDTO getUserById(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        return userDTO;
    }

    public List<JobEntity> getFollowedJobs(Long userId) {
        return jobRepository.findFollowedJobsByUserId(userId);
    }

    public List<JobEntity> getLikedJobs(Long userId) {
        return jobRepository.findLikedJobsByUserId(userId);
    }

    public List<JobEntity> getDislikedJobs(Long userId) {
        return jobRepository.findDislikedJobsByUserId(userId);
    }

    public List<Long> getFollowedJobIds(Long userId) {
        List<JobEntity> followedJobs = getFollowedJobs(userId);
        System.out.println(followedJobs.size());
        return followedJobs.stream()
                .map(JobEntity::getId)
                .collect(Collectors.toList());
    }

    public List<Long> getLikedJobIds(Long userId) {
        List<JobEntity> likedJobs = getLikedJobs(userId);
        System.out.println(likedJobs.size());
        return likedJobs.stream()
                .map(JobEntity::getId)
                .collect(Collectors.toList());
    }

    public List<Long> getDislikedJobIds(Long userId) {
        List<JobEntity> dislikedJobs = getDislikedJobs(userId);
        System.out.println(dislikedJobs.size());
        return dislikedJobs.stream()
                .map(JobEntity::getId)
                .collect(Collectors.toList());
    }

    public List<ThreadEntity> getFollowedThreads(Long userId) {
        return threadRepository.findFollowedThreadsByUserId(userId);
    }

    public List<ThreadEntity> getLikedThreads(Long userId) {
        return threadRepository.findLikedThreadsByUserId(userId);
    }

    public List<ThreadEntity> getDislikedThreads(Long userId) {
        return threadRepository.findDislikedThreadsByUserId(userId);
    }
    public List<Long> getFollowedThreadIds(Long userId) {
        List<ThreadEntity> followedThreads = getFollowedThreads(userId);
        return followedThreads.stream()
                .map(ThreadEntity::getId)
                .collect(Collectors.toList());
    }

    public List<Long> getLikedThreadIds(Long userId) {
        List<ThreadEntity> likedThreads = getLikedThreads(userId);
        return likedThreads.stream()
                .map(ThreadEntity::getId)
                .collect(Collectors.toList());
    }

    public List<Long> getDislikedThreadIds(Long userId) {
        List<ThreadEntity> dislikedThreads = getDislikedThreads(userId);
        return dislikedThreads.stream()
                .map(ThreadEntity::getId)
                .collect(Collectors.toList());
    }

    public List<CommentEntity> getDislikedComments(Long userId) {
        return commentRepository.findDislikedCommentsByUserId(userId);
    }

    public List<CommentEntity> getLikedComments(Long userId) {
        return commentRepository.findLikedCommentsByUserId(userId);
    }
    public List<Long> getLikedCommentIds(Long userId) {
        List<CommentEntity> likedComments = getLikedComments(userId);
        for (CommentEntity comment : likedComments) {
            System.out.println(comment.getId());
        }
        return likedComments.stream()
                    .map(CommentEntity::getId)
                    .collect(Collectors.toList());
    }

    public List<Long> getDislikedCommentIds(Long userId) {
        List<CommentEntity> dislikedComments = getDislikedComments(userId);
        for (CommentEntity comment : dislikedComments) {
            System.out.println(comment.getId());
        }
        return dislikedComments.stream()
                .map(CommentEntity::getId)
                .collect(Collectors.toList());
    }

    public List<JobDTO> getFollowedJobsByUserId(Long userId) {
        List<JobEntity> jobsEntity = jobRepository.findFollowedJobsByUserId(userId);
        List<JobDTO> jobDTOS = new ArrayList<>();
        for (JobEntity job : jobsEntity) {
            JobDTO jobDTO = new JobDTO();
            jobDTO.setId(job.getId());
            jobDTO.setName(job.getName());
            jobDTO.setCountry(job.getCountry());
            jobDTO.setSalary(job.getSalary());
            jobDTO.setCurrency(job.getCurrency());
            jobDTOS.add(jobDTO);
        }
        return jobDTOS;
    }
}


