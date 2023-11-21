package com.example.dicom.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(
        name = "PRESENTATION_STATE"
)
@Entity
@Getter
@Setter
public class PacsPresentationState {
    @Id
    private String prId;
    private int studyKey;
    private int seriesKey;
    private int imageKey;
    private String seriesInstanceUid;
    private String sopClassUid;
    private String sopInstanceUid;
    private Long prSeriesKey;
    private Long prNonImageKey;
    private String prModule;
    private String prGraphicLayer;
    private Long prGraphicLayerOrder;
    private String prRecommendedGrayscale;
    private String prRecommendedColor;
    private String prGraphicLayerDescription;
    @Lob
    private String prContent;
    private Long delFlag;
    private String inserted;
    private String updated;
}
