package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.response.TagSummary;
import com.bug_reporter.backend.dto.mapper.TagMapper;
import com.bug_reporter.backend.model.Bug;
import com.bug_reporter.backend.model.BugTag;
import com.bug_reporter.backend.model.Tag;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.repository.BugRepository;
import com.bug_reporter.backend.repository.BugTagRepository;
import com.bug_reporter.backend.repository.TagRepository;
import com.bug_reporter.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BugTagService {

    private final BugTagRepository bugTagRepository;
    private final BugRepository bugRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    public BugTagService(BugTagRepository bugTagRepository, BugRepository bugRepository, TagRepository tagRepository, UserRepository userRepository) {
        this.bugTagRepository = bugTagRepository;
        this.bugRepository = bugRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    public List<TagSummary> getTagSummariesByBugId(Long bugId) {
        return bugTagRepository.findByBugId(bugId).stream()
                .map(BugTag::getTag)
                .map(TagMapper::toSummary)
                .toList();
    }

    @Transactional
    public void addTagToBug(Long bugId, Long tagId, Long requesterId) {
        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new RuntimeException("Bug not found with id: " + bugId));
        if (!canModifyBug(bug, requesterId)) {
            throw new SecurityException("You are not allowed to update this bug tags");
        }
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + tagId));

        if (bugTagRepository.findByBugAndTag(bug, tag).isPresent()) {
            throw new RuntimeException("Tag '" + tag.getName() + "' is already assigned to this bug");
        }

        BugTag bugTag = new BugTag();
        bugTag.setBug(bug);
        bugTag.setTag(tag);
        bugTagRepository.save(bugTag);
    }

    @Transactional
    public void removeTagFromBug(Long bugId, Long tagId, Long requesterId) {
        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new RuntimeException("Bug not found with id: " + bugId));
        if (!canModifyBug(bug, requesterId)) {
            throw new SecurityException("You are not allowed to update this bug tags");
        }
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + tagId));

        BugTag bugTag = bugTagRepository.findByBugAndTag(bug, tag)
                .orElseThrow(() -> new RuntimeException("Tag '" + tag.getName() + "' is not assigned to this bug"));

        bugTagRepository.delete(bugTag);
    }

    @Transactional
    public void removeAllTagsFromBug(Long bugId, Long requesterId) {
        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new RuntimeException("Bug not found with id: " + bugId));
        if (!canModifyBug(bug, requesterId)) {
            throw new SecurityException("You are not allowed to update this bug tags");
        }
        bugTagRepository.deleteByBugId(bugId);
    }

    private boolean canModifyBug(Bug bug, Long requesterId) {
        if (requesterId == null) {
            return false;
        }
        if (bug.getAuthor() != null && requesterId.equals(bug.getAuthor().getId())) {
            return true;
        }
        return userRepository.findById(requesterId)
                .map(user -> user.getRole() == UserRole.MODERATOR)
                .orElse(false);
    }
}
