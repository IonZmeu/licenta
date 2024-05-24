package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.context.annotation.Lazy;

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
    private String country;
    private String latCoordinate;
    private String longCoordinate;
    private String job;
    private String salary;
    private String salaryInUSD;
    private String currency;
    private String description;
    private String contactInfo;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "time_created", updatable = false)
    private Date timeCreated;

    @JsonManagedReference(value = "job-images")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private List<ImageEntity> images = new ArrayList<>();

    @JsonManagedReference(value = "job-comments")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private List<CommentEntity> comments = new ArrayList<>();


    public JobEntity(String name) {
        this.name = name;
    }

    public JobEntity(String name, String email, String country, String latCoordinate, String longCoordinate, String job, String salary,String currency, String description, String contactInfo, List<ImageEntity> images) {
        this.name = name;
        this.email = email;
        this.country = country;
        this.latCoordinate = latCoordinate;
        this.longCoordinate = longCoordinate;
        this.job = job;
        this.salary = salary;
        this.currency = currency;
        this.description = description;
        this.contactInfo = contactInfo;
        this.images = images;
    }
}
