package com.personal.workandtravel.entity;

import jakarta.persistence.*;
import lombok.*;

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
    private String img;
    private double lat_coordinate;
    private double long_coordinate;


    public JobEntity(String name) {
        this.name = name;
    }

    public JobEntity(String name, String email, String country,String img, double lat_coordinate, double long_coordinate) {
        this.name = name;
        this.email = email;
        this.country = country;
        this.img = img;
        this.lat_coordinate = lat_coordinate;
        this.long_coordinate = long_coordinate;
    }
}
