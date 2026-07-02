package com.bug_reporter.backend.model;

import com.bug_reporter.backend.model.enums.VoteType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Entity
@Table(name = "votes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "vote_type", nullable = false)
    private VoteType type;

    @ManyToOne
    @JoinColumn(name = "bug_id")
    private Bug bug;


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Vote vote = (Vote) o;
        return Objects.equals(id, vote.id) && Objects.equals(user, vote.user) && Objects.equals(bug, vote.bug);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, bug);
    }

    @Override
    public String toString() {
        return "Vote{" +
                "id=" + id +
                ", comment=" + comment +
                ", user=" + user +
                ", type=" + type +
                ", bug=" + bug +
                '}';
    }
}