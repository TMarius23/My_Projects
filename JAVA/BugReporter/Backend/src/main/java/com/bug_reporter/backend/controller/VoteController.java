package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.VoteBugRequest;
import com.bug_reporter.backend.dto.request.VoteCommentRequest;
import com.bug_reporter.backend.dto.response.VoteResponse;
import com.bug_reporter.backend.service.VoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    private final VoteService voteService;

    @Autowired
    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @GetMapping
    public ResponseEntity<List<VoteResponse>> findAll() {
        return ResponseEntity.ok(voteService.findAllVotes());
        //200 OK
    }

    @PostMapping("/bug")
    public ResponseEntity<?> voteBug(@Valid @RequestBody VoteBugRequest request,
                                     @AuthenticationPrincipal Long userId) {
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            VoteResponse created = voteService.voteBug(request, userId);
            if (created == null) {
                return ResponseEntity.noContent().build();
                //204 No Content — vote was toggled off
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
            //201 Created
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
            //403 Forbidden
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
            //409 Conflict
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }

    @PostMapping("/comment")
    public ResponseEntity<?> voteComment(@Valid @RequestBody VoteCommentRequest request,
                                         @AuthenticationPrincipal Long userId) {
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            VoteResponse created = voteService.voteComment(request, userId);
            if (created == null) {
                return ResponseEntity.noContent().build();
                //204 No Content — vote was toggled off
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
            //201 Created
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
            //403 Forbidden
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
            //409 Conflict
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }

    @GetMapping("/bug/{bugId}/count")
    public ResponseEntity<?> getBugVoteCount(@PathVariable Long bugId) {
        try {
            return ResponseEntity.ok(voteService.getBugVoteCount(bugId));
            //200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }

    @GetMapping("/comment/{commentId}/count")
    public ResponseEntity<?> getCommentVoteCount(@PathVariable Long commentId) {
        try {
            return ResponseEntity.ok(voteService.getCommentVoteCount(commentId));
            //200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }
}