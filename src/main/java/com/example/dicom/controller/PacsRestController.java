package com.example.dicom.controller;

import com.example.dicom.domain.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping({"/v1/storage"})
@RestController
public class PacsRestController {
    private final PacsSeriestabRepository pacsSeriestabRepository;
    private final PacsImagetabRepository pacsImagetabRepository;

    private final PacsStudytabRepository pacsStudytabRepository;

    @GetMapping("/search/PacsSeriestab")
    public List<PacsSeriestab> getPacsSeriestab(@RequestParam int studykey){

        List<PacsSeriestab> pacsSeriestab = pacsSeriestabRepository.findByStudykey(studykey);
        return pacsSeriestab;
    }

    @GetMapping("/search/PacsImagetab")
    public List<PacsImagetab> getPacsImagetab(@RequestParam int studykey, HttpSession session){

        List<PacsImagetab> pacsImagetab = pacsImagetabRepository.findByStudykey(studykey);
        session.setAttribute("imaget",pacsImagetab);
        return pacsImagetab;
    }

    @GetMapping("/search/PacsStudytab")
    public List<PacsStudytab> getPacsStudytab(){

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAll();

        return pacsStudytab;
    }
    @GetMapping("/search/PacsStudytab/{pid}")
    public List<PacsStudytab> getPacsStudytabByPid(@PathVariable String pid){

        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAllByPid(pid);

        return pacsStudytab;
    }


    public PacsRestController(PacsSeriestabRepository pacsSeriestabRepository, PacsImagetabRepository pacsImagetabRepository, PacsStudytabRepository pacsStudytabRepository) {
        this.pacsSeriestabRepository = pacsSeriestabRepository;
        this.pacsImagetabRepository = pacsImagetabRepository;
        this.pacsStudytabRepository = pacsStudytabRepository;
    }
}
