package com.bug_reporter.backend.dto.mapper;

import com.bug_reporter.backend.dto.request.TagCreateRequest;
import com.bug_reporter.backend.dto.response.TagSummary;
import com.bug_reporter.backend.model.Tag;

public final class TagMapper {

    private TagMapper() {
    }

    public static TagSummary toSummary(Tag tag) {
        if (tag == null) return null;
        return new TagSummary(tag.getId(), tag.getName());
    }

    public static Tag toEntity(TagCreateRequest request) {
        Tag tag = new Tag();
        tag.setName(request.name() == null ? null : request.name().trim());
        return tag;
    }
}
