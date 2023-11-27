package com.example.dicom.domain;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface PacsStudytabRepository extends JpaRepository<PacsStudytab, Integer> {

    List<PacsStudytab> findAllByPid(String pid);

    List<PacsStudytab> findByPidIgnoreCase(String pid, Sort sort);

    List<PacsStudytab> findByPnameIgnoreCase(String pname, Sort sort);

    List<PacsStudytab> findByReportstatusIgnoreCase(int reportstatus, Sort sort);

    List<PacsStudytab> findByPidAndPnameIgnoreCase(String pid, String pname, Sort sort);

    List<PacsStudytab> findByPidAndReportstatusIgnoreCase(String pid, int reportstatus, Sort sort);

    List<PacsStudytab> findByPnameAndReportstatusIgnoreCase(String pname, int reportstatus, Sort sort);

    List<PacsStudytab> findByPidAndPnameAndReportstatusIgnoreCase(String pid, String pname, int reportstatus, Sort sort);
    

    //상세 조회
    @Query(value = "SELECT * FROM STUDYTAB\n" +
            " WHERE\n" +
            " STUDYDATE >= TO_DATE(?1, 'yyyymmdd')\n" +
            " AND STUDYDATE <= TO_DATE(?2, 'yyyymmdd')", nativeQuery = true)
    List<PacsStudytab> dateAllFind(String startDate, String endDate);

    @Query(value = "SELECT * FROM STUDYTAB\n" +
            " WHERE\n" +
            "   modality = ?1\n" +
            " AND STUDYDATE >= TO_DATE(?2, 'yyyymmdd')\n" +
            " AND STUDYDATE <= TO_DATE(?3, 'yyyymmdd')", nativeQuery = true)
    List<PacsStudytab> dateAllFindEquipment(String equipment, String startDate, String endDate);

    @Query(value = "SELECT * FROM STUDYTAB\n" +
            " WHERE\n" +
            "   modality = ?1\n" +
            " AND verifyflag=?2\n" +
            " AND STUDYDATE >= TO_DATE(?3, 'yyyymmdd')\n" +
            " AND STUDYDATE <= TO_DATE(?4, 'yyyymmdd')", nativeQuery = true)
    List<PacsStudytab> dateAllFindEquipmentOptionNum(String equipment, String optionNum, String startDate, String endDate);

    //날짜 조회
    @Query(value = "SELECT *\n" +
            " FROM STUDYTAB\n" +
            " WHERE studydate <= TRUNC(SYSDATE)", nativeQuery = true)
    List<PacsStudytab> dateFindAll();

    @Query(value = "SELECT *\n" +
            " FROM STUDYTAB\n" +
            " WHERE studydate >= TRUNC(SYSDATE) - 1\n" +
            " AND studydate < TRUNC(SYSDATE)", nativeQuery = true)
    List<PacsStudytab> dateFindoneAgo();

    @Query(value = "SELECT *\n" +
            " FROM STUDYTAB\n" +
            " WHERE studydate >= TRUNC(SYSDATE) - 3\n" +
            " AND studydate < TRUNC(SYSDATE)", nativeQuery = true)
    List<PacsStudytab> dateFindThreeAgo();

    @Query(value = "SELECT *\n" +
            " FROM STUDYTAB\n" +
            " WHERE studydate >= TRUNC(SYSDATE) - 7\n" +
            " AND studydate < TRUNC(SYSDATE)", nativeQuery = true)
    List<PacsStudytab> dateFindSevenAgo();

}
