package com.personal.workandtravel.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.personal.workandtravel.dto.CommentDTO;
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
public class CommentEntity {
    @Id
    @SequenceGenerator(
            name = "com_sequence",
            sequenceName = "com_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "com_sequence"
    )
    private Long id;
    private Long depth;
    private String username;
    private String commentContent;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "time_created", updatable = false)
    private Date timeCreated;

    @JsonBackReference(value = "children-comments")
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private CommentEntity parent;

    @JsonManagedReference(value = "children-comments")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    private List<CommentEntity> children = new ArrayList<>();

    @JsonBackReference(value = "user-comments")
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    @JsonBackReference(value = "job-comments")
    @ManyToOne
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private JobEntity job;

    @JsonBackReference(value = "thread-comments")
    @ManyToOne
    @JoinColumn(name = "thread_id", referencedColumnName = "id")
    private ThreadEntity thread;



    public CommentEntity( String commentContent, String username, Long depth, CommentEntity parent, UserEntity user, JobEntity job, ThreadEntity thread) {
        this.commentContent = commentContent;
        this.username = username;
        this.depth = depth;
        this.parent = parent;
        this.user = user;
        this.job = job;
        this.thread = thread;
    }

    public void addChild(CommentEntity child) {
        children.add(child);
        child.setParent(this);
    }

}
