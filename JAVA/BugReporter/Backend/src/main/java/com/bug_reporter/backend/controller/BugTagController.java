package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.response.TagSummary;
import com.bug_reporter.backend.service.BugTagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bugs/{bugId}/tags")
public class BugTagController {

    private final BugTagService bugTagService;

    public BugTagController(BugTagService bugTagService) {
        this.bugTagService = bugTagService;
    }

    @GetMapping
    public ResponseEntity<List<TagSummary>> getTagsByBugId(@PathVariable Long bugId) {
        List<TagSummary> tags = bugTagService.getTagSummariesByBugId(bugId);
        return ResponseEntity.ok(tags);
    }

    @PostMapping("/{tagId}")
    public ResponseEntity<?> addTagToBug(@PathVariable Long bugId,
                                         @PathVariable Long tagId,
                                         @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            bugTagService.addTagToBug(bugId, tagId, requesterId);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{tagId}")
    public ResponseEntity<?> removeTagFromBug(@PathVariable Long bugId,
                                              @PathVariable Long tagId,
                                              @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            bugTagService.removeTagFromBug(bugId, tagId, requesterId);
            return ResponseEntity.noContent().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> removeAllTagsFromBug(@PathVariable Long bugId,
                                                  @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            bugTagService.removeAllTagsFromBug(bugId, requesterId);
            return ResponseEntity.noContent().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}
