//package com.example.dicom.config;
//
//import com.example.dicom.service.CustomUserDetailsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.AuthenticationFailureHandler;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//	@Autowired
//	public AuthenticationFailureHandler authenticationFailureHandler;
//
//	@Autowired
//	private CustomUserDetailsService userDetailsService;
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//	}
//
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
//		httpSecurity.authorizeRequests()
//				.antMatchers("/").permitAll()
//				.antMatchers("/css/**", "/js/**", "/images/**").permitAll()
//				.antMatchers("/views/**").permitAll()
//				.anyRequest().authenticated();
//
//		httpSecurity.formLogin()
//				.loginPage("/login")         // default : /login
//				.loginProcessingUrl("/login")
//				.defaultSuccessUrl("/login")
//				.failureHandler(authenticationFailureHandler)
//				.usernameParameter("my_id")        // default : username
//				.passwordParameter("my_pass")     // default : password
//				.permitAll();
//
//		httpSecurity.logout()
//				.logoutUrl("/logout")            // default : /logout
//				.logoutSuccessUrl("/login")
//				.permitAll();
//
//		httpSecurity.exceptionHandling().accessDeniedPage("/error");
//
//		// ssl을 사용하지 않으면 true로 사용
//		httpSecurity.csrf().disable();
//
//		return httpSecurity.build();
//	}
//
//	@Autowired
//	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//	}
//}
//
