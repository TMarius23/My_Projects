package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.UserUpdateRequest;
import com.bug_reporter.backend.dto.mapper.UserMapper;
import com.bug_reporter.backend.dto.response.UserResponse;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.service.UserService;
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
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private User testUser;
    private UserResponse testUserResponse;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testUser");
        testUser.setEmail("test@example.com");
        testUser.setRole(UserRole.USER);
        testUserResponse = UserMapper.toResponse(testUser);
    }

    @Test
    void getAllUsers() {
        when(userService.getAllUserResponses()).thenReturn(List.of(testUserResponse));

        ResponseEntity<?> result = userController.getAllUsers(null, null, null, null);

        assertEquals(200, result.getStatusCode().value());
        assertNotNull(result.getBody());
        assertEquals(1, ((List<?>) result.getBody()).size());
        verify(userService, times(1)).getAllUserResponses();
    }

    @Test
    void getUserById() {
        when(userService.getUserResponseById(1L)).thenReturn(java.util.Optional.of(testUserResponse));

        ResponseEntity<UserResponse> result = userController.getUserById(1L);

        assertEquals(200, result.getStatusCode().value());
        assertNotNull(result.getBody());
        assertEquals("testUser", result.getBody().username());
        verify(userService, times(1)).getUserResponseById(1L);
    }

    @Test
    void getUserById_notFound() {
        when(userService.getUserResponseById(99L)).thenReturn(java.util.Optional.empty());

        ResponseEntity<UserResponse> result = userController.getUserById(99L);

        assertEquals(404, result.getStatusCode().value());
    }

    @Test
    void updateUser() {
        UserUpdateRequest request = new UserUpdateRequest("updatedName", "updated@example.com", UserRole.USER, null);
        UserResponse updatedUser = new UserResponse(1L, "updatedName", "updated@example.com", UserRole.USER, false, 0.0, null);

        when(userService.updateUser(1L, request, 1L)).thenReturn(updatedUser);

        ResponseEntity<?> result = userController.updateUser(1L, request, 1L);

        assertEquals(200, result.getStatusCode().value());
        assertEquals("updatedName", ((UserResponse) result.getBody()).username());
        verify(userService, times(1)).updateUser(1L, request, 1L);
    }

    @Test
    void updateUser_notFound() {
        UserUpdateRequest request = new UserUpdateRequest("testUser", "test@example.com", UserRole.USER, null);

        when(userService.updateUser(99L, request, 1L)).thenThrow(new RuntimeException("User not found"));

        ResponseEntity<?> result = userController.updateUser(99L, request, 1L);

        assertEquals(404, result.getStatusCode().value());
    }

    @Test
    void deleteUser() {
        doNothing().when(userService).deleteUser(1L, 1L);

        ResponseEntity<?> result = userController.deleteUser(1L, 1L);

        assertEquals(204, result.getStatusCode().value());
        verify(userService, times(1)).deleteUser(1L, 1L);
    }

    @Test
    void deleteUser_notFound() {
        doThrow(new RuntimeException("User not found")).when(userService).deleteUser(99L, 1L);

        ResponseEntity<?> result = userController.deleteUser(99L, 1L);

        assertEquals(404, result.getStatusCode().value());
    }
}
