package com.example.dicom.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// JpaRepository를 상속하여 Pacsadvusertab 엔티티를 조작하는데 필요한 메소드를 상속받습니다.
public interface PacsadvusertabRepository extends JpaRepository<Pacsadvusertab, String> {

    // 사용자명과 비밀번호를 이용하여 사용자를 조회하는 메소드
    Pacsadvusertab findByUseridAndPassword(String userid, String password);

    // 사용자명을 이용하여 사용자를 조회하는 메소드
    Optional<Pacsadvusertab> findByUserid(String userid);
}
