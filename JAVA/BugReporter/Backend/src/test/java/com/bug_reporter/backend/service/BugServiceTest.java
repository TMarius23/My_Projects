package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.request.BugUpdateRequest;
import com.bug_reporter.backend.dto.request.BugCreateRequest;
import com.bug_reporter.backend.dto.response.BugResponse;
import com.bug_reporter.backend.dto.response.PageResponse;
import com.bug_reporter.backend.model.Bug;
import com.bug_reporter.backend.model.Tag;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.enums.BugStatus;
import com.bug_reporter.backend.model.enums.VoteType;
import com.bug_reporter.backend.repository.BugRepository;
import com.bug_reporter.backend.repository.BugTagRepository;
import com.bug_reporter.backend.repository.CommentRepository;
import com.bug_reporter.backend.repository.TagRepository;
import com.bug_reporter.backend.repository.UserRepository;
import com.bug_reporter.backend.repository.VoteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BugServiceTest {

    @Mock
    private BugRepository bugRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private VoteRepository voteRepository;

    @Mock
    private BugTagRepository bugTagRepository;

    @Mock
    private TagRepository tagRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private BugService bugService;

    private Bug testBug;
    private User testUser;
    private Tag testTag;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("Tester");

        testTag = new Tag();
        testTag.setId(10L);
        testTag.setName("UI");

        testBug = new Bug();
        testBug.setId(100L);
        testBug.setTitle("Eroare la salvare");
        testBug.setText("Aplicatia pica cand salvez.");
        testBug.setStatus(BugStatus.RECEIVED);
        testBug.setCreatedAt(LocalDateTime.now());
        testBug.setAuthor(testUser);
    }

    @Test
    void findAll() {
        when(bugRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(testBug)));

        when(voteRepository.findByBugIdIn(List.of(100L)))
                .thenReturn(List.of());

        when(commentRepository.findByBugIdIn(List.of(100L)))
                .thenReturn(List.of());

        when(bugTagRepository.findByBugIdIn(List.of(100L)))
                .thenReturn(List.of());
        when(userService.getUserScores()).thenReturn(Map.of());

        PageResponse<BugResponse> bugs = bugService.getFilteredBugs(null, null, null, 0, 10, null);

        assertNotNull(bugs);
        assertEquals(1, bugs.content().size());
        assertEquals("Tester", bugs.content().getFirst().author().username());
        assertEquals("Eroare la salvare", bugs.content().getFirst().title());

        verify(bugRepository, times(1))
                .findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void findById() {
        when(bugRepository.findById(testBug.getId())).thenReturn(Optional.of(testBug));
        when(bugTagRepository.findByBugIdIn(List.of(100L))).thenReturn(List.of());
        when(commentRepository.findByBugIdIn(List.of(100L))).thenReturn(List.of());
        when(voteRepository.countByBugIdAndType(100L, VoteType.UPVOTE)).thenReturn(0L);
        when(voteRepository.countByBugIdAndType(100L, VoteType.DOWNVOTE)).thenReturn(0L);
        when(voteRepository.findByUserIdAndBugId(1L, 100L)).thenReturn(Optional.empty());
        when(userService.getUserScores()).thenReturn(Map.of());

        BugResponse bug = bugService.findById(testBug.getId(), 1L);
        assertNotNull(bug);
        assertEquals(100L, bug.id());
        verify(bugRepository, times(1)).findById(testBug.getId());
    }

    @Test
    void findById_notFound() {
        when(bugRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> bugService.findById(99L, 1L));
    }

    @Test
    void create() {
        BugCreateRequest request = new BugCreateRequest("New Bug", "Description", null, List.of(10L));
        Bug savedBug = new Bug();
        savedBug.setId(101L);
        savedBug.setTitle("New Bug");
        savedBug.setText("Description");
        savedBug.setAuthor(testUser);
        savedBug.setStatus(BugStatus.RECEIVED);
        savedBug.setCreatedAt(LocalDateTime.now());

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(tagRepository.findAllById(any())).thenReturn(List.of(testTag));
        when(bugRepository.save(any(Bug.class))).thenReturn(savedBug);
        when(bugTagRepository.findByBugIdIn(List.of(101L))).thenReturn(List.of());
        when(commentRepository.findByBugIdIn(List.of(101L))).thenReturn(List.of());
        when(voteRepository.countByBugIdAndType(101L, VoteType.UPVOTE)).thenReturn(0L);
        when(voteRepository.countByBugIdAndType(101L, VoteType.DOWNVOTE)).thenReturn(0L);
        when(voteRepository.findByUserIdAndBugId(1L, 101L)).thenReturn(Optional.empty());
        when(userService.getUserScores()).thenReturn(Map.of(1L, 0.0));

        BugResponse result = bugService.create(request, 1L);

        assertEquals("New Bug", result.title());
        assertEquals(BugStatus.RECEIVED, result.status());
        assertEquals("Tester", result.author().username());
        verify(bugRepository, times(1)).save(any(Bug.class));
    }

    @Test
    void create_authorNotFound() {
        BugCreateRequest request = new BugCreateRequest("New Bug", "Description", null, List.of(10L));
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> bugService.create(request, 99L));
    }

    @Test
    void updateBug() {
        when(bugRepository.findById(100L)).thenReturn(Optional.of(testBug));
        when(bugRepository.save(any(Bug.class))).thenReturn(testBug);
        when(tagRepository.findAllById(any())).thenReturn(List.of(testTag));
        when(bugTagRepository.findByBugIdIn(List.of(100L))).thenReturn(List.of());
        when(commentRepository.findByBugIdIn(List.of(100L))).thenReturn(List.of());
        when(voteRepository.countByBugIdAndType(100L, VoteType.UPVOTE)).thenReturn(0L);
        when(voteRepository.countByBugIdAndType(100L, VoteType.DOWNVOTE)).thenReturn(0L);
        when(voteRepository.findByUserIdAndBugId(1L, 100L)).thenReturn(Optional.empty());
        when(userService.getUserScores()).thenReturn(Map.of(1L, 0.0));

        BugUpdateRequest updatedInfo = new BugUpdateRequest("Titlu modif", "Text modif", null, List.of(10L));

        BugResponse result = bugService.updateBug(100L, updatedInfo, 1L);
        assertNotNull(result);
        verify(bugRepository, times(1)).save(any(Bug.class));
    }

    @Test
    void updateBug_forbidden() {
        when(bugRepository.findById(100L)).thenReturn(Optional.of(testBug));

        BugUpdateRequest updatedInfo = new BugUpdateRequest("Titlu modif", "Text modif", null, List.of(10L));

        assertThrows(SecurityException.class, () -> bugService.updateBug(100L, updatedInfo, 99L));
    }

    @Test
    void deleteBug() {
        when(bugRepository.findById(100L)).thenReturn(Optional.of(testBug));
        bugService.deleteBug(100L, 1L);
        verify(bugRepository, times(1)).delete(testBug);
    }

    @Test
    void deleteBug_forbidden() {
        when(bugRepository.findById(100L)).thenReturn(Optional.of(testBug));

        assertThrows(SecurityException.class, () -> bugService.deleteBug(100L, 99L));
    }
}
