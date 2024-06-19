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

}
