package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Lazy;

import java.util.ArrayList;
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
    private String lat_coordinate;
    private String long_coordinate;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private List<ImageEntity> images = new ArrayList<>();


    public JobEntity(String name) {
        this.name = name;
    }
    public JobEntity(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public JobEntity(String name, String email, String country, String lat_coordinate, String long_coordinate,List<ImageEntity> images) {
        this.name = name;
        this.email = email;
        this.country = country;
        this.lat_coordinate = lat_coordinate;
        this.long_coordinate = long_coordinate;
        this.images = images;
    }
}
