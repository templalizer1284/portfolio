package dev.aleksandarm.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class Portfolio_Security {

    @Bean
    SecurityFilterChain securityChainFilter(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests() 
        .requestMatchers("/login", "/logout").permitAll()
        .requestMatchers("/").hasAnyRole("user", "admin")
        .anyRequest()
        .authenticated()
        .and()
        .formLogin()
        .permitAll()
        .and()
        .logout()
        .permitAll();

        return http.build();
    }
}
