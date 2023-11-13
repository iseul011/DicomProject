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

    @GetMapping("/search/PacsStudytab")
    public List<PacsStudytab> getPacsStudytab() {

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAll();

        return pacsStudytab;
    }

    @GetMapping("/search/PacsImagetab/search")
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
    @GetMapping("/search/PacsStudytab/{pid}")
    public List<PacsStudytab> getPacsStudytabByPid(@PathVariable String pid) {

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAllByPid(pid);
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/a/{pname}")
    public List<PacsStudytab> getPacsStudytabByPname(@PathVariable String pname) {

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAllByPname(pname);
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/b/{reportstatus}")
    public List<PacsStudytab> getPacsStudytabBy(@PathVariable String reportstatus) {

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.ReportstatusAll(reportstatus);
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/{pid}/{pname}")
    public List<PacsStudytab> getPacsStudytabSearch(@PathVariable String pid, @PathVariable String pname) {

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAllByPidAndPname(pid, pname);
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/{pid}/{pname}/{reportstatus}")
    public List<PacsStudytab> getPacsStudytabSearch2(@PathVariable String pid, @PathVariable String pname, @PathVariable String reportstatus) {

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.threeFindAll(pid, pname, reportstatus);
        return pacsStudytab;
    }
    //여기가 써치 끝

    //날짜 시작
    @GetMapping("/search/PacsStudytab/oneAgo")
    public List<PacsStudytab> oneAgo() {

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.oneAgo();
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/threeAgo")
    public List<PacsStudytab> threeAgo() {

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.threeAgo();
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/oneWeekAgo")
    public List<PacsStudytab> oneWeekAgo() {

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.oneWeekAgo();
        return pacsStudytab;
    }
    //날짜 끝

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
