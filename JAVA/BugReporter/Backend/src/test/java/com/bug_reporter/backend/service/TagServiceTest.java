package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.request.TagCreateRequest;
import com.bug_reporter.backend.dto.response.TagSummary;
import com.bug_reporter.backend.model.Tag;
import com.bug_reporter.backend.repository.TagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TagServiceTest {

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private TagService tagService;

    private Tag tag;

    @BeforeEach
    void setUp() {
        tag = new Tag();
        tag.setId(1L);
        tag.setName("backend");
    }

    @Test
    void findAll() {
        when(tagRepository.findAll()).thenReturn(List.of(tag));
        List<TagSummary> result = tagService.findAllTags();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("backend", result.getFirst().name());
        verify(tagRepository, times(1)).findAll();
    }

    @Test
    void findById() {
        when(tagRepository.findById(1L)).thenReturn(Optional.of(tag));
        TagSummary result = tagService.findTagById(1L);
        assertNotNull(result);
        assertEquals(1L, result.id());
    }

    @Test
    void findById_notFound() {
        when(tagRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> tagService.findTagById(99L));
    }

    @Test
    void createTag() {
        TagCreateRequest request = new TagCreateRequest("backend");
        when(tagRepository.existsByNameIgnoreCase("backend")).thenReturn(false);
        when(tagRepository.save(any(Tag.class))).thenReturn(tag);
        TagSummary result = tagService.createTag(request);
        assertNotNull(result);
        assertEquals("backend", result.name());
        verify(tagRepository, times(1)).save(any(Tag.class));
    }

    @Test
    void createTag_duplicate() {
        TagCreateRequest request = new TagCreateRequest("backend");
        when(tagRepository.existsByNameIgnoreCase("backend")).thenReturn(true);
        assertThrows(IllegalStateException.class, () -> tagService.createTag(request));
    }

    @Test
    void updateTag() {
        TagCreateRequest request = new TagCreateRequest("frontend");
        when(tagRepository.findById(1L)).thenReturn(Optional.of(tag));
        when(tagRepository.save(any(Tag.class))).thenReturn(tag);
        TagSummary result = tagService.updateTag(1L, request);
        assertNotNull(result);
        assertEquals("frontend", result.name());
    }

    @Test
    void deleteTag() {
        when(tagRepository.findById(1L)).thenReturn(Optional.of(tag));
        tagService.deleteTag(1L);
        verify(tagRepository, times(1)).delete(tag);
    }

    @Test
    void findByName() {
        when(tagRepository.findByNameIgnoreCase("backend")).thenReturn(Optional.of(tag));
        TagSummary result = tagService.findTagByName("backend");
        assertNotNull(result);
        assertEquals("backend", result.name());
    }
}
