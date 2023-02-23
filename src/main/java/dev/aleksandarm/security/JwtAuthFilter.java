package dev.aleksandarm.security;

import java.io.IOException;

import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthFilter extends OncePerRequestFilter{
	
	@Override
	protected void doFilterInternal(
			HttpServletRequest req,
			HttpServletResponse res,
			FilterChain filterChain
			) throws ServletException, IOException{
		final String authHeader = req.getHeader("AUTHORIZATION");
		final String username;
		final String jwtToken;
		
		if(authHeader == null || !authHeader.startsWith("Bearer") ) {
			
		}
	}
}
