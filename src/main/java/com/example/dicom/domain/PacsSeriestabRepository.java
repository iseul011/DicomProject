package com.example.dicom.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacsSeriestabRepository extends JpaRepository<PacsSeriestab, Integer> {
    List<PacsSeriestab> findByStudykey(int studykey);

}

