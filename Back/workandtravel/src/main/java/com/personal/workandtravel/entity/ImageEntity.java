package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.personal.workandtravel.dto.ImageDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class ImageEntity {
    @Id
    @SequenceGenerator(
            name = "img_sequence",
            sequenceName = "img_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "img_sequence"
    )
    private Long id;
    private String imageUrl;
    private String imageType;


    @JsonBackReference(value = "job-images")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private JobEntity job;

    @JsonBackReference(value = "thread-images")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "thread_id", referencedColumnName = "id")
    private ThreadEntity thread;

    @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private UserEntity user;

    public ImageEntity(String imageUrl, String imageType) {
        this.imageUrl = imageUrl;
        this.imageType = imageType;
    }
    public ImageEntity(String imageUrl, String imageType, JobEntity job) {
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.job = job;
    }

    public ImageEntity(String imageUrl, String imageType, ThreadEntity thread) {
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.thread = thread;
    }

    public ImageEntity(String imageUrl, String imageType, UserEntity user) {
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.user = user;
    }
}
