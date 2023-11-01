package com.example.dicom.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(
        name="STUDYTAB"
)
@Entity
@Getter
@Setter
public class PacsStudytab {
    @Id
    private int studykey;
    private String studyinsuid;
    private String patkey;
    private String accessnum;
    private String studydate;
    private String studytime;
    private String studyid;
    private String examcode;
    private String studydesc;
    private String modality;
    private String bodypart;
    private Integer patientkey;
    private String pid;
    private String pname;
    private String plastname;
    private String pfirstname;
    private String pkname;
    private String pename;
    private String psex;
    private String pbirthdatetime;
    private String patage;
    private Integer examstatus;
    private Integer reportstatus;
    private Integer seriescnt;
    private Integer seriesmoviecnt;
    private Integer imagecnt;
    private Integer moviecnt;
    private Integer nonseriescount;
    private Integer nonimagecount;
    private Integer verifyflag;
    private String verifydatetime;
    private String dept;
    private String refphysicianname;
    private String reqphysicianname;
    private String perfphysicianname;
    private String operatorsname;
    private String refertodrid;
    private String refertodrname;
    private String patkind;
    private String ward;
    private String sickname;
    private String addedinfo;
    private String hiscomments;
    private String hisaddedinfo1;
    private String hisaddedinfo2;
    private String hisaddedinfo3;
    private String insname;
    private String stationname;
    private String confirmdatetime;
    private String readingdatetime;
    private String transcribeddatetime;
    private Integer readtype;
    private String readcode;
    private String readcodedesc;
    private String readingdr;
    private String confirmdr;
    private String transcriptionist;
    private String readingkeyword;
    private Integer teachingcased;
    private Integer stereocount;
    private String protocolname;
    private String viewposition;
    private String laterality;
    private String reason4study;
    private String comments;
    private String studytype;
    private Integer archstatus;
    private Integer compstatus;
    private Integer delflag;
    private Integer backupstatus;
    private String backuplabel;
    private String backupdatetime;
    private Integer mismatchflag;
    private Integer readingpriority;
    private Integer abnormalpatient;
    private String insertdate;
    private String inserttime;
    private Integer hospitalid;
    private Integer burncnt;
    private String burndatetime;
    private Integer validateflag;
    private Integer reqreadstatus;
    private Integer tbflag;
    private Integer movieflag;
    private Integer otherscpsendstatus;
    private String stationfilmroom;
    private Integer reserved1;
    private Integer reserved2;
    private Integer reserved3;
    private String reserved4;
    private String reserved5;
    private String reserved6;
    private String reserved7;
    private String reserved8;
    private String reserved9;
    private String reserved10;
    private String aetitle;
    private Integer openstatus;
    private Integer dap;
    private Integer filesize;
    private String inserted;
    private String updated;
    private Integer remote_flag;
    private String ai_company;
    private String ai_model_name;
    private String ai_updated;
    private Float ai_score;
    private Integer ai_priority;
    private Integer ai_number_of_findings;
    private String ai_abnormal_yn;
    private String ai_finding;
    private String ai_report;
    private String ai_version;
    private Integer ai_result_code;

}
