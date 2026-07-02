package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.CommentCreateRequest;
import com.bug_reporter.backend.dto.request.CommentUpdateRequest;
import com.bug_reporter.backend.dto.response.CommentResponse;
import com.bug_reporter.backend.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/comments"})
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<?> getAllComments(@AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        return ResponseEntity.ok(commentService.findAllComments(requesterId));
        //200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentById(@PathVariable Long id,
                                            @AuthenticationPrincipal Long requesterId) {
        try {
            return ResponseEntity.ok(commentService.findCommentById(id, requesterId));
            //200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }

    @GetMapping("/bug/{bugId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByBugId(
            @PathVariable Long bugId,
            @RequestParam(defaultValue = "HIGHEST_VOTES") String sortBy,
            @AuthenticationPrincipal Long requesterId) {
        return ResponseEntity.ok(commentService.getCommentResponsesByBugId(bugId, requesterId, sortBy));
        //200 OK
    }

    @PostMapping
    public ResponseEntity<?> addComment(@Valid @RequestBody CommentCreateRequest request,
                                        @AuthenticationPrincipal Long authorId) {
        if (authorId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            CommentResponse created = commentService.createComment(request, authorId);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
            //201 Created
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
            //400 Bad Request
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable Long id,
                                           @Valid @RequestBody CommentUpdateRequest request,
                                           @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            return ResponseEntity.ok(commentService.updateComment(id, request, requesterId));
            //200 OK
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
            //403 Forbidden
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id,
                                           @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            commentService.deleteComment(id, requesterId);
            return ResponseEntity.noContent().build();
            //204 No Content
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
            //403 Forbidden
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }
}
