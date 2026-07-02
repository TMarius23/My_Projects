package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.TagCreateRequest;
import com.bug_reporter.backend.dto.response.TagSummary;
import com.bug_reporter.backend.dto.mapper.TagMapper;
import com.bug_reporter.backend.model.Tag;
import com.bug_reporter.backend.service.TagService;
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
class TagControllerTest {

    @Mock
    private TagService tagService;

    @InjectMocks
    private TagController tagController;

    private Tag tag;
    private TagSummary tagSummary;

    @BeforeEach
    void setUp() {
        tag = new Tag();
        tag.setId(1L);
        tag.setName("backend");
        tagSummary = TagMapper.toSummary(tag);
    }

    @Test
    void getAllTags() {
        when(tagService.findAllTags()).thenReturn(List.of(tagSummary));
        ResponseEntity<List<TagSummary>> result = tagController.getAllTags();
        assertEquals(200, result.getStatusCode().value());
        assertEquals(1, result.getBody().size());
    }

    @Test
    void getTagById() {
        when(tagService.findTagById(1L)).thenReturn(tagSummary);
        ResponseEntity<?> result = tagController.getTagById(1L);
        assertEquals(200, result.getStatusCode().value());
    }

    @Test
    void getTagById_notFound() {
        when(tagService.findTagById(99L)).thenThrow(new RuntimeException("Tag not found"));
        ResponseEntity<?> result = tagController.getTagById(99L);
        assertEquals(404, result.getStatusCode().value());
    }

    @Test
    void getTagByName() {
        when(tagService.findTagByName("backend")).thenReturn(tagSummary);
        ResponseEntity<?> result = tagController.getTagByName("backend");
        assertEquals(200, result.getStatusCode().value());
    }

    @Test
    void getTagByName_notFound() {
        when(tagService.findTagByName("nonexistent")).thenReturn(null);
        ResponseEntity<?> result = tagController.getTagByName("nonexistent");
        assertEquals(404, result.getStatusCode().value());
    }

    @Test
    void addTag() {
        TagCreateRequest request = new TagCreateRequest("backend");

        when(tagService.createTag(request)).thenReturn(tagSummary);
        ResponseEntity<?> result = tagController.addTag(request, 1L);
        assertEquals(201, result.getStatusCode().value());
    }

    @Test
    void addTag_conflict() {
        TagCreateRequest request = new TagCreateRequest("backend");

        when(tagService.createTag(request)).thenThrow(new IllegalStateException("Exists"));
        ResponseEntity<?> result = tagController.addTag(request, 1L);
        assertEquals(409, result.getStatusCode().value());
    }

    @Test
    void updateTag() {
        TagCreateRequest request = new TagCreateRequest("frontend");
        TagSummary updatedTag = new TagSummary(1L, "frontend");

        when(tagService.updateTag(1L, request)).thenReturn(updatedTag);
        ResponseEntity<?> result = tagController.updateTag(1L, request, 1L);
        assertEquals(200, result.getStatusCode().value());
    }

    @Test
    void updateTag_notFound() {
        TagCreateRequest request = new TagCreateRequest("backend");

        when(tagService.updateTag(99L, request)).thenThrow(new RuntimeException("Not found"));
        ResponseEntity<?> result = tagController.updateTag(99L, request, 1L);
        assertEquals(404, result.getStatusCode().value());
    }

    @Test
    void deleteTag() {
        doNothing().when(tagService).deleteTag(1L);
        ResponseEntity<?> result = tagController.deleteTag(1L, 1L);
        assertEquals(204, result.getStatusCode().value());
    }

    @Test
    void deleteTag_notFound() {
        doThrow(new RuntimeException("Not found")).when(tagService).deleteTag(99L);
        ResponseEntity<?> result = tagController.deleteTag(99L, 1L);
        assertEquals(404, result.getStatusCode().value());
    }
}
