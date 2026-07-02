package com.bug_reporter.backend.model;

import com.bug_reporter.backend.model.enums.VoteType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class VoteTest {

    private Vote vote;

    @BeforeEach
    void setUp() {
        vote = new Vote();
    }

    @Test
    void getId() {
        vote.setId(10L);
        assertEquals(10L, vote.getId());
    }

    @Test
    void getComment() {
        Comment comment = new Comment();
        comment.setComment("Votantul");
        vote.setComment(comment);

        assertNotNull(vote.getComment());
        assertEquals("Votantul", vote.getComment().getComment());
    }

    @Test
    void getUser() {
        User user = new User();
        user.setUsername("Votantul");

        vote.setUser(user);

        assertNotNull(vote.getUser());
        assertEquals("Votantul", vote.getUser().getUsername());
    }

    @Test
    void getType() {
        vote.setType(VoteType.UPVOTE);
        assertEquals(VoteType.UPVOTE, vote.getType());
    }

    @Test
    void getBug() {
        Bug bug = new Bug();
        bug.setTitle("Bug pentru vot");

        vote.setBug(bug);

        assertNotNull(vote.getBug());
        assertEquals("Bug pentru vot", vote.getBug().getTitle());
    }


    @Test
    void testEquals() {
        Vote vote1 = new Vote();
        vote1.setId(1L);
        vote1.setType(VoteType.UPVOTE);

        Vote vote2 = new Vote();
        vote2.setId(1L);
        vote2.setType(VoteType.UPVOTE);

        Vote vote3 = new Vote();
        vote3.setId(2L);

        assertEquals(vote1, vote2);
        assertNotEquals(vote1, vote3);

        assertEquals(vote1.hashCode(), vote2.hashCode());
        assertNotEquals(vote1.hashCode(), vote3.hashCode());
    }


    @Test
    void testToString() {
        vote.setType(VoteType.DOWNVOTE);
        String result = vote.toString();

        assertTrue(result.contains("DOWNVOTE"));
    }
}
