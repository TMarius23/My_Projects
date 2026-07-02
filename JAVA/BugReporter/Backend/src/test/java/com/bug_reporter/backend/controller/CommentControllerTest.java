package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.CommentCreateRequest;
import com.bug_reporter.backend.dto.request.CommentUpdateRequest;
import com.bug_reporter.backend.dto.response.CommentResponse;
import com.bug_reporter.backend.dto.mapper.CommentMapper;
import com.bug_reporter.backend.model.Comment;
import com.bug_reporter.backend.service.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentControllerTest {

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;

    private Comment comment;
    private CommentResponse commentResponse;

    @BeforeEach
    void setUp() {
        comment = new Comment();
        comment.setId(1L);
        comment.setComment("Initial comment");
        comment.setImageUrl("image.png");
        commentResponse = CommentMapper.toResponse(comment);
    }

    @Test
    void getAllComments() {
        when(commentService.findAllComments(1L)).thenReturn(List.of(commentResponse));
        ResponseEntity<?> result = commentController.getAllComments(1L);
        assertEquals(200, result.getStatusCode().value());
        assertEquals(1, ((List<?>) result.getBody()).size());
    }

    @Test
    void getCommentById() {
        when(commentService.findCommentById(1L, 1L)).thenReturn(commentResponse);
        ResponseEntity<?> result = commentController.getCommentById(1L, 1L);
        assertEquals(200, result.getStatusCode().value());
    }

    @Test
    void getCommentById_notFound() {
        when(commentService.findCommentById(99L, 1L)).thenThrow(new RuntimeException("Not found"));
        ResponseEntity<?> result = commentController.getCommentById(99L, 1L);
        assertEquals(404, result.getStatusCode().value());
    }

    @Test
    void getCommentsByBugId() {
        when(commentService.getCommentResponsesByBugId(2L, 1L, "HIGHEST_VOTES")).thenReturn(List.of(commentResponse));
        ResponseEntity<List<CommentResponse>> result = commentController.getCommentsByBugId(2L, "HIGHEST_VOTES", 1L);
        assertEquals(200, result.getStatusCode().value());
        assertEquals(1, result.getBody().size());
    }

    @Test
    void addComment() {
        CommentCreateRequest request = new CommentCreateRequest("Initial comment", "image.png", 2L);

        when(commentService.createComment(request, 1L)).thenReturn(commentResponse);
        ResponseEntity<?> result = commentController.addComment(request, 1L);
        assertEquals(201, result.getStatusCode().value());
    }

    @Test
    void updateComment() {
        CommentUpdateRequest request = new CommentUpdateRequest("Updated", null);
        CommentResponse updated = new CommentResponse(1L, "Updated", null, null, null, null, 0, null);

        when(commentService.updateComment(1L, request, 1L)).thenReturn(updated);
        ResponseEntity<?> result = commentController.updateComment(1L, request, 1L);
        assertEquals(200, result.getStatusCode().value());
    }

    @Test
    void deleteComment() {
        doNothing().when(commentService).deleteComment(1L, 1L);
        ResponseEntity<?> result = commentController.deleteComment(1L, 1L);
        assertEquals(204, result.getStatusCode().value());
    }

    @Test
    void deleteComment_notFound() {
        doThrow(new RuntimeException("Not found")).when(commentService).deleteComment(99L, 1L);
        ResponseEntity<?> result = commentController.deleteComment(99L, 1L);
        assertEquals(404, result.getStatusCode().value());
    }
}
