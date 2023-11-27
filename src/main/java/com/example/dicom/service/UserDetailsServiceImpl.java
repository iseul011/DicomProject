package com.example.dicom.service;

import com.example.dicom.domain.Pacsadvusertab;
import com.example.dicom.domain.PacsadvusertabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PacsadvusertabRepository userRepository;

    // UserDetailsService의 메소드를 구현하여 사용자 정보를 가져옵니다.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 사용자명(username)을 이용하여 데이터베이스에서 사용자 정보를 조회합니다.
        Pacsadvusertab user = userRepository.findByUserid(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Spring Security에서 제공하는 UserDetails 객체를 생성하여 반환합니다.
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),    // 사용자명
                user.getPassword(),    // 비밀번호
                Collections.emptyList() // 사용자의 권한 목록 (현재는 빈 목록으로 설정)
        );
    }
}
