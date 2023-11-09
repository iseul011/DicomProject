package com.example.dicom.controller;

import com.example.dicom.domain.*;
import com.example.dicom.domain.PacsImagetab;
import com.example.dicom.domain.PacsImagetabRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import org.dcm4che3.tool.dcm2jpg.Dcm2Jpg;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@AllArgsConstructor
public class UploadController {
    private final PacsImagetabRepository pacsImagetabRepository;

    @GetMapping("/getFiles")
    public List<String> getFiles(@RequestParam String directoryPath) {

        List<String> imagesAsBase64 = new ArrayList<>();
        File folder = new File("Z:\\" + directoryPath);
        File[] listOfFiles = folder.listFiles();

        for (File file : listOfFiles) {
                BufferedImage image = null;
                if (file.getName().endsWith(".dcm")) {
                    try {
                        Dcm2Jpg dcm2Jpg = new Dcm2Jpg();
                        image = dcm2Jpg.readImageFromDicomInputStream(file);

                        String imageAsBase64 = convertBufferedImageToBase64(image, "jpg");
                        imagesAsBase64.add(imageAsBase64);

                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }

        }

        return imagesAsBase64;
    }

    @GetMapping("/getImagePath")
    public String getImagePath(@RequestParam int studykey, @RequestParam int serieskey){
        PacsImagetab pacsImagetab = pacsImagetabRepository.findFirstByStudykeyAndSerieskey(studykey,serieskey);
        return pacsImagetab.getPath();
    }

    private String convertBufferedImageToBase64(BufferedImage image, String formatName) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, formatName, baos);
        baos.flush();
        byte[] imageInByte = baos.toByteArray();
        baos.close();
        return Base64.getEncoder().encodeToString(imageInByte);
    }


}


