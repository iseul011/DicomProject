package com.example.dicom.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PacsStudytabRepository extends JpaRepository<PacsStudytab, Integer> {

    String Reportstatus = "select * from STUDYTAB where reportstatus = ?";
    String threeFindAll = "select * from STUDYTAB where  pname= ? or pid=? or reportstatus=?";

    List<PacsStudytab> findByStudykey(int studykey);

    List<PacsStudytab> findAllByPid(String pid);

    List<PacsStudytab> findAllByPname(String pname);


    @Query(value = Reportstatus, nativeQuery = true)
    List<PacsStudytab> ReportstatusAll(String reportstatus);

    List<PacsStudytab> findAllByPidAndPname(String pid, String pname);

    @Query(value = threeFindAll, nativeQuery = true)
    List<PacsStudytab> threeFindAll(String pid, String pname, String reportstatus);

    void deleteByPid(String pid);

}
