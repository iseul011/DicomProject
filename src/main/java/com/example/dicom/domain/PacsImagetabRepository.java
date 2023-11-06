package com.example.dicom.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacsImagetabRepository extends JpaRepository<PacsImagetab, Integer> {
    List<PacsImagetab> findByStudykeyAndSerieskey(int studykey,int serieskey);

    PacsImagetab findByStudykey(int studykey);
}
