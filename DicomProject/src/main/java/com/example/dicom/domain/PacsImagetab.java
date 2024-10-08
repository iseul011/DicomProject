package com.example.dicom.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(
        name="IMAGETAB"
)
@Entity
@Getter
@Setter
public class PacsImagetab {
    private int studykey;
    private int serieskey;
    @Id
    private int imagekey;
    private String studyinsuid;
    private String seriesinsuid;
    private String sopinstanceuid;
    private String sopclassuid;
    private String path;
    private String fname;
    private Integer seriesnumber;
    private String instancenum;
    private Integer curseqnum;
    private Integer window;
    private Integer lev;
    private String contentdate;
    private String contenttime;
    private String acqdate;
    private String acqtime;
    private String studyid;
    private String viewposition;
    private String laterality;
    private String imagetype;
    private String fmxdata;
    private String imagecomments;
    private String additionaldesc;
    private String imageorientation;
    private String imageposition;
    private String pixelspacing;
    private Integer pixelrows;
    private Integer pixelcolumns;
    private Integer bitsallocated;
    private String specificcharacterset;
    private String transfersyntaxuid;
    private String sourceapplicationentitytitle;
    private String lossyimagecompression;
    private Integer sampleperpixel;
    private String photometricinterpretation;
    private Integer bitsstored;
    private Integer highbit;
    private Integer pixelrepresentation;
    private Integer planarconfiguration;
    private Integer framecnt;
    private Integer geomstatus;
    private Integer archstatus;
    private String archpath;
    private Integer delflag;
    private Integer verifyflag;
    private Integer hideflag;
    private Integer keyflag;
    private Integer compstatus;
    private String presentationstatedata;
    private Integer sharpenvalue;
    private String lutdata;
    private Integer imagesize;
    private Integer compsize;
    private String movpath;
    private String movfname;
    private Integer movieflag;
    private String codectype;
    private Float framerate;
    private Float frametime;
    private String recstartdate;
    private String recstarttime;
    private String recenddate;
    private String recendtime;
    private Integer movststorageid;
    private Integer ltstorageid;
    private Integer ststorageid;
    private Integer webstorageid;
    private String insertdate;
    private String inserttime;
    private String inserted;
    private String updated;
    private Integer hospitalid;
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
    private Integer photometric;
    private String patientorientation;
    private String presentationlutshape;
    private String instancecreationdate;
    private String instancecreationtime;
    private String sourceaetitle;
    private Integer ai_score;
    private Integer ai_finding_count;
}
