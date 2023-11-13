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
    @GetMapping("/getImagePath")
    public List<String> getImagePaths(@RequestParam int studykey, @RequestParam int seriesnum) {
        System.out.println("seriesnum : : " +seriesnum);

        PacsImagetab pacsImagetab = pacsImagetabRepository.findFirstByStudykeyAndSeriesnumber(studykey, seriesnum);

        // 디렉토리 경로
        String directoryPath ="Z:\\" + pacsImagetab.getPath();
        System.out.println("directoryPath: " +directoryPath);

        // 디렉토리에서 DCM 파일 목록 가져오기
        File directory = new File(directoryPath);
        File[] files = directory.listFiles();

        //System.out.println("files: " + Arrays.toString(files));

        List<String> dcmFilePaths = new ArrayList<>();

        if (files != null) {
            for (File file : files) {
                //System.out.println("file: " + file);
                    dcmFilePaths.add(String.valueOf(file));
            }
        }
        System.out.println("dcmFilePaths size : " + Arrays.toString(new List[]{dcmFilePaths}));

        return dcmFilePaths;
    }


    @GetMapping("/getDicomFile")
    public ResponseEntity<byte[]> getDicom(@RequestParam String directoryPath) throws IOException {
        // 예시: DICOM 파일의 경로 설정
        System.out.println("directoryPath : " + directoryPath);
        Path path = Paths.get(directoryPath);

        //Path path = Paths.get("C:\\Users\\82104\\Downloads\\1.2.410.200013.1.510.1.20210310170346701.0009.dcm");

        // 파일을 바이트 배열로 읽기
        byte[] fileContent = Files.readAllBytes(path);

        // HTTP Response 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf("application/dicom"));
        headers.setContentDispositionFormData("attachment", "");

        return ResponseEntity.ok()
                .headers(headers)
                .body(fileContent);
    }

}


