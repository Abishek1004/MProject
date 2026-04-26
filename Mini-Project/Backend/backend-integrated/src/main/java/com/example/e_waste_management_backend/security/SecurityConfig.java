package com.example.e_waste_management_backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import com.example.e_waste_management_backend.entity.*;
import com.example.e_waste_management_backend.repository.*;
import com.example.e_waste_management_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    // Reads comma-separated origins from env var ALLOWED_ORIGINS
    // e.g. "https://my-frontend.onrender.com,http://localhost:5173"
    @Value("${allowed.origins:http://localhost:5173,http://localhost:5174,http://localhost:5175}")
    private String allowedOrigins;

    @Autowired private GoogleUserRepository googleRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                // Apply global CORS config (handles OPTIONS pre-flight automatically)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .authorizeHttpRequests(auth -> auth
                        // ✅ Public APIs
                        .requestMatchers(
                                "/auth/**",
                                "/oauth2/**",
                                "/api/**",
                                "/api/predict",
                                "/api/predict-image"
                        ).permitAll()

                        // ❗ Everything else requires login
                        .anyRequest().authenticated()
                )

                .oauth2Login(oauth -> oauth
                        .successHandler((request, response, authentication) -> {
                            OAuth2User principal = (OAuth2User) authentication.getPrincipal();
                            String email = principal.getAttribute("email");
                            String name = principal.getAttribute("name");

                            googleRepo.findByEmail(email).orElseGet(() -> {
                                GoogleUser g = new GoogleUser();
                                g.setEmail(email);
                                g.setVerified(true);
                                return googleRepo.save(g);
                            });

                            User user = userRepo.findByEmail(email).orElseGet(() -> {
                                User u = new User();
                                u.setEmail(email);
                                u.setName(name);
                                u.setVerified(true);
                                return userRepo.save(u);
                            });

                            String token = jwtUtil.generateToken(email);
                            String encodedName = URLEncoder.encode(name != null ? name : "", StandardCharsets.UTF_8);
                            String encodedEmail = URLEncoder.encode(email != null ? email : "", StandardCharsets.UTF_8);
                            
                            // Redirect to frontend
                            String frontendUrl = allowedOrigins.split(",")[0]; // Use the first origin (localhost:5173)
                            String redirectUrl = String.format("%s/?token=%s&id=%d&name=%s&email=%s",
                                    frontendUrl, token, user.getId(), encodedName, encodedEmail);
                            
                            response.sendRedirect(redirectUrl);
                        })
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Parse comma-separated ALLOWED_ORIGINS env var
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        config.setAllowedOrigins(origins);

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}