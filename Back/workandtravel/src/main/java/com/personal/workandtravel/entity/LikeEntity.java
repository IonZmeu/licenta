package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class LikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference(value = "user-likes")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "thread_id")
    @JsonBackReference(value = "thread-likes")
    private ThreadEntity thread;

    @ManyToOne
    @JoinColumn(name = "job_id")
    @JsonBackReference(value = "job-likes")
    private JobEntity job;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    @JsonBackReference(value = "comment-likes")
    private CommentEntity comment;

    @CreationTimestamp
    @Column(name = "time_created", updatable = false)
    private LocalDateTime timeCreated;

    private boolean liked; // true for like, false for dislike

    // Constructor with all parameters
    public LikeEntity(UserEntity user, ThreadEntity thread, JobEntity job, CommentEntity comment, boolean liked) {
        this.user = user;
        this.thread = thread;
        this.job = job;
        this.comment = comment;
        this.liked = liked;
    }

    // Constructor without thread
    public LikeEntity(UserEntity user, JobEntity job, CommentEntity comment, boolean liked) {
        this(user, null, job, comment, liked);
    }

    // Constructor without job
    public LikeEntity(UserEntity user, ThreadEntity thread, CommentEntity comment, boolean liked) {
        this(user, thread, null, comment, liked);
    }

    // Constructor without comment
    public LikeEntity(UserEntity user, ThreadEntity thread, JobEntity job, boolean liked) {
        this(user, thread, job, null, liked);
    }

    // Constructor without thread and job
    public LikeEntity(UserEntity user, CommentEntity comment, boolean liked) {
        this(user, null, null, comment, liked);
    }

    // Constructor without thread and comment
    public LikeEntity(UserEntity user, JobEntity job, boolean liked) {
        this(user, null, job, null, liked);
    }

    // Constructor without job and comment
    public LikeEntity(UserEntity user, ThreadEntity thread, boolean liked) {
        this(user, thread, null, null, liked);
    }

    // Constructor with only user and liked
    public LikeEntity(UserEntity user, boolean liked) {
        this(user, null, null, null, liked);
    }

}
