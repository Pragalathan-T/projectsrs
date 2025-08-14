package com.examly.springapp.config;


//import com.examly.springapp.service.AuthServiceImpl; // Your UserDetailsService implementation
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
// import static org.springframework.security.config.Customizer.withDefaults;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.context.annotation.Profile;

 @Configuration
 @Profile("!test")
public class SecurityConfig {
            
     @Bean
     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
     {
     http.csrf().disable()
     .authorizeHttpRequests()
     .anyRequest().permitAll();

     return http.build();
     }



//  @Bean
//  public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationProvider authProvider) throws Exception {
//  http
//  .csrf(csrf -> csrf.disable())
//  .authorizeHttpRequests(auth -> auth
//  .requestMatchers("/api/auth/**").permitAll()
//  .requestMatchers("/api/exam/**").hasAnyRole("TEACHER", "ADMIN")
//  .requestMatchers("/api/admin/**").hasRole("ADMIN")
//  .anyRequest().authenticated())

//  .authenticationProvider(authProvider)
//  .httpBasic(Customizer.withDefaults())
//  .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // if using JWT

// return http.build();
//  }

// // @Bean
// // public AuthenticationProvider authenticationProvider(AuthServiceImpl authService, PasswordEncoder passwordEncoder) {
// // DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
// // provider.setUserDetailsService(authService);
// // provider.setPasswordEncoder(passwordEncoder);
// // return provider;
// // }

 @Bean
 public PasswordEncoder passwordEncoder() {
 return new BCryptPasswordEncoder();
 }


 @Bean
 public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
 return config.getAuthenticationManager();
 }
}
// }