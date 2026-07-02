package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.UserUpdateRequest;
import com.bug_reporter.backend.dto.response.PageResponse;
import com.bug_reporter.backend.dto.response.TopHunterResponse;
import com.bug_reporter.backend.dto.response.UserResponse;
import com.bug_reporter.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null || size != null) {
            PageResponse<UserResponse> response = userService.getUserPage(
                    search,
                    page == null ? 0 : page,
                    size == null ? 10 : size
            );
            return ResponseEntity.ok(response);
        }

        if (search != null || limit != null) {
            return ResponseEntity.ok(userService.getUserResponses(search, limit));
        }
        return ResponseEntity.ok(userService.getAllUserResponses());
    }

    @GetMapping("/top-hunters")
    public ResponseEntity<List<TopHunterResponse>> getTopHunters(
            @RequestParam(defaultValue = "3") int limit) {
        return ResponseEntity.ok(userService.getTopHunters(limit));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return userService.getUserResponseById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id,
                                        @Valid @RequestBody UserUpdateRequest user,
                                        @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }

        try{
            UserResponse updatedUser = userService.updateUser(id, user, requesterId);
            return ResponseEntity.ok(updatedUser);
        }
        catch (SecurityException e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        }
        catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }

        try{
            userService.deleteUser(id, requesterId);
            return ResponseEntity.noContent().build();
        }
        catch (SecurityException e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        }
        catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/ban")
    public ResponseEntity<?> banUser(@PathVariable Long id, @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }

        try {
            return ResponseEntity.ok(userService.banUser(id, requesterId));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/unban")
    public ResponseEntity<?> unbanUser(@PathVariable Long id, @AuthenticationPrincipal Long requesterId) {
        if (requesterId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }

        try {
            return ResponseEntity.ok(userService.unbanUser(id, requesterId));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

}
