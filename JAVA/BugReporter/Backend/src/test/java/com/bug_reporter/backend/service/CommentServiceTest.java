package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.request.CommentCreateRequest;
import com.bug_reporter.backend.dto.request.CommentUpdateRequest;
import com.bug_reporter.backend.dto.response.CommentResponse;
import com.bug_reporter.backend.model.Bug;
import com.bug_reporter.backend.model.Comment;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.enums.BugStatus;
import com.bug_reporter.backend.repository.BugRepository;
import com.bug_reporter.backend.repository.CommentRepository;
import com.bug_reporter.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;
    @Mock
    private BugRepository bugRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;

    @InjectMocks
    private CommentService commentService;

    private Comment comment;
    private Bug bug;
    private User author;

    @BeforeEach
    void setUp() {
        comment = new Comment();
        comment.setId(1L);
        comment.setComment("First comment");

        bug = new Bug();
        bug.setId(2L);
        bug.setStatus(BugStatus.RECEIVED);
        comment.setBug(bug);

        author = new User();
        author.setId(3L);
        author.setUsername("author");
        comment.setAuthor(author);
    }

    @Test
    void findAll() {
        when(commentRepository.findAll()).thenReturn(List.of(comment));
        when(userService.getUserScores()).thenReturn(Map.of(3L, 0.0));
        List<CommentResponse> result = commentService.findAllComments(null);
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("First comment", result.getFirst().comment());
    }

    @Test
    void findById() {
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        when(userService.getUserScores()).thenReturn(Map.of(3L, 0.0));
        CommentResponse result = commentService.findCommentById(1L, null);
        assertNotNull(result);
        assertEquals(1L, result.id());
    }

    @Test
    void findById_notFound() {
        when(commentRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> commentService.findCommentById(99L, null));
    }

    @Test
    void createComment() {
        CommentCreateRequest request = new CommentCreateRequest("First comment", null, 2L);

        when(bugRepository.findById(2L)).thenReturn(Optional.of(bug));
        when(userRepository.findById(3L)).thenReturn(Optional.of(author));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(userService.getUserScores()).thenReturn(Map.of(3L, 0.0));

        CommentResponse result = commentService.createComment(request, 3L);
        assertNotNull(result);
        assertEquals("First comment", result.comment());
    }

    @Test
    void updateComment() {
        CommentUpdateRequest request = new CommentUpdateRequest("Updated", "new.png");

        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(userService.getUserScores()).thenReturn(Map.of(3L, 0.0));

        CommentResponse result = commentService.updateComment(1L, request, 3L);
        assertNotNull(result);
        verify(commentRepository, times(1)).save(comment);
    }

    @Test
    void deleteComment() {
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        commentService.deleteComment(1L, 3L);
        verify(commentRepository, times(1)).delete(comment);
    }

    @Test
    void deleteComment_notFound() {
        when(commentRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> commentService.deleteComment(99L, 3L));
    }

    @Test
    void getCommentsByBugId() {
        when(commentRepository.findByBugIdOrderByCreatedAtAsc(2L)).thenReturn(List.of(comment));
        when(userService.getUserScores()).thenReturn(Map.of(3L, 0.0));
        List<CommentResponse> result = commentService.getCommentResponsesByBugId(2L, null, "HIGHEST_VOTES");
        assertNotNull(result);
        assertEquals(1, result.size());
    }
}
