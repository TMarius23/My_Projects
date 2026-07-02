package com.bug_reporter.backend.model;

import com.bug_reporter.backend.model.enums.BugStatus;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.model.enums.VoteType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CommentTest {

    private Comment comment;
    private User author;
    private Bug bug;
    private Vote vote;
    private LocalDateTime createdAt;

    @BeforeEach
    void setUp() {
        author = new User();
        author.setId(1L);
        author.setUsername("tester");
        author.setEmail("tester@example.com");
        author.setPassword("secret");
        author.setRole(UserRole.USER);

        bug = new Bug();
        bug.setId(2L);
        bug.setTitle("UI issue");
        bug.setText("Button is broken");
        bug.setStatus(BugStatus.RECEIVED);

        vote = new Vote();
        vote.setId(3L);
        vote.setUser(author);
        vote.setBug(bug);
        vote.setType(VoteType.UPVOTE);

        createdAt = LocalDateTime.of(2026, 4, 1, 13, 30);

        comment = new Comment();
        comment.setId(10L);
        comment.setComment("Needs fixing");
        comment.setImageUrl("image.png");
        comment.setAuthor(author);
        comment.setBug(bug);
        comment.setCreatedAt(createdAt);
        comment.setVotes(List.of(vote));
    }

    @Test
    void onCreateSetsCreatedAtWhenMissing() {
        Comment newComment = new Comment();
        newComment.setCreatedAt(null);

        newComment.onCreate();

        assertNotNull(newComment.getCreatedAt());
    }

    @Test
    void onCreateKeepsExistingCreatedAt() {
        comment.onCreate();

        assertEquals(createdAt, comment.getCreatedAt());
    }

    @Test
    void getId() {
        assertEquals(10L, comment.getId());
    }

    @Test
    void getComment() {
        assertEquals("Needs fixing", comment.getComment());
    }

    @Test
    void getImageUrl() {
        assertEquals("image.png", comment.getImageUrl());
    }

    @Test
    void getAuthor() {
        assertEquals(author, comment.getAuthor());
    }

    @Test
    void getBug() {
        assertEquals(bug, comment.getBug());
    }

    @Test
    void getCreatedAt() {
        assertEquals(createdAt, comment.getCreatedAt());
    }

    @Test
    void getVotes() {
        assertEquals(1, comment.getVotes().size());
        assertEquals(vote, comment.getVotes().getFirst());
    }

    @Test
    void setId() {
        comment.setId(11L);

        assertEquals(11L, comment.getId());
    }

    @Test
    void setComment() {
        comment.setComment("Updated");

        assertEquals("Updated", comment.getComment());
    }

    @Test
    void setImageUrl() {
        comment.setImageUrl("updated.png");

        assertEquals("updated.png", comment.getImageUrl());
    }

    @Test
    void setAuthor() {
        User otherAuthor = new User();
        otherAuthor.setId(5L);
        otherAuthor.setUsername("other");

        comment.setAuthor(otherAuthor);

        assertEquals(otherAuthor, comment.getAuthor());
    }

    @Test
    void setBug() {
        Bug otherBug = new Bug();
        otherBug.setId(6L);
        otherBug.setTitle("Other");

        comment.setBug(otherBug);

        assertEquals(otherBug, comment.getBug());
    }

    @Test
    void setCreatedAt() {
        LocalDateTime otherDate = createdAt.plusDays(1);

        comment.setCreatedAt(otherDate);

        assertEquals(otherDate, comment.getCreatedAt());
    }

    @Test
    void setVotes() {
        Vote otherVote = new Vote();
        otherVote.setId(7L);

        comment.setVotes(List.of(otherVote));

        assertEquals(1, comment.getVotes().size());
        assertEquals(otherVote, comment.getVotes().getFirst());
    }

    @Test
    void testEquals() {
        Comment sameComment = new Comment();
        sameComment.setId(10L);
        sameComment.setComment("Needs fixing");
        sameComment.setImageUrl("image.png");
        sameComment.setAuthor(author);
        sameComment.setBug(bug);
        sameComment.setCreatedAt(createdAt);
        sameComment.setVotes(List.of(vote));

        assertEquals(comment, sameComment);
        assertNotEquals(comment, new Comment());
        assertNotEquals(comment, null);
    }

    @Test
    void canEqual() {
        assertTrue(comment.canEqual(new Comment()));
        assertFalse(comment.canEqual("comment"));
    }

    @Test
    void testHashCode() {
        Comment sameComment = new Comment();
        sameComment.setId(10L);
        sameComment.setComment("Needs fixing");
        sameComment.setImageUrl("image.png");
        sameComment.setAuthor(author);
        sameComment.setBug(bug);
        sameComment.setCreatedAt(createdAt);
        sameComment.setVotes(List.of(vote));

        assertEquals(comment.hashCode(), sameComment.hashCode());
    }

    @Test
    void testToString() {
        String result = comment.toString();

        assertTrue(result.contains("Needs fixing"));
        assertTrue(result.contains("image.png"));
    }
}
