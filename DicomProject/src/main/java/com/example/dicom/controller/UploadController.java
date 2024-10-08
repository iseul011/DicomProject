package com.example.dicom.controller;

import com.example.dicom.domain.PacsImagetab;
import com.example.dicom.domain.PacsImagetabRepository;
import com.example.dicom.domain.PacsPresentationState;
import com.example.dicom.domain.PacsPresentationStateRepository;
import lombok.AllArgsConstructor;
import org.dcm4che3.data.Attributes;
import org.dcm4che3.data.Tag;
import org.dcm4che3.io.DicomInputStream;
import org.dcm4che3.tool.dcm2jpg.Dcm2Jpg;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URLDecoder;
import java.io.File;
import java.io.IOException;
import java.util.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import javax.imageio.ImageIO;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@RestController
@AllArgsConstructor
public class UploadController {
    private final PacsImagetabRepository pacsImagetabRepository;
    private final PacsPresentationStateRepository pacsPresentationStateRepository;

    @GetMapping("/getImagePath")
    public List<String> getImagePaths(@RequestParam int studykey, @RequestParam String seriesinsuid) {
        // studykey와 seriesinsuid를 기반으로 PacsImagetab을 조회합니다.
        PacsImagetab pacsImagetab = pacsImagetabRepository.findFirstByStudykeyAndSeriesinsuid(studykey, seriesinsuid);

        // 조회된 결과가 없으면 빈 리스트를 반환합니다.
        if (pacsImagetab == null) {
            return Collections.emptyList();
        }

        // DICOM 파일이 저장된 디렉토리 경로를 생성합니다.
        String directoryPath = "Z:\\" + pacsImagetab.getPath();

        // 디렉토리 객체를 생성합니다.
        File directory = new File(directoryPath);

        // 디렉토리 내의 파일 목록을 얻어옵니다.
        File[] files = directory.listFiles();

        List<String> dcmFilePaths = new ArrayList<>();

//        // InstanceNumber와 파일을 매핑할 Map을 생성합니다.
//        Map<Integer, File> instanceNumberToFileMap = new HashMap<>();
//
//        // 파일이 존재하면서 DICOM 파일일 경우 처리합니다.
//        if (files != null) {
//            for (File file : files) {
//                try (DicomInputStream dis = new DicomInputStream(file)) {
//                    // DICOM 파일의 속성을 읽어옵니다.
//                    Attributes attributes = dis.readDataset(-1, -1);
//                    String seriesInstanceUID = attributes.getString(Tag.SeriesInstanceUID);
//
//                    // 요청된 SeriesInstanceUID와 일치하는 경우에 처리합니다.
//                    if (seriesinsuid.equals(seriesInstanceUID)) {
//                        int[] instanceNumber = attributes.getInts(Tag.InstanceNumber);
//                        if (instanceNumber.length > 0) {
//                            // InstanceNumber와 파일을 매핑합니다.
//                            instanceNumberToFileMap.put(instanceNumber[0], file);
//                        }
//                    }
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//
//        // InstanceNumber를 정렬합니다.
//        List<Integer> sortedInstanceNumbers = new ArrayList<>(instanceNumberToFileMap.keySet());
//        Collections.sort(sortedInstanceNumbers);
//
//        // 정렬된 InstanceNumber에 해당하는 파일 경로를 리스트에 추가합니다.
//        List<String> dcmFilePaths = new ArrayList<>();
//        for (int instanceNumber : sortedInstanceNumbers) {
//            dcmFilePaths.add(instanceNumberToFileMap.get(instanceNumber).getAbsolutePath());
//        }

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

        // 정렬된 파일 경로 리스트를 반환합니다.
        //System.out.println("dcmFilePaths : "+dcmFilePaths);
        return dcmFilePaths;
    }



    @GetMapping("/getDicomFile")
    public ResponseEntity<byte[]> getDicom(@RequestParam String directoryPath) throws IOException {
        Path path = Paths.get(directoryPath);

        byte[] fileContent = Files.readAllBytes(path);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf("application/dicom"));
        headers.setContentDispositionFormData("attachment", "");

        return ResponseEntity.ok()
                .headers(headers)
                .body(fileContent);
    }

    @GetMapping("/getDicomDownload")
    public ResponseEntity<byte[]> getDicomDownloadPath(@RequestParam("directoryPath") String directoryPath) throws IOException {
        try {
            String decodedDirectoryPath = URLDecoder.decode(directoryPath, "UTF-8");

            Path path = Paths.get(decodedDirectoryPath);
            byte[] data = Files.readAllBytes(path);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", path.getFileName().toString());
            headers.setContentLength(data.length);

            return new ResponseEntity<>(data, headers, HttpStatus.OK);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getJPEGDownload")
    public ResponseEntity<byte[]> getJPEGFileDownload(@RequestParam("directoryPath") String directoryPath) throws IOException {
        try {
            String decodedDirectoryPath = URLDecoder.decode(directoryPath, "UTF-8");
            Path path = Paths.get(decodedDirectoryPath);
            Dcm2Jpg dcm2Jpg = new Dcm2Jpg();
            BufferedImage image = dcm2Jpg.readImageFromDicomInputStream(path.toFile());

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "jpg", baos);
            byte[] data = baos.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            headers.setContentDispositionFormData("attachment", path.getFileName().toString().replace(".dcm", ".jpg"));

            return new ResponseEntity<>(data, headers, HttpStatus.OK);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getPRContentList")
    public ResponseEntity<String> getPRContentList(@RequestParam int studykey, @RequestParam int serieskey, @RequestParam int imagecnt) {
        JSONArray prContentList = new JSONArray();
        String prModule = "GraphicAnnotationModule";
        for (int i = 1; i <= imagecnt; i++) {
            PacsPresentationState pacsPresentationState = pacsPresentationStateRepository
                    .findAllByStudyKeyAndSeriesKeyAndImageKeyAndPrModule(studykey, serieskey, i, prModule);

            if (pacsPresentationState != null) {
                String prContent = pacsPresentationState.getPrContent();
                if (prContent != null) {
                    JSONObject prContentJson = new JSONObject(prContent);
                    prContentList.put(prContentJson);
                }
            }
        }

        return new ResponseEntity<>(prContentList.toString(), HttpStatus.OK);
    }

    @GetMapping("/getImage")
    public String getImage(@RequestParam int studykey, @RequestParam int serieskey) {
        PacsImagetab pacsImagetab = pacsImagetabRepository.findFirstByStudykeyAndSerieskey(studykey, serieskey);

        String directoryPath = "Z:\\" + pacsImagetab.getPath() + pacsImagetab.getFname();

        String imageAsBase64 = "";
        File file = new File(directoryPath);

        BufferedImage image = null;
        try {
            Dcm2Jpg dcm2Jpg = new Dcm2Jpg();
            image = dcm2Jpg.readImageFromDicomInputStream(file);
            imageAsBase64 = convertBufferedImageToBase64(image, "jpg");

        } catch (IOException e) {
            e.printStackTrace();
        }

        return imageAsBase64;
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


