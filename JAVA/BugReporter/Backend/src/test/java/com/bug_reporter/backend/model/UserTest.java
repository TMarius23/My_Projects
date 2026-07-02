package com.bug_reporter.backend.model;

import com.bug_reporter.backend.model.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
    }

    @Test
    void getId() {
        user.setId(1L);
        assertEquals(1L, user.getId());
    }

    @Test
    void getUsername() {
        user.setUsername("testUser");
        assertEquals("testUser", user.getUsername());
    }

    @Test
    void getEmail() {
        user.setEmail("test@example.com");
        assertEquals("test@example.com", user.getEmail());
    }

    @Test
    void getPassword() {
        user.setPassword("secret123");
        assertEquals("secret123", user.getPassword());
    }

    @Test
    void getRole() {
        user.setRole(UserRole.USER);
        assertEquals(UserRole.USER, user.getRole());
    }

    @Test
    void getComments() {
        List<Comment> comments = new ArrayList<>();
        Comment c = new Comment();
        c.setComment("Test comment");
        comments.add(c);
        user.setComments(comments);

        assertNotNull(user.getComments());
        assertEquals(1, user.getComments().size());
    }

    @Test
    void getBugs() {
        List<Bug> bugs = new ArrayList<>();
        Bug b = new Bug();
        b.setTitle("Test bug");
        bugs.add(b);
        user.setBugs(bugs);

        assertNotNull(user.getBugs());
        assertEquals(1, user.getBugs().size());
    }

    @Test
    void getVotes() {
        List<Vote> votes = new ArrayList<>();
        Vote v = new Vote();
        v.setId(1L);
        votes.add(v);
        user.setVotes(votes);

        assertNotNull(user.getVotes());
        assertEquals(1, user.getVotes().size());
    }

    @Test
    void setId() {
        user.setId(5L);
        assertEquals(5L, user.getId());
    }

    @Test
    void setUsername() {
        user.setUsername("newName");
        assertEquals("newName", user.getUsername());
    }

    @Test
    void setEmail() {
        user.setEmail("new@email.com");
        assertEquals("new@email.com", user.getEmail());
    }

    @Test
    void setPassword() {
        user.setPassword("newPass");
        assertEquals("newPass", user.getPassword());
    }

    @Test
    void setRole() {
        user.setRole(UserRole.MODERATOR);
        assertEquals(UserRole.MODERATOR, user.getRole());
    }

    @Test
    void setComments() {
        List<Comment> comments = new ArrayList<>();
        user.setComments(comments);
        assertNotNull(user.getComments());
        assertEquals(0, user.getComments().size());
    }

    @Test
    void setBugs() {
        List<Bug> bugs = new ArrayList<>();
        user.setBugs(bugs);
        assertNotNull(user.getBugs());
        assertEquals(0, user.getBugs().size());
    }

    @Test
    void setVotes() {
        List<Vote> votes = new ArrayList<>();
        user.setVotes(votes);
        assertNotNull(user.getVotes());
        assertEquals(0, user.getVotes().size());
    }

    @Test
    void testEquals() {
        User user1 = new User();
        user1.setId(1L);
        user1.setUsername("User1");

        User user2 = new User();
        user2.setId(1L);
        user2.setUsername("User2");

        User user3 = new User();
        user3.setId(2L);

        assertEquals(user1, user2);
        assertNotEquals(user1, user3);
    }

    @Test
    void testHashCode() {
        User user1 = new User();
        user1.setId(1L);

        User user2 = new User();
        user2.setId(1L);

        User user3 = new User();
        user3.setId(2L);

        assertEquals(user1.hashCode(), user2.hashCode());
        assertNotEquals(user1.hashCode(), user3.hashCode());
    }

    @Test
    void testToString() {
        user.setId(1L);
        user.setUsername("testUser");
        user.setEmail("test@example.com");
        user.setRole(UserRole.USER);

        String result = user.toString();
        assertTrue(result.contains("testUser"));
        assertTrue(result.contains("test@example.com"));
        assertTrue(result.contains("USER"));
    }
}
