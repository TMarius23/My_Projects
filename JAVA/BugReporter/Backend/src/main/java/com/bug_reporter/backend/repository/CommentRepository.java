package com.bug_reporter.backend.repository;

import com.bug_reporter.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBugIdOrderByCreatedAtAsc(Long bugId);

    List<Comment> findByBugIdIn(Collection<Long> bugIds);

    long countByBugId(Long bugId);
}