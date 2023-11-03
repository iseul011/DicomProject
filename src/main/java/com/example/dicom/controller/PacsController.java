package com.example.dicom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.FileImageInputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;

@Controller
public class PacsController {

    @GetMapping("/img/home")
    public String img() {
        return "/worklist";
    }

    @GetMapping("/worklist")
    public String worklist() {
        return "/worklist";
    }

    @GetMapping("/viewer/{studykey}/{studyinsuid}/{pid}")
    public String loadOtherPage(@PathVariable String studykey, @PathVariable String studyinsuid, @PathVariable String pid) {
        return "/viewer";
    }


    @GetMapping("/view")
    public String viewDicom(Model model) {

        try {
            String dicomFilePath = "C:\\Users\\82104\\Downloads\\1.2.410.200013.1.510.1.20210310170346701.0009.dcm";

            FileImageInputStream input = new FileImageInputStream(new File(dicomFilePath));
            ImageReader reader = ImageIO.getImageReaders(input).next();
            reader.setInput(input);
            BufferedImage bufferedImage = reader.read(0);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "JPEG", baos);

            byte[] imageBytes = baos.toByteArray();
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            model.addAttribute("base64Image", base64Image);

        } catch (IOException e) {
            model.addAttribute("error", "이미지 변환 실패: " + e.getMessage());
        }

        return "view";
    }

}
