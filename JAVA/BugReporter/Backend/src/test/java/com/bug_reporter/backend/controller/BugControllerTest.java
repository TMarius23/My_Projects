package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.BugCreateRequest;
import com.bug_reporter.backend.dto.request.BugUpdateRequest;
import com.bug_reporter.backend.dto.response.BugResponse;
import com.bug_reporter.backend.dto.mapper.BugMapper;
import com.bug_reporter.backend.dto.response.PageResponse;
import com.bug_reporter.backend.model.Bug;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.enums.BugStatus;
import com.bug_reporter.backend.service.BugService;
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
class BugControllerTest {

    @Mock
    private BugService bugService;

    @InjectMocks
    private BugController bugController;

    private Bug testBug;
    private BugResponse testBugResponse;

    @BeforeEach
    void setUp() {
        User author = new User();
        author.setId(1L);
        author.setUsername("tester");

        testBug = new Bug();
        testBug.setId(100L);
        testBug.setTitle("UI Error");
        testBug.setText("Button not working");
        testBug.setStatus(BugStatus.RECEIVED);
        testBug.setAuthor(author);
        testBugResponse = BugMapper.toResponse(testBug);
    }

    @Test
    void getBugs() {
        PageResponse<BugResponse> page = new PageResponse<>(
                List.of(testBugResponse),
                1,
                1,
                10,
                0,
                true,
                true
        );

        when(bugService.getFilteredBugs("UI", 1L, null, 0, 10, 1L))
                .thenReturn(page);

        ResponseEntity<PageResponse<BugResponse>> result =
                bugController.getBugs("UI", 1L, null, 0, 10, 1L);

        assertEquals(200, result.getStatusCode().value());
        assertNotNull(result.getBody());
        assertEquals(1, result.getBody().content().size());
        assertEquals("UI Error", result.getBody().content().getFirst().title());

        verify(bugService, times(1))
                .getFilteredBugs("UI", 1L, null, 0, 10, 1L);
    }

    @Test
    void getBugById() {
        when(bugService.findById(100L, 1L)).thenReturn(testBugResponse);
        ResponseEntity<?> result = bugController.getBugById(100L, 1L);
        assertEquals(200, result.getStatusCode().value());
    }

    @Test
    void getBugById_notFound() {
        when(bugService.findById(99L, 1L)).thenThrow(new RuntimeException("Bug not found"));
        ResponseEntity<?> result = bugController.getBugById(99L, 1L);
        assertEquals(404, result.getStatusCode().value());
    }

    @Test
    void createBug() {
        BugCreateRequest request = new BugCreateRequest("UI Error", "Button not working", null, List.of(10L));

        when(bugService.create(request, 1L)).thenReturn(testBugResponse);
        ResponseEntity<?> result = bugController.createBug(request, 1L);
        assertEquals(201, result.getStatusCode().value());
    }

    @Test
    void updateBug() {
        BugUpdateRequest request = new BugUpdateRequest("UI Error", "Button not working", null, List.of(10L));

        when(bugService.updateBug(eq(100L), eq(request), eq(1L))).thenReturn(testBugResponse);
        ResponseEntity<?> result = bugController.updateBug(100L, request, 1L);
        assertEquals(200, result.getStatusCode().value());
    }

    @Test
    void updateBug_unauthorized() {
        BugUpdateRequest request = new BugUpdateRequest("UI Error", "Button not working", null, List.of(10L));

        ResponseEntity<?> result = bugController.updateBug(100L, request, null);
        assertEquals(401, result.getStatusCode().value());
    }

    @Test
    void updateBug_forbidden() {
        BugUpdateRequest request = new BugUpdateRequest("UI Error", "Button not working", null, List.of(10L));

        when(bugService.updateBug(eq(100L), eq(request), eq(99L))).thenThrow(new SecurityException("Not allowed"));
        ResponseEntity<?> result = bugController.updateBug(100L, request, 99L);
        assertEquals(403, result.getStatusCode().value());
    }

    @Test
    void deleteBug() {
        ResponseEntity<?> result = bugController.deleteBug(100L, 1L);
        assertEquals(204, result.getStatusCode().value());
    }

    @Test
    void deleteBug_unauthorized() {
        ResponseEntity<?> result = bugController.deleteBug(100L, null);
        assertEquals(401, result.getStatusCode().value());
    }
}
