package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.TagCreateRequest;
import com.bug_reporter.backend.dto.response.TagSummary;
import com.bug_reporter.backend.dto.response.TagUsageResponse;
import com.bug_reporter.backend.service.TagService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/tags"})
public class TagController {

    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public ResponseEntity<List<TagSummary>> getAllTags() {
        return ResponseEntity.ok(tagService.findAllTags());
        //200 OK
    }

    @GetMapping("/usage")
    public ResponseEntity<List<TagUsageResponse>> getTagUsage() {
        return ResponseEntity.ok(tagService.findTagUsage());
        //200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTagById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(tagService.findTagById(id));
            //200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> getTagByName(@RequestParam String name) {
        TagSummary tag = tagService.findTagByName(name);
        if (tag == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Tag not found with name: " + name));
            //404 Not Found
        }
        return ResponseEntity.ok(tag);
        //200 OK
    }

    @PostMapping
    public ResponseEntity<?> addTag(@Valid @RequestBody TagCreateRequest request,
                                    @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            TagSummary created = tagService.createTag(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
            //201 Created
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
            //400 Bad Request
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
            //409 Conflict
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTag(@PathVariable Long id, @Valid @RequestBody TagCreateRequest request,
                                       @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            TagSummary updated = tagService.updateTag(id, request);
            return ResponseEntity.ok(updated);
            //200 OK
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
            //400 Bad Request
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable Long id,
                                       @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        try {
            tagService.deleteTag(id);
            return ResponseEntity.noContent().build();
            //204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
            //404 Not Found
        }
    }
}
