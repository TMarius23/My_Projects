package com.bug_reporter.backend.model;

import com.bug_reporter.backend.model.enums.BugStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class BugTest {

    private Bug bug;

    @BeforeEach
    void setUp() {
        bug = new Bug();
    }

    @Test
    void testEquals() {
        Bug bug1 = new Bug();
        bug1.setId(3L);
        bug1.setTitle("Test1");

        Bug bug2 = new Bug();
        bug2.setId(3L);
        bug2.setTitle("Test2");

        Bug bug3 = new Bug();
        bug3.setId(3L);
        bug3.setTitle("Test2");

        assertEquals(bug2, bug3);
        assertNotEquals(bug1, bug2);
    }


    @Test
    void testHashCode() {
        Bug bug1 = new Bug();
        bug1.setId(3L);
        bug1.setTitle("Test1");

        Bug bug2 = new Bug();
        bug2.setId(3L);
        bug2.setTitle("Test1");

        assertEquals(bug1.hashCode(), bug2.hashCode());
    }

    @Test
    void testToString() {
        bug.setTitle("Bug titlu");
        String result = bug.toString();

        assertTrue(result.contains("Bug titlu"));
    }

    @Test
    void getId() {
        bug.setId(100L);
        assertEquals(100L, bug.getId());
    }

    @Test
    void getTitle() {
        bug.setTitle("Bug titlu");
        assertEquals("Bug titlu", bug.getTitle());
    }

    @Test
    void getText() {
        bug.setText("Bug titlu");
        assertEquals("Bug titlu", bug.getText());
    }

    @Test
    void getCreatedAt() {
        LocalDateTime acum = LocalDateTime.now();
        bug.setCreatedAt(acum);
        assertEquals(acum, bug.getCreatedAt());
    }

    @Test
    void getPicture() {
        bug.setPicture("poza.png");
        assertEquals("poza.png", bug.getPicture());
    }

    @Test
    void getStatus() {
        bug.setStatus(BugStatus.RECEIVED);
        assertEquals(BugStatus.RECEIVED, bug.getStatus());
    }

    @Test
    void getAuthor() {
        User user = new User();
        user.setUsername("TestUser");
        bug.setAuthor(user);

        assertNotNull(bug.getAuthor());
        assertEquals("TestUser", bug.getAuthor().getUsername());
    }

    @Test
    void getComments() {
        bug.setComments(new ArrayList<>());
        assertNotNull(bug.getComments());
        assertTrue(bug.getComments().isEmpty());
    }

    @Test
    void getVotes() {
        bug.setVotes(new ArrayList<>());
        assertNotNull(bug.getVotes());
        assertTrue(bug.getVotes().isEmpty());
    }

    @Test
    void getBugTags() {
        bug.setBugTags(new ArrayList<>());
        assertNotNull(bug.getBugTags());
        assertTrue(bug.getBugTags().isEmpty());
    }
}
