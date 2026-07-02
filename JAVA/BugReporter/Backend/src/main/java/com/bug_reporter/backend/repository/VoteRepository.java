package com.bug_reporter.backend.repository;

import com.bug_reporter.backend.model.Bug;
import com.bug_reporter.backend.model.Comment;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.Vote;
import com.bug_reporter.backend.model.enums.VoteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByUserAndBug(User user, Bug bug);

    Optional<Vote> findByUserAndComment(User user, Comment comment);

    Optional<Vote> findByUserIdAndBugId(Long userId, Long bugId);

    List<Vote> findByBugId(Long bugId);

    List<Vote> findByBugIdIn(Collection<Long> bugIds);

    List<Vote> findByCommentId(Long commentId);

    long countByBugIdAndType(Long bugId, VoteType type);

    @Query("SELECT v.type, ba.id, ca.id, u.id " +
           "FROM Vote v " +
           "LEFT JOIN v.bug b LEFT JOIN b.author ba " +
           "LEFT JOIN v.comment c LEFT JOIN c.author ca " +
           "LEFT JOIN v.user u")
    List<Object[]> findVoteScoreData();
}
