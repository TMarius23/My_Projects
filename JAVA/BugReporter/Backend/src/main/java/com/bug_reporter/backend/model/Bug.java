package com.bug_reporter.backend.model;

import com.bug_reporter.backend.model.enums.BugStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "bugs")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column(columnDefinition = "TEXT")
    private String text;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(columnDefinition = "TEXT")
    private String picture;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BugStatus status;
    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    @OneToMany(mappedBy = "bug", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;
    @OneToMany(mappedBy = "bug", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Vote> votes;
    @JsonIgnore
    @OneToMany(mappedBy = "bug", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BugTag> bugTags;


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Bug bug = (Bug) o;
        return Objects.equals(id, bug.id) && Objects.equals(title, bug.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title);
    }

    @Override
    public String toString() {
        return "Bug{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", createdAt=" + createdAt +
                ", picture='" + picture + '\'' +
                ", status=" + status +
                ", author=" + author +
                ", comments=" + comments +
                ", votes=" + votes +
                ", bugTags=" + bugTags +
                '}';
    }
}
