package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.request.TagCreateRequest;
import com.bug_reporter.backend.dto.response.TagUsageResponse;
import com.bug_reporter.backend.dto.response.TagSummary;
import com.bug_reporter.backend.dto.mapper.TagMapper;
import com.bug_reporter.backend.model.BugTag;
import com.bug_reporter.backend.model.Tag;
import com.bug_reporter.backend.repository.BugTagRepository;
import com.bug_reporter.backend.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TagService {

    private final TagRepository tagRepository;
    private final BugTagRepository bugTagRepository;

    @Autowired
    public TagService(TagRepository tagRepository, BugTagRepository bugTagRepository) {
        this.tagRepository = tagRepository;
        this.bugTagRepository = bugTagRepository;
    }

    @Transactional(readOnly = true)
    public List<TagSummary> findAllTags() {
        return ((List<Tag>) tagRepository.findAll()).stream()
                .map(TagMapper::toSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TagUsageResponse> findTagUsage() {
        Map<Long, Long> usageByTagId = bugTagRepository.findAll().stream()
                .map(BugTag::getTag)
                .filter(tag -> tag != null && tag.getId() != null)
                .collect(Collectors.groupingBy(Tag::getId, Collectors.counting()));

        return tagRepository.findAll().stream()
                .map(tag -> new TagUsageResponse(
                        tag.getId(),
                        tag.getName(),
                        usageByTagId.getOrDefault(tag.getId(), 0L)
                ))
                .sorted(Comparator
                        .comparingLong(TagUsageResponse::count).reversed()
                        .thenComparing(TagUsageResponse::name))
                .toList();
    }

    @Transactional(readOnly = true)
    public TagSummary findTagById(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        return TagMapper.toSummary(tag);
    }

    @Transactional
    public TagSummary createTag(TagCreateRequest request) {
        Tag tag = TagMapper.toEntity(request);

        if (tag.getName() == null || tag.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Tag name is required");
        }
        if (tagRepository.existsByNameIgnoreCase(tag.getName())) {
            throw new IllegalStateException("Tag with name '" + tag.getName() + "' already exists");
        }

        tag.setName(tag.getName().trim());
        return TagMapper.toSummary(tagRepository.save(tag));
    }

    @Transactional
    public TagSummary updateTag(Long id, TagCreateRequest request) {
        Tag existingTag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        Tag updatedTag = TagMapper.toEntity(request);

        if (updatedTag.getName() == null || updatedTag.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Tag name is required");
        }

        existingTag.setName(updatedTag.getName().trim());
        return TagMapper.toSummary(tagRepository.save(existingTag));
    }

    @Transactional
    public void deleteTag(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        tagRepository.delete(tag);
    }

    @Transactional(readOnly = true)
    public TagSummary findTagByName(String name) {
        return tagRepository.findByNameIgnoreCase(name)
                .map(TagMapper::toSummary)
                .orElse(null);
    }

}
