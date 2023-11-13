package com.example.dicom.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PacsStudytabRepository extends JpaRepository<PacsStudytab, Integer> {
    String Reportstatus = "select * from STUDYTAB where reportstatus = ?";
    String threeFindAll = "select * from STUDYTAB where pname= ? or pid=? or reportstatus=?";

    String oneAgo = "SELECT *\n" +
            " FROM STUDYTAB\n" +
            " WHERE studydate >= TRUNC(SYSDATE) - 1\n" +
            "  AND studydate < TRUNC(SYSDATE)";

    String threeAgo = "SELECT *\n" +
            " FROM STUDYTAB\n" +
            " WHERE studydate >= TRUNC(SYSDATE) - 3\n" +
            "  AND studydate < TRUNC(SYSDATE)";

    String oneWeekAgo = "SELECT *\n" +
            " FROM STUDYTAB\n" +
            " WHERE studydate >= TRUNC(SYSDATE) - 7\n" +
            "  AND studydate < TRUNC(SYSDATE)";

    List<PacsStudytab> findByStudykey(int studykey);

    // 써치
    List<PacsStudytab> findAllByPid(String pid); // 세부조회에도 씀
    List<PacsStudytab> findAllByPname(String pname);
    @Query(value = Reportstatus, nativeQuery = true)
    List<PacsStudytab> ReportstatusAll(String reportstatus);
    List<PacsStudytab> findAllByPidAndPname(String pid, String pname);
    @Query(value = threeFindAll, nativeQuery = true)
    List<PacsStudytab> threeFindAll(String pid, String pname, String reportstatus);
    // 써치 끝

    //날짜
    @Query(value = oneAgo, nativeQuery = true)
    List<PacsStudytab> oneAgo();

    @Query(value = threeAgo, nativeQuery = true)
    List<PacsStudytab> threeAgo();

    @Query(value = oneWeekAgo, nativeQuery = true)
    List<PacsStudytab> oneWeekAgo();
    //날짜 끝

    void deleteByPid(String pid);

}
