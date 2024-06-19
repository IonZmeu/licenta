package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class UserEntity implements UserDetails {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )

    private Long id;
    private String username;
    private String email;
    private String password;
    private String role = "USER";

    public UserEntity(String username,String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @JsonManagedReference(value = "user-comments")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<CommentEntity> comments = new ArrayList<>();

    @JsonManagedReference(value = "author-threads")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private List<ThreadEntity> thread = new ArrayList<>();

    @JsonManagedReference(value = "author-jobs")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private List<JobEntity> job = new ArrayList<>();

    @JsonBackReference(value = "user-threads")
    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JoinTable(name = "followed_threads", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "thread_id"))
    private List<ThreadEntity> followedThreads;

    @JsonManagedReference(value = "user-jobs")
    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "followed_jobs",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "job_id"))
    private List<JobEntity> followedJobs = new ArrayList<>();

    @JsonManagedReference(value = "user-images")
    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<ImageEntity> images = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SkillEntity> skills;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<EducationEntity> educations;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<WorkExperienceEntity> workExperiences;

    @JsonManagedReference(value = "user-likes")
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<LikeEntity> givenLikesAndDislikes = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
