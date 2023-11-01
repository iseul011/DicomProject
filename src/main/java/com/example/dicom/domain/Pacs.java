package com.example.dicom.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(
        name="ADVSTORAGEMGRTAB"
)
@Entity
@Getter
@Setter
public class Pacs {
    @Id
    private int storageid;
    private String storagelabel;
    private String hostname;
    private int storagetype;
    private int accesstype;
    private int storagestatus;
    private String physicalpath;
    private String ftppath;
    private int ftpport;
    private String httppath;
    private int httpport;
    private String ftpuserid;
    private String ftpuserpasswd;
    private int totalspace;
    private int freespace;
    private int criticalspace;
    private String smlastupdatedatetime;
    private String dslastupdatedatetime;
    private int sharedstatus;
    private String networksharedname;
    private String publickey;
    private String privatekey;


    public Pacs(PacsRequsetDto pacsRequsetDto){
        this.storageid = pacsRequsetDto.getStorageid();
        this.storagelabel = pacsRequsetDto.getStoragelabel();
        this.hostname = pacsRequsetDto.getHostname();
        this.storagetype = pacsRequsetDto.getStoragetype();
        this.accesstype = pacsRequsetDto.getAccesstype();
        this.storagestatus = pacsRequsetDto.getStoragestatus();
        this.physicalpath = pacsRequsetDto.getPhysicalpath();
        this.ftppath = pacsRequsetDto.getFtppath();
        this.ftpport = pacsRequsetDto.getFtpport();
        this.httppath = pacsRequsetDto.getHttppath();
        this.httpport = pacsRequsetDto.getHttpport();
        this.ftpuserid = pacsRequsetDto.getFtpuserid();
        this.ftpuserpasswd = pacsRequsetDto.getFtpuserpasswd();
        this.totalspace = pacsRequsetDto.getTotalspace();
        this.criticalspace = pacsRequsetDto.getCriticalspace();
        this.smlastupdatedatetime = pacsRequsetDto.getSmlastupdatedatetime();
        this.dslastupdatedatetime = pacsRequsetDto.getDslastupdatedatetime();
        this.sharedstatus = pacsRequsetDto.getSharedstatus();
        this.networksharedname = pacsRequsetDto.getNetworksharedname();
        this.publickey = pacsRequsetDto.getPublickey();
        this.privatekey = pacsRequsetDto.getPrivatekey();
    }

    public Pacs() {

    }
}





















