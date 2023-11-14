package com.example.dicom.domain;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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


    void deleteByPid(String pid);

}
