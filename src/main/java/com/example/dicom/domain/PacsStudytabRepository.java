package com.example.dicom.domain;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface PacsStudytabRepository extends JpaRepository<PacsStudytab, Integer> {

    List<PacsStudytab> findAllByPid(String pid);

    List<PacsStudytab> findByPid(String pid, Sort sort);

    List<PacsStudytab> findByPname(String pname, Sort sort);

    List<PacsStudytab> findByReportstatus(int reportstatus, Sort sort);

    List<PacsStudytab> findByPidAndPname(String pid, String pname, Sort sort);

    List<PacsStudytab> findByPidAndReportstatus(String pid, int reportstatus, Sort sort);

    List<PacsStudytab> findByPnameAndReportstatus(String pname, int reportstatus, Sort sort);

    List<PacsStudytab> findByPidAndPnameAndReportstatus(String pid, String pname, int reportstatus, Sort sort);

    void deleteByStudykey(String studykey);



    // 날짜 조회 및 상세 조회
    @Query(value = "SELECT * FROM STUDYTAB\n" +
            "WHERE\n" +
            "  AND STUDYDATE >= TO_DATE(?1, 'yyyymmdd')\n" +
            " AND STUDYDATE <= TO_DATE(?2, 'yyyymmdd')", nativeQuery = true)
    List<PacsStudytab> dateAllFind(String startDate, String endDate);

    @Query(value = "SELECT * FROM STUDYTAB\n" +
            "WHERE\n" +
            "    modality = ?1\n" +
            "  AND STUDYDATE >= TO_DATE(?2, 'yyyymmdd')\n" +
            "AND STUDYDATE <= TO_DATE(?3, 'yyyymmdd')", nativeQuery = true)
    List<PacsStudytab> dateAllFindEquipment( String equipment, String startDate, String endDate);

    @Query(value = "SELECT * FROM STUDYTAB\n" +
            "WHERE\n" +
            "    modality = ?1\n" +
            "  AND verifyflag=?2\n" +
            "  AND STUDYDATE >= TO_DATE(?3, 'yyyymmdd')\n" +
            "AND STUDYDATE <= TO_DATE(?4, 'yyyymmdd')", nativeQuery = true)
    List<PacsStudytab> dateAllFindEquipmentOptionNum(String equipment, String optionNum, String startDate, String endDate);


}
