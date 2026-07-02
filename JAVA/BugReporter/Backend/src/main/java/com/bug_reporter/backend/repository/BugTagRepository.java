package com.bug_reporter.backend.repository;

import com.bug_reporter.backend.model.Bug;
import com.bug_reporter.backend.model.BugTag;
import com.bug_reporter.backend.model.Tag;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Collection;

@Repository
public interface BugTagRepository extends JpaRepository<BugTag, Long> {

    List<BugTag> findByBugId(Long bugId);

    List<BugTag> findByBugIdIn(Collection<Long> bugIds);

    Optional<BugTag> findByBugAndTag(Bug bug, Tag tag);

    @Modifying
    @Transactional
    void deleteByBugId(Long bugId);
}
