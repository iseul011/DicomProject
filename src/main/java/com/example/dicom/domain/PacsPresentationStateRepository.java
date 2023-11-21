package com.example.dicom.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacsPresentationStateRepository extends JpaRepository<PacsPresentationState, Integer> {
    PacsPresentationState findAllByStudyKeyAndSeriesKeyAndImageKeyAndPrModule(int studyKey, int seriesKey, int imageKey, String prmodule);
}
