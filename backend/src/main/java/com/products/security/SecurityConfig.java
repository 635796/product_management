package com.products.security;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {

    // Create JwtAuthFilter bean manually
    @Bean
    public JwtAuthFilter jwtAuthFilterBean() throws Exception {
        return new JwtAuthFilter();
    }

    // Register filter for URL patterns
    @Bean
    public FilterRegistrationBean<JwtAuthFilter> jwtAuthFilterRegistration(JwtAuthFilter filter) {
        FilterRegistrationBean<JwtAuthFilter> reg = new FilterRegistrationBean<>();
        reg.setFilter(filter);
        reg.addUrlPatterns("/products/*");   // Protect API
        return reg;
    }
}