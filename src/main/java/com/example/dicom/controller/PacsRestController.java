package com.example.dicom.controller;

import com.example.dicom.domain.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Objects;


@RequestMapping({"/v1/storage"})
@AllArgsConstructor
@RestController
public class PacsRestController {
    private final PacsSeriestabRepository pacsSeriestabRepository;
    private final PacsImagetabRepository pacsImagetabRepository;
    private final PacsStudytabRepository pacsStudytabRepository;

    @GetMapping("/search/PacsSeriestab")
    public List<PacsSeriestab> getPacsSeriestab(@RequestParam int studykey) {
        List<PacsSeriestab> pacsSeriestab = pacsSeriestabRepository.findAllByStudykey(studykey);
        return pacsSeriestab;
    }

    @GetMapping("/search/PacsImagetab")
    public List<PacsImagetab> getPacsImagetab(@RequestParam int studykey, @RequestParam int serieskey) {
        List<PacsImagetab> pacsImagetab = pacsImagetabRepository.findAllByStudykeyAndSerieskey(studykey, serieskey);
        return pacsImagetab;
    }

    @DeleteMapping("/delete")
    public void Delete(@RequestBody List<String> pid) {
        for (int i = 0; i < pid.size(); i++) {
            pacsStudytabRepository.deleteByPid(pid.get(i));
        }
    }
  

    //여기서 부터 써치
    @GetMapping("/search/PacsStudytab")
    public List<PacsStudytab> getPacsStudytab() {
        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAll();
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/searchByPid")
    public List<PacsStudytab> getPacsStudytabByPid(@RequestParam String pid) {
        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAllByPid(pid);
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/searchList")
    public List<PacsStudytab> getSortedSearchPacsStudytab(
            @RequestParam String column,
            @RequestParam boolean order,
            @RequestParam(required = false) String pidValue,
            @RequestParam(required = false) String pNameValue,
            @RequestParam int reportStatusValue) {

        Sort sort = Sort.by(order ? Sort.Direction.DESC : Sort.Direction.ASC, column);

        if (isEmpty(pidValue) && isEmpty(pNameValue)) {
            return (reportStatusValue == 0) ? pacsStudytabRepository.findAll(sort) : pacsStudytabRepository.findByReportstatus(reportStatusValue, sort);
        }

        if (isEmpty(pidValue)) {
            if (reportStatusValue == 0) {
                return pacsStudytabRepository.findByPname(pNameValue, sort);
            } else {
                return pacsStudytabRepository.findByPnameAndReportstatus(pNameValue, reportStatusValue, sort);
            }
        }

        if (isEmpty(pNameValue)) {
            if (reportStatusValue == 0) {
                return pacsStudytabRepository.findByPid(pidValue, sort);
            } else {
                return pacsStudytabRepository.findByPidAndReportstatus(pidValue, reportStatusValue, sort);
            }
        }

        return (reportStatusValue == 0)
                ? pacsStudytabRepository.findByPidAndPname(pidValue, pNameValue, sort)
                : pacsStudytabRepository.findByPidAndPnameAndReportstatus(pidValue, pNameValue, reportStatusValue, sort);
    }

    private boolean isEmpty(String value) {
        return value == null || value.isEmpty();
    }



//    @GetMapping(value = "/download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
//    public ResponseEntity<Resource> downloadFile(@RequestHeader("user-Agent") String userAgent, String fileName) {
//
//        if(resource.exists() == false) {
//            return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
//        }
//        String resourceName = resource.getFilename();
//        String resourceOrigunalName = resourceName.substring(resourceName.indexOf("-") + 1);
//        HttpHeaders headers = new HttpHeaders();
//        try {
//            String downloadName = null;
//            if(userAgent.contains("Trident")) {
//                log.info("IE broweser");
//                downloadName = URLEncoder.encode(resourceOrigunalName, "UTF-8").replace("\\+", "");
//            } else if(userAgent.contains("Edge")) {
//                log.info("Edge browser");
//                downloadName = URLEncoder.encode(resourceOrigunalName, "UTF-8");
//                log.info("Edge name: " + downloadName);
//            } else {
//                log.info("CHrome broweser");
//                downloadName = new String(resourceOrigunalName.getBytes("UTF-8"), "ISO-8859-1");
//            }
//
//            headers.add("Content-Disposition",  "attachment; filename=" + downloadName);
//        } catch (Exception e) {
//            log.error(e);
//        }
//
//        return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
//    }

}
