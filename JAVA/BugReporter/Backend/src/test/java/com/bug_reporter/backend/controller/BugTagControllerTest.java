package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.response.TagSummary;
import com.bug_reporter.backend.dto.mapper.TagMapper;
import com.bug_reporter.backend.model.Tag;
import com.bug_reporter.backend.service.BugTagService;
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
class BugTagControllerTest {

    @Mock
    private BugTagService bugTagService;

    @InjectMocks
    private BugTagController bugTagController;

    private Tag testTag;
    private TagSummary testTagSummary;

    @BeforeEach
    void setUp() {
        testTag = new Tag();
        testTag.setId(10L);
        testTag.setName("UI");
        testTagSummary = TagMapper.toSummary(testTag);
    }

    @Test
    void getTagsByBugId() {
        when(bugTagService.getTagSummariesByBugId(1L)).thenReturn(List.of(testTagSummary));
        ResponseEntity<List<TagSummary>> result = bugTagController.getTagsByBugId(1L);
        assertEquals(200, result.getStatusCode().value());
        assertEquals(1, result.getBody().size());
    }

    @Test
    void addTagToBug() {
        doNothing().when(bugTagService).addTagToBug(1L, 10L, 1L);
        ResponseEntity<?> result = bugTagController.addTagToBug(1L, 10L, 1L);
        assertEquals(201, result.getStatusCode().value());
    }

    @Test
    void addTagToBug_notFound() {
        doThrow(new RuntimeException("Bug not found")).when(bugTagService).addTagToBug(99L, 10L, 1L);
        ResponseEntity<?> result = bugTagController.addTagToBug(99L, 10L, 1L);
        assertEquals(404, result.getStatusCode().value());
    }

    @Test
    void removeTagFromBug() {
        doNothing().when(bugTagService).removeTagFromBug(1L, 10L, 1L);
        ResponseEntity<?> result = bugTagController.removeTagFromBug(1L, 10L, 1L);
        assertEquals(204, result.getStatusCode().value());
    }

    @Test
    void removeTagFromBug_notFound() {
        doThrow(new RuntimeException("Not assigned")).when(bugTagService).removeTagFromBug(99L, 10L, 1L);
        ResponseEntity<?> result = bugTagController.removeTagFromBug(99L, 10L, 1L);
        assertEquals(404, result.getStatusCode().value());
    }

    @Test
    void removeAllTagsFromBug() {
        doNothing().when(bugTagService).removeAllTagsFromBug(1L, 1L);
        ResponseEntity<?> result = bugTagController.removeAllTagsFromBug(1L, 1L);
        assertEquals(204, result.getStatusCode().value());
    }

    @Test
    void removeAllTagsFromBug_notFound() {
        doThrow(new RuntimeException("Bug not found")).when(bugTagService).removeAllTagsFromBug(99L, 1L);
        ResponseEntity<?> result = bugTagController.removeAllTagsFromBug(99L, 1L);
        assertEquals(404, result.getStatusCode().value());
    }
}
