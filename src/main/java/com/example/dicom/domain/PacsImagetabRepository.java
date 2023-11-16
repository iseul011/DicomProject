package com.example.dicom.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacsImagetabRepository extends JpaRepository<PacsImagetab, Integer> {
    PacsImagetab findFirstByStudykeyAndSeriesnumber(int studykey,int seriesnumber);


    List<PacsImagetab> findAllByStudykeyAndSerieskey(int studykey, int serieskey);

    List<PacsImagetab> findByStudykey(int studykey);

    List<PacsImagetab> findAllByStudykeyAndSeriesnumber(int studykey, int seriesnum);
}
