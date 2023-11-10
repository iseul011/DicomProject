package com.example.dicom.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacsImagetabRepository extends JpaRepository<PacsImagetab, Integer> {
    PacsImagetab findFirstByStudykeyAndSeriesinsuid(int studykey,String Seriesinsuid);


    List<PacsImagetab> findAllByStudykeyAndSerieskey(int studykey, int serieskey);

    List<PacsImagetab> findByStudykey(int studykey);
}
