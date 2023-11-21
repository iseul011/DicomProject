//package com.example.dicom.service;
//
//import com.example.dicom.domain.Pacsadvusertab;
//import com.example.dicom.domain.PacsadvusertabRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final PacsadvusertabRepository userRepository;
//
//    @Autowired
//    public CustomUserDetailsService(PacsadvusertabRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<Pacsadvusertab> userOptional = userRepository.findByUserid(username);
//        Pacsadvusertab user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//        return new CustomUserDetails(user);
//    }
//
//}
