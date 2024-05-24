package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
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
    private Long likes;
    private Long dislikes;
    private String threadTitle;
    private String threadContent;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "time_created", updatable = false)
    private Date timeCreated;

    @JsonBackReference(value = "author-threads")
    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @JsonManagedReference(value = "thread-comments")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "thread_id", referencedColumnName = "id")
    private List<CommentEntity> comments = new ArrayList<>();


    @JsonManagedReference(value = "thread-images")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "thread_id", referencedColumnName = "id")
    private List<ImageEntity> images = new ArrayList<>();


}
