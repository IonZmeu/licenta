package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class JobEntity {
    @Id
    @SequenceGenerator(
            name = "job_sequence",
            sequenceName = "job_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "job_sequence"
    )

    private Long id;
    private String name;
    private String email;
    private String country;//
    private String latCoordinate;
    private String longCoordinate;
    private String job;//
    private double salary;
    private double salaryInUSD;//
    private String currency;
    private String description;
    private String contactInfo;


    @JsonBackReference(value = "author-jobs")
    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @CreationTimestamp
    @Column(name = "time_created", updatable = false)
    private LocalDateTime timeCreated;

    @JsonManagedReference(value = "job-images")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private List<ImageEntity> images = new ArrayList<>();

    @JsonManagedReference(value = "job-comments")
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private List<CommentEntity> comments = new ArrayList<>();

    @JsonManagedReference(value = "job-likes")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id")
    private List<LikeEntity> givenLikesAndDislikes = new ArrayList<>();

    @JsonBackReference(value = "user-jobs")
    @ManyToMany(mappedBy = "followedJobs", fetch = FetchType.LAZY)
    private List<UserEntity> usersFollowing = new ArrayList<>();

    public JobEntity(String name) {
        this.name = name;
    }

    public JobEntity(String name, String email, String country, String latCoordinate, String longCoordinate, String job, double salary, double salaryInUSD,String currency, String description, String contactInfo,List<ImageEntity> images, UserEntity author) {
        this.name = name;
        this.email = email;
        this.country = country;
        this.latCoordinate = latCoordinate;
        this.longCoordinate = longCoordinate;
        this.job = job;
        this.salary = salary;
        this.salaryInUSD = salaryInUSD;
        this.currency = currency;
        this.description = description;
        this.contactInfo = contactInfo;
        this.images = images;
        this.author = author;
    }
}
