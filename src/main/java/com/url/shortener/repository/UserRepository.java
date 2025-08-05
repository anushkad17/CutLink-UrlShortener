package com.url.shortener.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.url.shortener.models.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
