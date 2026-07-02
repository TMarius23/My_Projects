package com.bug_reporter.backend.repository;

import com.bug_reporter.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //Optional is used to handle the case where a user with the given email or username might not exist in the database.
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Page<User> findAllByOrderByUsernameAsc(Pageable pageable);

    Page<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrderByUsernameAsc(String username, String email, Pageable pageable);
}