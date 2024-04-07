package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private String imageType;
    private String imageUrl;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private JobEntity job;

    public ImageEntity(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ImageEntity(String imageUrl, String imageType) {
        this.imageUrl = imageUrl;
        this.imageType = imageType;
    }
}
