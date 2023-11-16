package com.example.dicom.controller;

import com.example.dicom.domain.PacsImagetab;
import com.example.dicom.domain.PacsImagetabRepository;
import lombok.AllArgsConstructor;
import org.dcm4che3.data.Attributes;
import org.dcm4che3.data.Tag;
import org.dcm4che3.io.DicomInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.imageio.ImageIO;
import org.dcm4che3.tool.dcm2jpg.Dcm2Jpg;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URLDecoder;
import java.io.File;
import java.io.IOException;
import java.util.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@AllArgsConstructor
public class UploadController {
    private final PacsImagetabRepository pacsImagetabRepository;

    @GetMapping("/getImagePath")

    public List<String> getImagePaths(@RequestParam int studykey, @RequestParam String seriesinsuid) {


        PacsImagetab pacsImagetab = pacsImagetabRepository.findFirstByStudykeyAndSeriesinsuid(studykey, seriesinsuid);

        String directoryPath = "Z:\\" + pacsImagetab.getPath();

        File directory = new File(directoryPath);

        File[] files = directory.listFiles();

        List<String> dcmFilePaths = new ArrayList<>();

        if (files != null) {
            for (File file : files) {
              
                try (DicomInputStream dis = new DicomInputStream(file)) {
                    Attributes attributes = dis.readDataset(-1, -1);
                    String seriesInstanceUID = attributes.getString(Tag.SeriesInstanceUID);

                        if (seriesinsuid.equals(seriesInstanceUID)) {
                            dcmFilePaths.add(file.getAbsolutePath());
                        }

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        return dcmFilePaths;

    }


        @GetMapping("/getDicomFile")
    public ResponseEntity<byte[]> getDicom(@RequestParam String directoryPath) throws IOException {
        // 예시: DICOM 파일의 경로 설정
        //System.out.println("directoryPath : " + directoryPath);

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
    @GetMapping("/getDicomDownloadPath")
    public ResponseEntity<byte[]> getDicomDownloadPath(@RequestParam("directoryPath") String directoryPath) throws IOException {
        try {
            // URL 디코딩 수행
            String decodedDirectoryPath = URLDecoder.decode(directoryPath, "UTF-8");

            // 파일 경로를 생성하고 해당 파일의 내용을 바이트 배열로 읽어옴
            Path path = Paths.get(decodedDirectoryPath);
            byte[] data = Files.readAllBytes(path);

            // 응답에 파일 내용과 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", path.getFileName().toString());
            headers.setContentLength(data.length);

            return new ResponseEntity<>(data, headers, HttpStatus.OK);
        } catch (UnsupportedEncodingException e) {
            // URL 디코딩 중 예외 처리
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}


