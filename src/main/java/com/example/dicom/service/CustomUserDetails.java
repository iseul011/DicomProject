//package com.example.dicom.service;
//
//import com.example.dicom.domain.Pacsadvusertab;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.Collections;
//
//public class CustomUserDetails implements UserDetails {
//
//    private final Pacsadvusertab user;
//
//    public CustomUserDetails(Pacsadvusertab user) {
//        this.user = user;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
//    }
//
//    @Override
//    public String getPassword() {
//        return user.getPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        return user.getUserid();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        // 계정 만료 로직이 필요한 경우 구현
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        // 계정 잠금 로직이 필요한 경우 구현
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        // 자격 증명 만료 로직이 필요한 경우 구현
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        // 계정 활성화 로직이 필요한 경우 구현
//        return true;
//    }
//
//    public Pacsadvusertab getUser() {
//        return user;
//    }
//}
//
