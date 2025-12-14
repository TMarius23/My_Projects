package org.example.bookingapp.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Dezactivează CSRF folosind noua metodă
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()
//                              auth
//                        .requestMatchers("/", "/adaugaUser", "/css/**", "/js/**", "/images/**").permitAll()
//                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
