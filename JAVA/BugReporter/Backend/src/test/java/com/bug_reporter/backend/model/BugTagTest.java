package com.bug_reporter.backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BugTagTest {

    private BugTag bugTag;

    @BeforeEach
    void setUp() {
        bugTag = new BugTag();
    }

    @Test
    void getId() {
        bugTag.setId(1L);
        assertEquals(1L, bugTag.getId());
    }

    @Test
    void getBug() {
        Bug bug = new Bug();
        bug.setTitle("Test bug");
        bugTag.setBug(bug);

        assertNotNull(bugTag.getBug());
        assertEquals("Test bug", bugTag.getBug().getTitle());
    }

    @Test
    void getTag() {
        Tag tag = new Tag();
        tag.setName("UI");
        bugTag.setTag(tag);

        assertNotNull(bugTag.getTag());
        assertEquals("UI", bugTag.getTag().getName());
    }

    @Test
    void setId() {
        bugTag.setId(5L);
        assertEquals(5L, bugTag.getId());
    }

    @Test
    void setBug() {
        Bug bug = new Bug();
        bug.setId(10L);
        bugTag.setBug(bug);
        assertEquals(10L, bugTag.getBug().getId());
    }

    @Test
    void setTag() {
        Tag tag = new Tag();
        tag.setId(20L);
        bugTag.setTag(tag);
        assertEquals(20L, bugTag.getTag().getId());
    }

    @Test
    void testEquals() {
        BugTag bt1 = new BugTag();
        bt1.setId(1L);

        BugTag bt2 = new BugTag();
        bt2.setId(1L);

        BugTag bt3 = new BugTag();
        bt3.setId(2L);

        assertEquals(bt1, bt2);
        assertNotEquals(bt1, bt3);
    }

    @Test
    void canEqual() {
        BugTag bt1 = new BugTag();
        bt1.setId(1L);

        BugTag bt2 = new BugTag();
        bt2.setId(1L);

        assertTrue(bt1.canEqual(bt2));
        assertFalse(bt1.canEqual("not a BugTag"));
    }

    @Test
    void testHashCode() {
        BugTag bt1 = new BugTag();
        bt1.setId(1L);

        BugTag bt2 = new BugTag();
        bt2.setId(1L);

        assertEquals(bt1.hashCode(), bt2.hashCode());
    }

    @Test
    void testToString() {
        bugTag.setId(1L);
        String result = bugTag.toString();
        assertTrue(result.contains("1"));
    }
}
