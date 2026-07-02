package com.bug_reporter.backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TagTest {

    private Tag tag;
    private BugTag bugTag;

    @BeforeEach
    void setUp() {
        tag = new Tag();
        tag.setId(1L);
        tag.setName("backend");

        bugTag = new BugTag();
        bugTag.setId(2L);

        tag.setBugTags(List.of(bugTag));
    }

    @Test
    void getId() {
        assertEquals(1L, tag.getId());
    }

    @Test
    void getName() {
        assertEquals("backend", tag.getName());
    }

    @Test
    void getBugTags() {
        assertEquals(1, tag.getBugTags().size());
        assertEquals(bugTag, tag.getBugTags().getFirst());
    }

    @Test
    void setId() {
        tag.setId(5L);

        assertEquals(5L, tag.getId());
    }

    @Test
    void setName() {
        tag.setName("frontend");

        assertEquals("frontend", tag.getName());
    }

    @Test
    void setBugTags() {
        BugTag otherBugTag = new BugTag();
        otherBugTag.setId(3L);

        tag.setBugTags(List.of(otherBugTag));

        assertEquals(1, tag.getBugTags().size());
        assertEquals(otherBugTag, tag.getBugTags().getFirst());
    }

    @Test
    void testEquals() {
        Tag sameTag = new Tag();
        sameTag.setId(1L);
        sameTag.setName("backend");
        sameTag.setBugTags(List.of(bugTag));

        assertEquals(tag, sameTag);
        assertNotEquals(tag, new Tag());
        assertNotEquals(tag, null);
    }

    @Test
    void canEqual() {
        assertTrue(tag.canEqual(new Tag()));
        assertFalse(tag.canEqual("tag"));
    }

    @Test
    void testHashCode() {
        Tag sameTag = new Tag();
        sameTag.setId(1L);
        sameTag.setName("backend");
        sameTag.setBugTags(List.of(bugTag));

        assertEquals(tag.hashCode(), sameTag.hashCode());
    }

    @Test
    void testToString() {
        String result = tag.toString();

        assertTrue(result.contains("backend"));
    }
}
