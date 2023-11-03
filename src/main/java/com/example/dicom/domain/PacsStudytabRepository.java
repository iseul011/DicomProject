package com.example.dicom.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacsStudytabRepository extends JpaRepository<PacsStudytab, Integer> {
    List<PacsStudytab> findByStudykey(int studykey);

    List<PacsStudytab> findAllByPid(String pid);

    void deleteByPid(String pid);


}
