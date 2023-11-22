package com.example.dicom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
public class PacsController {
    @GetMapping("/login")
    public String login() {
        return "login";
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

