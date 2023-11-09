package com.example.dicom.controller;

import com.example.dicom.domain.PacsImagetab;
import com.example.dicom.domain.PacsImagetabRepository;
import lombok.AllArgsConstructor;
import org.dcm4che3.io.DicomInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import org.dcm4che3.tool.dcm2jpg.Dcm2Jpg;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class UploadController {
    private final PacsImagetabRepository pacsImagetabRepository;

    @GetMapping("/getFiles")

//    public List<String> getFiles(@RequestParam String directoryPath) {
//
//        List<String> imagesAsBase64 = new ArrayList<>();
//        File folder = new File("Z:\\" + directoryPath);
//        File[] listOfFiles = folder.listFiles();
//
//        for (File file : listOfFiles) {
//                BufferedImage image = null;
//                if (file.getName().endsWith(".dcm")) {
//                    try {
//                        Dcm2Jpg dcm2Jpg = new Dcm2Jpg();
//                        image = dcm2Jpg.readImageFromDicomInputStream(file);
//
//                        String imageAsBase64 = convertBufferedImageToBase64(image, "jpg");
//                        imagesAsBase64.add(imageAsBase64);
//
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                } else {
//                    try {
//                        image = ImageIO.read(file);
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//
//        }
//
//        return imagesAsBase64;
//    }
    public List<byte[]> getDicomFiles(@RequestParam String directoryPath) {
        Path folder = Paths.get("Z:\\" + directoryPath);
        List<byte[]> dicomFilesList = new ArrayList<>();

        try {
            Files.walk(folder)
                    .filter(path -> Files.isRegularFile(path) && path.toString().toLowerCase().endsWith(".dcm"))
                    .forEach(path -> {
                        try {
                            byte[] fileContent = Files.readAllBytes(path);
                            dicomFilesList.add(fileContent);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();


        }

        return dicomFilesList;
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

    @GetMapping("/getDicomFiles")
    public List<byte[]> readDicomFiles(String directoryPath) {
        List<byte[]> dicomFilesAsBytes = new ArrayList<>();
        File folder = new File("Z:\\" + directoryPath);
        File[] listOfFiles = folder.listFiles();

        if (listOfFiles != null) {
            for (File file : listOfFiles) {
                if (file.getName().endsWith(".dcm")) {
                    try (FileInputStream fis = new FileInputStream(file)) {
                        byte[] dicomFileAsByte = fis.readAllBytes();

                        dicomFilesAsBytes.add(dicomFileAsByte);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            System.out.println(Arrays.toString(dicomFilesAsBytes.get(0)));
        }
        return dicomFilesAsBytes;
    }

    @GetMapping("/getDicomFile")
    public ResponseEntity<byte[]> getDicomFile() throws IOException {
        // 예시: DICOM 파일의 경로 설정
        String filePath = "Z:\\202212\\27\\SK_TEST-27-2\\SC\\101\\SC.1.2.410.200119.10101001.30028.20221227162225931335.101.0.dcm";
        Path path = Paths.get(filePath);

        // 파일을 바이트 배열로 읽기
        byte[] fileContent = Files.readAllBytes(path);

        // HTTP Response 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "SC.1.2.410.200119.10101001.30028.20221227162225931335.101.0.dcm");

        return ResponseEntity.ok()
                .headers(headers)
                .body(fileContent);
    }

    private byte[] readDicomFileAsBytes(File file) throws IOException {
        byte[] fileBytes;
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            fileBytes = fileInputStream.readAllBytes();
        }
        return fileBytes;
    }
}


