package com.personal.workandtravel.entity;

import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
@Indexed
public class ThreadEntity {
    @Id
    @SequenceGenerator(
            name = "thread_sequence",
            sequenceName = "thread_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "thread_sequence"
    )

    private Long id;
    @FullTextField
    private String threadTitle;
    @FullTextField
    private String threadContent;

    @CreationTimestamp
    @Column(name = "time_created", updatable = false)
    private LocalDateTime timeCreated;

    @JsonBackReference(value = "author-threads")
    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @JsonBackReference(value = "user-threads")
    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JoinTable(name = "followed_threads", joinColumns = @JoinColumn(name = "thread_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<UserEntity> user;


    @JsonManagedReference(value = "thread-comments")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "thread_id", referencedColumnName = "id")
    private List<CommentEntity> comments = new ArrayList<>();

    @JsonManagedReference(value = "thread-images")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "thread_id", referencedColumnName = "id")
    private List<ImageEntity> images = new ArrayList<>();

    @JsonManagedReference(value = "thread-likes")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "thread_id")
    private List<LikeEntity> givenLikesAndDislikes = new ArrayList<>();

}
