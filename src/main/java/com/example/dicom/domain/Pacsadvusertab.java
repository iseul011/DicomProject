package com.example.dicom.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(
        name="ADVUSERTAB"
)
@Getter
@Setter
public class Pacsadvusertab {

    @Id
    private String userid;
    private int groupid;
    private String password;
    private String password2;
    private int pwwrongcount;
    private String username;
    private int usepwdchange;
    private int usepwdexpire;
    private String pwdexpiredate;
    private Integer pwdexpirealertday;
    private Integer accountsuspended;
    private Integer pwdforcechange;
    private String pwdvalidday;
    private String usercreatedate;
    private String pwdmodifydate;
    private String dept;
    private String position;
    private String telno;
    private String comments;
    private String todaymessage;
    private int hospitalid;
    private String licensenumber;
    private byte[] usersign;


}
