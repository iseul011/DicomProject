package com.example.dicom.controller;

import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
public class PacsController {

    @GetMapping("/woPhs")
    public String woPhs() {
        return "/woPhs";
    }

    @GetMapping("/worklist")
    public String worklist() {
        return "/worklist";
    }

    @GetMapping("/viewPage")
    public String viewPage() {
        return "/viewer";
    }

    @GetMapping("/viewer/{studykey}/{studyinsuid}/{pid}")
    public String loadOtherPage(@PathVariable String studykey, @PathVariable String studyinsuid, @PathVariable String pid) {
        return "/viewer";
    }

}

