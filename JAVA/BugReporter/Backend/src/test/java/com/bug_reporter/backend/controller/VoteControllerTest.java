package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.VoteBugRequest;
import com.bug_reporter.backend.dto.request.VoteCommentRequest;
import com.bug_reporter.backend.dto.response.VoteResponse;
import com.bug_reporter.backend.dto.mapper.VoteMapper;
import com.bug_reporter.backend.model.Vote;
import com.bug_reporter.backend.model.enums.VoteType;
import com.bug_reporter.backend.service.VoteService;
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
class VoteControllerTest {

    @Mock
    private VoteService voteService;

    @InjectMocks
    private VoteController voteController;

    private Vote testVote;
    private VoteResponse testVoteResponse;

    @BeforeEach
    void setUp() {
        testVote = new Vote();
        testVote.setId(1L);
        testVote.setType(VoteType.UPVOTE);
        testVoteResponse = VoteMapper.toResponse(testVote);
    }

    @Test
    void findAll() {
        when(voteService.findAllVotes()).thenReturn(List.of(testVoteResponse));
        ResponseEntity<List<VoteResponse>> result = voteController.findAll();
        assertEquals(200, result.getStatusCode().value());
        assertEquals(1, result.getBody().size());
    }

    @Test
    void voteBug() {
        VoteBugRequest request = new VoteBugRequest(10L, VoteType.UPVOTE);

        when(voteService.voteBug(request, 1L)).thenReturn(testVoteResponse);
        ResponseEntity<?> result = voteController.voteBug(request, 1L);
        assertEquals(201, result.getStatusCode().value());
    }

    @Test
    void voteComment() {
        VoteCommentRequest request = new VoteCommentRequest(100L, VoteType.DOWNVOTE);

        when(voteService.voteComment(request, 1L)).thenReturn(testVoteResponse);
        ResponseEntity<?> result = voteController.voteComment(request, 1L);
        assertEquals(201, result.getStatusCode().value());
    }

    @Test
    void getBugVoteCount() {
        when(voteService.getBugVoteCount(10L)).thenReturn(5);
        ResponseEntity<?> result = voteController.getBugVoteCount(10L);
        assertEquals(200, result.getStatusCode().value());
        assertEquals(5, result.getBody());
    }

    @Test
    void getCommentVoteCount() {
        when(voteService.getCommentVoteCount(100L)).thenReturn(-2);
        ResponseEntity<?> result = voteController.getCommentVoteCount(100L);
        assertEquals(200, result.getStatusCode().value());
        assertEquals(-2, result.getBody());
    }
}
