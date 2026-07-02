package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.request.BugCreateRequest;
import com.bug_reporter.backend.dto.request.BugUpdateRequest;
import com.bug_reporter.backend.dto.response.BugResponse;
import com.bug_reporter.backend.dto.mapper.BugMapper;
import com.bug_reporter.backend.dto.response.PageResponse;
import com.bug_reporter.backend.dto.response.TagSummary;
import com.bug_reporter.backend.model.Bug;
import com.bug_reporter.backend.model.BugTag;
import com.bug_reporter.backend.model.Comment;
import com.bug_reporter.backend.model.Tag;
import com.bug_reporter.backend.dto.response.CommentResponse;
import com.bug_reporter.backend.dto.mapper.CommentMapper;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.Vote;
import com.bug_reporter.backend.model.enums.BugStatus;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.model.enums.VoteType;
import com.bug_reporter.backend.repository.BugRepository;
import com.bug_reporter.backend.repository.BugTagRepository;
import com.bug_reporter.backend.repository.CommentRepository;
import com.bug_reporter.backend.repository.TagRepository;
import com.bug_reporter.backend.repository.UserRepository;
import com.bug_reporter.backend.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class BugService {

    private final BugRepository bugRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final VoteRepository voteRepository;
    private final BugTagRepository bugTagRepository;
    private final TagRepository tagRepository;
    private final UserService userService;

    @Autowired
    public BugService(BugRepository bugRepository,
                      UserRepository userRepository,
                      CommentRepository commentRepository,
                      VoteRepository voteRepository,
                      BugTagRepository bugTagRepository,
                      TagRepository tagRepository,
                      UserService userService) {
        this.bugRepository = bugRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.voteRepository = voteRepository;
        this.bugTagRepository = bugTagRepository;
        this.tagRepository = tagRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public BugResponse findById(Long id, Long requesterId) {
        Bug bug = bugRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bug not found with id: " + id));
        return toResponse(bug, requesterId);
    }

    private Specification<Bug> buildBugSpecification(String title, Long authorId, Long tagId) {
        Specification<Bug> spec = (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();

        if (title != null && !title.isBlank()) {
            spec = spec.and(titleContains(title));
        }

        if (authorId != null) {
            spec = spec.and(hasAuthor(authorId));
        }

        if (tagId != null) {
            spec = spec.and(hasTag(tagId));
        }

        return spec;
    }

    private Specification<Bug> titleContains(String title) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        "%" + title.toLowerCase() + "%"
                );
    }

    private Specification<Bug> hasAuthor(Long authorId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("author").get("id"), authorId);
    }

    private Specification<Bug> hasTag(Long tagId) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);

            return criteriaBuilder.equal(
                    root.join("bugTags").join("tag").get("id"),
                    tagId
            );
        };
    }

    @Transactional(readOnly = true)
    public PageResponse<BugResponse> getFilteredBugs(String title, Long authorId, Long tagId, int page, int size, Long requesterId) {
        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 50);

        Pageable pageable = PageRequest.of(
                safePage,
                safeSize,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        Page<Bug> bugPage = bugRepository.findAll(
                buildBugSpecification(title, authorId, tagId),
                pageable
        );

        List<Bug> bugs = bugPage.getContent();

        List<Vote> votes = getBugVotes(bugs);
        Map<Long, Integer> voteCounts = getBugVoteCounts(votes);
        Map<Long, VoteType> currentUserVotes = getCurrentUserBugVotes(votes, requesterId);
        Map<Long, Integer> commentCounts = getBugCommentCounts(bugs);
        Map<Long, List<TagSummary>> tagsByBugId = getBugTags(bugs);
        Map<Long, Double> userScores = userService.getUserScores();

        List<BugResponse> content = bugs.stream()
                .map(bug -> BugMapper.toResponse(
                        bug,
                        tagsByBugId.getOrDefault(bug.getId(), List.of()),
                        voteCounts.getOrDefault(bug.getId(), 0),
                        commentCounts.getOrDefault(bug.getId(), 0),
                        List.of(),
                        bug.getAuthor() == null ? 0.0 : userScores.getOrDefault(bug.getAuthor().getId(), 0.0),
                        currentUserVotes.get(bug.getId())
                ))
                .toList();

        return PageResponse.from(bugPage, content);
    }

    private Map<Long, List<CommentResponse>> getBugCommentsMap(List<Bug> bugs, Long requesterId, Map<Long, Double> userScores) {
        List<Long> bugIds = bugs.stream().map(Bug::getId).toList();
        Map<Long, List<CommentResponse>> commentsMap = new HashMap<>();

        if (bugIds.isEmpty()) {
            return commentsMap;
        }

        for (Comment comment : commentRepository.findByBugIdIn(bugIds)) {
            if (comment.getBug() == null) {
                continue;
            }
            double authorScore = comment.getAuthor() == null ? 0.0 : userScores.getOrDefault(comment.getAuthor().getId(), 0.0);
            commentsMap.computeIfAbsent(comment.getBug().getId(), ignored -> new ArrayList<>())
                    .add(CommentMapper.toResponse(comment, authorScore, requesterId));
        }

        return commentsMap;
    }

    @Transactional
    public BugResponse create(BugCreateRequest request, Long authorId) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + authorId));

        Bug bug = BugMapper.toEntity(request, author);
        bug.setCreatedAt(LocalDateTime.now());
        bug.setStatus(BugStatus.RECEIVED);
        Bug savedBug = bugRepository.save(bug);
        replaceBugTags(savedBug, request.tagIds());
        return toResponse(savedBug, authorId);
    }

    @Transactional
    public BugResponse updateBug(Long id, BugUpdateRequest request, Long requesterId) {
        Bug bug = bugRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bug not found with id: " + id));

        if (!canModifyBug(bug, requesterId)) {
            throw new SecurityException("You are not allowed to update this bug");
        }

        bug.setTitle(request.title());
        bug.setText(request.text());
        bug.setPicture(request.picture());
        Bug savedBug = bugRepository.save(bug);
        replaceBugTags(savedBug, request.tagIds());
        return toResponse(savedBug, requesterId);
    }

    @Transactional
    public void deleteBug(Long id, Long requesterId) {
        Bug bug = bugRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bug not found with id: " + id));
        if (!canModifyBug(bug, requesterId)) {
            throw new SecurityException("You are not allowed to delete this bug");
        }
        bugRepository.delete(bug);
    }

    @Transactional
    public BugResponse acceptComment(Long bugId, Long commentId, Long requesterId) {
        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new RuntimeException("Bug not found with id: " + bugId));

        if (requesterId == null || bug.getAuthor() == null || !bug.getAuthor().getId().equals(requesterId)) {
            throw new SecurityException("Only the bug author can accept a solution");
        }

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        if (comment.getBug() == null || !bugId.equals(comment.getBug().getId())) {
            throw new IllegalArgumentException("Comment does not belong to this bug");
        }

        bug.setStatus(BugStatus.SOLVED);
        return toResponse(bugRepository.save(bug), requesterId);
    }

    private BugResponse toResponse(Bug bug) {
        return toResponse(bug, null);
    }

    private BugResponse toResponse(Bug bug, Long requesterId) {
        Map<Long, Double> userScores = userService.getUserScores();
        List<CommentResponse> comments = getBugCommentsMap(List.of(bug), requesterId, userScores).getOrDefault(bug.getId(), List.of());

        return BugMapper.toResponse(
                bug,
                getBugTags(List.of(bug)).getOrDefault(bug.getId(), List.of()),
                getBugVoteCount(bug.getId()),
                comments.size(),
                comments,
                bug.getAuthor() == null ? 0.0 : userScores.getOrDefault(bug.getAuthor().getId(), 0.0),
                getCurrentUserBugVote(bug.getId(), requesterId)
        );
    }

    private int getBugVoteCount(Long bugId) {
        long upvotes = voteRepository.countByBugIdAndType(bugId, VoteType.UPVOTE);
        long downvotes = voteRepository.countByBugIdAndType(bugId, VoteType.DOWNVOTE);
        return Math.toIntExact(upvotes - downvotes);
    }

    private List<Vote> getBugVotes(List<Bug> bugs) {
        List<Long> bugIds = bugs.stream().map(Bug::getId).toList();

        if (bugIds.isEmpty()) {
            return List.of();
        }

        return voteRepository.findByBugIdIn(bugIds);
    }

    private Map<Long, Integer> getBugVoteCounts(List<Vote> votes) {
        Map<Long, Integer> voteCounts = new HashMap<>();

        for (Vote vote : votes) {
            if (vote.getBug() == null) {
                continue;
            }

            int delta = vote.getType() == VoteType.UPVOTE ? 1 : -1;
            voteCounts.merge(vote.getBug().getId(), delta, Integer::sum);
        }

        return voteCounts;
    }

    private Map<Long, VoteType> getCurrentUserBugVotes(List<Vote> votes, Long requesterId) {
        Map<Long, VoteType> currentUserVotes = new HashMap<>();

        if (requesterId == null) {
            return currentUserVotes;
        }

        for (Vote vote : votes) {
            if (vote.getBug() == null || vote.getUser() == null) {
                continue;
            }
            if (requesterId.equals(vote.getUser().getId())) {
                currentUserVotes.put(vote.getBug().getId(), vote.getType());
            }
        }

        return currentUserVotes;
    }

    private VoteType getCurrentUserBugVote(Long bugId, Long requesterId) {
        if (requesterId == null) {
            return null;
        }

        return voteRepository.findByUserIdAndBugId(requesterId, bugId)
                .map(Vote::getType)
                .orElse(null);
    }

    private Map<Long, Integer> getBugCommentCounts(List<Bug> bugs) {
        List<Long> bugIds = bugs.stream().map(Bug::getId).toList();
        Map<Long, Integer> commentCounts = new HashMap<>();

        if (bugIds.isEmpty()) {
            return commentCounts;
        }

        for (Comment comment : commentRepository.findByBugIdIn(bugIds)) {
            if (comment.getBug() == null) {
                continue;
            }

            commentCounts.merge(comment.getBug().getId(), 1, Integer::sum);
        }

        return commentCounts;
    }

    private Map<Long, List<TagSummary>> getBugTags(List<Bug> bugs) {
        List<Long> bugIds = bugs.stream().map(Bug::getId).toList();
        Map<Long, List<TagSummary>> tagsByBugId = new HashMap<>();

        if (bugIds.isEmpty()) {
            return tagsByBugId;
        }

        for (BugTag bugTag : bugTagRepository.findByBugIdIn(bugIds)) {
            if (bugTag.getBug() == null || bugTag.getTag() == null) {
                continue;
            }

            tagsByBugId.computeIfAbsent(bugTag.getBug().getId(), ignored -> new ArrayList<>())
                    .add(new TagSummary(bugTag.getTag().getId(), bugTag.getTag().getName()));
        }

        return tagsByBugId;
    }

    private void replaceBugTags(Bug bug, List<Long> tagIds) {
        List<Tag> tags = getRequiredTags(tagIds);
        bugTagRepository.deleteByBugId(bug.getId());

        List<BugTag> bugTags = tags.stream()
                .map(tag -> {
                    BugTag bugTag = new BugTag();
                    bugTag.setBug(bug);
                    bugTag.setTag(tag);
                    return bugTag;
                })
                .toList();

        bugTagRepository.saveAll(bugTags);
    }

    private List<Tag> getRequiredTags(List<Long> tagIds) {
        if (tagIds == null || tagIds.isEmpty()) {
            throw new IllegalArgumentException("At least one tag is required");
        }

        Set<Long> uniqueTagIds = new LinkedHashSet<>(tagIds);
        List<Tag> tags = tagRepository.findAllById(uniqueTagIds);

        if (tags.size() != uniqueTagIds.size()) {
            throw new RuntimeException("One or more tags were not found");
        }

        return tags;
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
