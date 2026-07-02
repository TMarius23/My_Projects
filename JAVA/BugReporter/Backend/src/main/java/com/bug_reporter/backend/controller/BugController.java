package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.BugCreateRequest;
import com.bug_reporter.backend.dto.request.BugUpdateRequest;
import com.bug_reporter.backend.dto.response.BugResponse;
import com.bug_reporter.backend.dto.response.PageResponse;
import com.bug_reporter.backend.service.BugService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bugs")
public class BugController {

    private final BugService bugService;

    @Autowired
    public BugController(BugService bugService) {
        this.bugService = bugService;
    }

    @GetMapping
    public ResponseEntity<PageResponse<BugResponse>> getBugs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Long authorId,
            @RequestParam(required = false) Long tagId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal Long requesterId) {

        return ResponseEntity.ok(bugService.getFilteredBugs(title, authorId, tagId, page, size, requesterId));
        //200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBugById(@PathVariable Long id,
                                        @AuthenticationPrincipal Long requesterId) {
        try {
            return ResponseEntity.ok(bugService.findById(id, requesterId));
            //200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }

    @PostMapping
    public ResponseEntity<?> createBug(@Valid @RequestBody BugCreateRequest request,
                                       @AuthenticationPrincipal Long authorId) {
        if (authorId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
            //401 Unauthorized
        }

        try {
            BugResponse created = bugService.create(request, authorId);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
            //201 Created
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
            //400 Bad Request
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBug(@PathVariable Long id,
                                       @Valid @RequestBody BugUpdateRequest request,
                                       @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
            //401 Unauthorized
        }

        try {
            BugResponse updated = bugService.updateBug(id, request, requesterId);
            return ResponseEntity.ok(updated);
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
    public ResponseEntity<?> deleteBug(@PathVariable Long id,
                                       @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
            //401 Unauthorized
        }

        try {
            bugService.deleteBug(id, requesterId);
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

    @PostMapping("/{bugId}/comments/{commentId}/accept")
    public ResponseEntity<?> acceptComment(@PathVariable Long bugId,
                                           @PathVariable Long commentId,
                                           @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }

        try {
            return ResponseEntity.ok(bugService.acceptComment(bugId, commentId, requesterId));
            //200 OK
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
            //403 Forbidden
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
            //400 Bad Request
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }
}
