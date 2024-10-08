package com.findprecon.security;


import com.findprecon.Filter.JwtRequestFilter;
import com.findprecon.service.Authentication.JWTAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;



@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration {

    public static final String[] PUBLIC_URLS = {
            "/api/public/**",
            "/api/public/project-details/**",
            "/v3/api-docs",
            "/v2/api-docs",
            "/swagger-resources/**",
            "/swagger-ui/**",
            "/webjars/**"
    };


    @Autowired
    private JWTAuthenticationEntryPoint point;

    @Autowired
    private JwtRequestFilter requestFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf->csrf.disable())
                .cors(cors->cors.disable())
                .authorizeHttpRequests(
                        auth->
                                auth.requestMatchers("/api/private/**")
                                        .authenticated()
                                        .requestMatchers(PUBLIC_URLS).permitAll()
                                        .anyRequest().permitAll())
                .exceptionHandling(ex->ex.authenticationEntryPoint(point))
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        ;
        http.addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
