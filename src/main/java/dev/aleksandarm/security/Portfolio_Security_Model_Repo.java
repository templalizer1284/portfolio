package dev.aleksandarm.security;

import org.springframework.data.jpa.repository.JpaRepository;

import jakarta.transaction.Transactional;

@Transactional
public interface Portfolio_Security_Model_Repo extends JpaRepository<Portfolio_Security_Model, Long>{
	Boolean existsByUsername(String username);
	void deleteByUsername(String username);
}
