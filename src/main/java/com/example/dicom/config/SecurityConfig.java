package com.example.dicom.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;

	// HTTP 요청에 대한 보안 설정을 구성합니다.
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.csrf().disable() // Cross-Site Request Forgery(CSRF) 보호 비활성화
				.authorizeRequests()
				.antMatchers("/").permitAll() // 인증 없이 홈 페이지에 접근 허용
				.antMatchers("/css/**", "/js/**", "/images/**").permitAll() // 정적 자원에 대한 접근 허용
				.antMatchers("/views/**").permitAll() // 특정 뷰에 대한 접근 허용
				.anyRequest().authenticated() // 나머지 요청에 대해 인증을 요구
				.and()
				.formLogin()
				.loginPage("/login") // 사용자 정의 로그인 페이지 지정
				.defaultSuccessUrl("/worklist") // 로그인 성공 후 "/worklist"로 리다이렉트
				.permitAll()
				.and()
				.logout()
				.permitAll();
	}

	// 사용자 인증을 위해 UserDetailsService를 설정합니다.
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	// 패스워드 인코딩을 사용하지 않음을 나타내는 빈을 등록합니다.
	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}
}
