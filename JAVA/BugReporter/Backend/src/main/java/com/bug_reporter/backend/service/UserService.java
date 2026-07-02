package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.request.UserUpdateRequest;
import com.bug_reporter.backend.dto.response.PageResponse;
import com.bug_reporter.backend.dto.response.TopHunterResponse;
import com.bug_reporter.backend.dto.response.UserResponse;
import com.bug_reporter.backend.dto.mapper.UserMapper;
import com.bug_reporter.backend.repository.BugRepository;
import com.bug_reporter.backend.repository.UserRepository;
import com.bug_reporter.backend.repository.VoteRepository;
import com.bug_reporter.backend.model.enums.BugStatus;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.model.enums.VoteType;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bug_reporter.backend.model.User;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final VoteRepository voteRepository;
    private final BugRepository bugRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailClient emailClient;
    private final SmsClient smsClient;

    @Autowired
    public UserService(UserRepository userRepository, VoteRepository voteRepository, BugRepository bugRepository, PasswordEncoder passwordEncoder, EmailClient emailClient, SmsClient smsClient) {
        this.userRepository = userRepository;
        this.voteRepository = voteRepository;
        this.bugRepository = bugRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailClient = emailClient;
        this.smsClient = smsClient;
    }

    private void notifyUserBanned(User user) {
        emailClient.send(
            user.getEmail(),
            "BugReporter: Your account has been suspended",
            "Hello " + user.getUsername() + ",\n\n" +
            "Your BugReporter account has been suspended by a moderator " +
            "due to a violation of community guidelines.\n\n" +
            "If you believe this is a mistake, please contact support.\n\n" +
            "The BugReporter Team"
        );
        smsClient.send(
            user.getPhoneNumber(),
            "BugReporter: Your account has been suspended by a moderator. Contact support if you believe this is a mistake."
        );
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getAllUserResponses() {
        return userRepository.findAll().stream()
                .map(UserMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getUserResponses(String search, Integer limit) {
        int safeLimit = limit == null ? 25 : Math.max(1, Math.min(limit, 100));
        Page<User> users;
        if (search == null || search.isBlank()) {
            users = userRepository.findAllByOrderByUsernameAsc(PageRequest.of(0, safeLimit));
        } else {
            users = userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrderByUsernameAsc(
                    search,
                    search,
                    PageRequest.of(0, safeLimit)
                );
        }
        return users.getContent().stream()
                .map(UserMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PageResponse<UserResponse> getUserPage(String search, int page, int size) {
        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 50);
        Pageable pageable = PageRequest.of(safePage, safeSize);

        Page<User> users;
        if (search == null || search.isBlank()) {
            users = userRepository.findAllByOrderByUsernameAsc(pageable);
        } else {
            users = userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrderByUsernameAsc(
                    search,
                    search,
                    pageable
            );
        }

        List<UserResponse> content = users.getContent().stream()
                .map(UserMapper::toResponse)
                .toList();

        return PageResponse.from(users, content);
    }

    public Optional<UserResponse> getUserResponseById(Long id) {
        return userRepository.findById(id).map(UserMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUserWithScore(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        double score = calculateUserScores().getOrDefault(userId, 0.0);
        return UserMapper.toResponse(user, score);
    }

    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request, Long requesterId) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        User requester = getUser(requesterId);
        boolean moderator = requester.getRole() == UserRole.MODERATOR;

        if (!moderator && !requester.getId().equals(existingUser.getId())) {
            throw new SecurityException("You are not allowed to update this user");
        }

        if (!moderator && request.role() != existingUser.getRole()) {
            throw new SecurityException("Only moderators can change user roles");
        }

        existingUser.setUsername(request.username());
        existingUser.setEmail(request.email());
        existingUser.setRole(request.role());
        if (request.password() != null && !request.password().trim().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(request.password()));
        }
        return UserMapper.toResponse(userRepository.save(existingUser));
    }

    @Transactional
    public void deleteUser(Long id, Long requesterId) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        User requester = getUser(requesterId);

        if (requester.getRole() != UserRole.MODERATOR && !requester.getId().equals(existingUser.getId())) {
            throw new SecurityException("You are not allowed to delete this user");
        }
        userRepository.delete(existingUser);
    }

    @Transactional
    public UserResponse banUser(Long id, Long requesterId) {
        User requester = getModerator(requesterId);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (requester.getId().equals(user.getId())) {
            throw new IllegalArgumentException("Moderators cannot ban themselves");
        }

        user.setBanned(true);
        User saved = userRepository.save(user);
        notifyUserBanned(saved);
        return UserMapper.toResponse(saved);
    }

    @Transactional
    public UserResponse unbanUser(Long id, Long requesterId) {
        getModerator(requesterId);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setBanned(false);
        return UserMapper.toResponse(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public Map<Long, Double> getUserScores() {
        return calculateUserScores();
    }

    public List<TopHunterResponse> getTopHunters(int limit) {
        int safeLimit = Math.min(Math.max(limit, 1), 20);
        Map<Long, Double> scores = calculateUserScores();
        Map<Long, Integer> solvedCounts = getSolvedBugCountsByAuthor();

        return userRepository.findAll().stream()
                .map(user -> new TopHunterResponse(
                        user.getId(),
                        user.getUsername(),
                        scores.getOrDefault(user.getId(), 0.0),
                        solvedCounts.getOrDefault(user.getId(), 0)
                ))
                .sorted(Comparator.comparingDouble(TopHunterResponse::score).reversed()
                        .thenComparing(Comparator.comparingInt(TopHunterResponse::solved).reversed()))
                .limit(safeLimit)
                .toList();
    }

    private Map<Long, Integer> getSolvedBugCountsByAuthor() {
        Map<Long, Integer> counts = new HashMap<>();
        for (Object[] row : bugRepository.countBugsByAuthorAndStatus(BugStatus.SOLVED)) {
            counts.put((Long) row[0], ((Long) row[1]).intValue());
        }
        return counts;
    }

    private Map<Long, Double> calculateUserScores() {
        Map<Long, Double> scores = new HashMap<>();

        for (Object[] row : voteRepository.findVoteScoreData()) {
            VoteType type = (VoteType) row[0];
            Long bugAuthorId = (Long) row[1];
            Long commentAuthorId = (Long) row[2];
            Long userId = (Long) row[3];
            boolean upvote = type == VoteType.UPVOTE;

            if (bugAuthorId != null) {
                scores.merge(bugAuthorId, upvote ? 2.5 : -1.5, Double::sum);
            }

            if (commentAuthorId != null) {
                scores.merge(commentAuthorId, upvote ? 5.0 : -2.5, Double::sum);
                if (!upvote && userId != null && !userId.equals(commentAuthorId)) {
                    scores.merge(userId, -1.5, Double::sum);
                }
            }
        }

        return scores;
    }

    private User getModerator(Long requesterId) {
        User requester = getUser(requesterId);
        if (requester.getRole() != UserRole.MODERATOR) {
            throw new SecurityException("Only moderators can perform this action");
        }
        return requester;
    }

    private User getUser(Long userId) {
        if (userId == null) {
            throw new SecurityException("Not authenticated");
        }
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }
}
