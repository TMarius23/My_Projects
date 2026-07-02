package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.request.CommentCreateRequest;
import com.bug_reporter.backend.dto.request.CommentUpdateRequest;
import com.bug_reporter.backend.dto.response.CommentResponse;
import com.bug_reporter.backend.dto.mapper.CommentMapper;
import com.bug_reporter.backend.model.Bug;
import com.bug_reporter.backend.model.Comment;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.enums.BugStatus;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.model.enums.VoteType;
import com.bug_reporter.backend.repository.BugRepository;
import com.bug_reporter.backend.repository.CommentRepository;
import com.bug_reporter.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final BugRepository bugRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public CommentService(CommentRepository commentRepository, BugRepository bugRepository, UserRepository userRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.bugRepository = bugRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> findAllComments(Long requesterId) {
        var userScores = userService.getUserScores();
        return ((List<Comment>) commentRepository.findAll()).stream()
                .map(comment -> CommentMapper.toResponse(
                        comment,
                        comment.getAuthor() == null ? 0.0 : userScores.getOrDefault(comment.getAuthor().getId(), 0.0),
                        requesterId
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public CommentResponse findCommentById(Long id, Long requesterId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));
        double authorScore = comment.getAuthor() == null ? 0.0
                : userService.getUserScores().getOrDefault(comment.getAuthor().getId(), 0.0);
        return CommentMapper.toResponse(comment, authorScore, requesterId);
    }

    @Transactional
    public CommentResponse createComment(CommentCreateRequest request, Long authorId) {
        Comment comment = new Comment();
        comment.setComment(request.comment());
        comment.setImageUrl(request.imageUrl());

        Bug bug = bugRepository.findById(request.bugId())
                .orElseThrow(() -> new RuntimeException("Bug not found with id: " + request.bugId()));
        if (bug.getStatus() == BugStatus.SOLVED) {
            throw new IllegalStateException("No more comments can be added to a solved bug");
        }
        if (bug.getStatus() == BugStatus.RECEIVED && commentRepository.countByBugId(bug.getId()) == 0) {
            bug.setStatus(BugStatus.IN_PROGRESS);
            bugRepository.save(bug);
        }
        comment.setBug(bug);

        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + authorId));
        comment.setAuthor(author);

        Comment savedComment = commentRepository.save(comment);
        double authorScore = userService.getUserScores().getOrDefault(author.getId(), 0.0);
        return CommentMapper.toResponse(savedComment, authorScore);
    }

    @Transactional
    public CommentResponse updateComment(Long id, CommentUpdateRequest request, Long requesterId) {
        Comment existingComment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));

        if (!canModifyComment(existingComment, requesterId)) {
            throw new SecurityException("You are not allowed to update this comment");
        }

        existingComment.setComment(request.comment());
        if (request.imageUrl() != null) {
            existingComment.setImageUrl(request.imageUrl());
        }
        Comment savedComment = commentRepository.save(existingComment);
        double authorScore = savedComment.getAuthor() == null ? 0.0
                : userService.getUserScores().getOrDefault(savedComment.getAuthor().getId(), 0.0);
        return CommentMapper.toResponse(savedComment, authorScore, requesterId);
    }

    @Transactional
    public void deleteComment(Long id, Long requesterId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));

        if (!canModifyComment(comment, requesterId)) {
            throw new SecurityException("You are not allowed to delete this comment");
        }
        commentRepository.delete(comment);
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> getCommentResponsesByBugId(Long bugId, Long requesterId, String sortBy) {
        var userScores = userService.getUserScores();

        Comparator<Comment> comparator = switch (sortBy == null ? "HIGHEST_VOTES" : sortBy) {
            case "LOWEST_VOTES" -> Comparator.comparingInt(this::calculateVoteCount);
            case "NEWEST" -> Comparator.comparing(Comment::getCreatedAt).reversed();
            case "OLDEST" -> Comparator.comparing(Comment::getCreatedAt);
            default -> Comparator.comparingInt(this::calculateVoteCount).reversed()
                    .thenComparing(Comment::getCreatedAt);
        };

        return commentRepository.findByBugIdOrderByCreatedAtAsc(bugId)
                .stream()
                .sorted(comparator)
                .map(comment -> CommentMapper.toResponse(
                        comment,
                        comment.getAuthor() == null ? 0.0 : userScores.getOrDefault(comment.getAuthor().getId(), 0.0),
                        requesterId
                ))
                .toList();
    }

    private int calculateVoteCount(Comment comment) {
        if (comment.getVotes() == null) {
            return 0;
        }
        return comment.getVotes()
                .stream()
                .mapToInt(vote -> vote.getType() == VoteType.UPVOTE ? 1 : -1)
                .sum();
    }

    private boolean canModifyComment(Comment comment, Long requesterId) {
        if (requesterId == null) {
            return false;
        }
        if (comment.getAuthor() != null && requesterId.equals(comment.getAuthor().getId())) {
            return true;
        }
        return userRepository.findById(requesterId)
                .map(user -> user.getRole() == UserRole.MODERATOR)
                .orElse(false);
    }
}
