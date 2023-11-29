package com.example.dicom.controller;

import com.example.dicom.Dcm2Jpg;
import com.example.dicom.domain.*;
import lombok.AllArgsConstructor;
import org.dcm4che3.data.Attributes;
import org.dcm4che3.data.Tag;
import org.dcm4che3.io.DicomInputStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;

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

    @GetMapping("/search/PacsImagetab")
    public List<PacsImagetab> getPacsImagetab(@RequestParam int studykey, @RequestParam int serieskey) {
        List<PacsImagetab> pacsImagetab = pacsImagetabRepository.findAllByStudykeyAndSerieskey(studykey, serieskey);
        return pacsImagetab;
    }

    @GetMapping("/search/PacsImagetabs")
    public List<PacsImagetab> getPacsImageTabsBySeriesUID(@RequestParam String seriesinsuid) {
        List<PacsImagetab> pacsImagetab = pacsImagetabRepository.findBySeriesinsuid(seriesinsuid);
        return pacsImagetab;
    }

    @GetMapping("/search/PacsStudytab")
    public List<PacsStudytab> getPacsStudytab() {
        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAll();
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/searchByPid")
    public List<PacsStudytab> getPacsStudytabByPid(@RequestParam String pid) {
        List<PacsStudytab> pacsStudytab = pacsStudytabRepository.findAllByPid(pid);
        return pacsStudytab;
    }

    @GetMapping("/search/PacsStudytab/searchList")
    public List<PacsStudytab> getSortedSearchPacsStudytab(
            @RequestParam(required = false) String column,
            @RequestParam boolean order,
            @RequestParam(required = false) String pidValue,
            @RequestParam(required = false)
            String pNameValue,
            @RequestParam int reportStatusValue) {

        Sort sort = Sort.by(order ? Sort.Direction.ASC : Sort.Direction.DESC, column);
        if (pidValue == null && pNameValue == null) {
            return pacsStudytabRepository.findAll(sort);
        }
        return (reportStatusValue == 0)
                ? pacsStudytabRepository.findByPidOrPnameOrPidAndPname(pidValue, pNameValue, pidValue, pNameValue, sort)
                : pacsStudytabRepository.findByPidAndPnameOrPidAndReportstatusOrPnameAndReportstatusOrPidAndPnameAndReportstatus
                (pidValue, pNameValue, pidValue, reportStatusValue, pNameValue,
                        reportStatusValue, pidValue, pNameValue, reportStatusValue, sort);

    }
//
//    @GetMapping("/search/PacsStudytab/searchList")
//    public List<PacsStudytab> getSortedSearchPacsStudytab(
//            @RequestParam(required = false) String column,
//            @RequestParam boolean order,
//            @RequestParam(required = false) String pidValue,
//            @RequestParam(required = false) String pNameValue,
//            @RequestParam int reportStatusValue) {
//
//            Sort sort = Sort.by(order ? Sort.Direction.ASC : Sort.Direction.DESC, column);
//
//            if (isEmpty(pidValue) && isEmpty(pNameValue)) {
//                return (reportStatusValue == 0) ? pacsStudytabRepository.findAll(sort) : pacsStudytabRepository.findByReportstatus(reportStatusValue, sort);
//            }
//
//            if (isEmpty(pidValue)) {
//                if (reportStatusValue == 0) {
//                    return pacsStudytabRepository.findByPname(pNameValue, sort);
//                } else {
//                    return pacsStudytabRepository.findByPnameAndReportstatus(pNameValue, reportStatusValue, sort);
//                }
//            }
//
//            if (isEmpty(pNameValue)) {
//                if (reportStatusValue == 0) {
//                    return pacsStudytabRepository.findByPid(pidValue, sort);
//                } else {
//                    return pacsStudytabRepository.findByPidAndReportstatus(pidValue, reportStatusValue, sort);
//                }
//            }
//
//            return (reportStatusValue == 0)
//                    ? pacsStudytabRepository.findByPidAndPname(pidValue, pNameValue, sort)
//                    : pacsStudytabRepository.findByPidAndPnameAndReportstatus(pidValue, pNameValue, reportStatusValue, sort);
//
//    }
//
//    private boolean isEmpty(String value) {
//        return value == null || value.isEmpty();
//    }


    @GetMapping("/search/PacsStudytab/findSearch")
    public List<PacsStudytab> getSortedDetailSearchStudytab(
            @RequestParam(required = false) String equipment,
            @RequestParam String optionNum,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        System.out.println("equipment: " + equipment);
        System.out.println("optionNum: " + optionNum);
        System.out.println("startDate: " + startDate);
        System.out.println("endDate: " + endDate);

        if (startDate != "" && endDate != "" && equipment != "" && optionNum != "") {
            return pacsStudytabRepository.dateAllFindEquipmentOptionNum(equipment, optionNum, startDate, endDate);
        } else if (startDate != "" && endDate != "" && equipment != "") {
            return pacsStudytabRepository.dateAllFindEquipment(equipment, startDate, endDate);
        } else if (startDate != "" && endDate != "") {
            return pacsStudytabRepository.dateAllFind(startDate, endDate);
        }

        return null;
    }

    @GetMapping("/search/PacsStudytab/clickSearch")
    public List<PacsStudytab> getClickSearchStudytab(@RequestParam(required = false) String DateString) {

        System.out.println("DateString: " + DateString);

        if (DateString.equals("findToday")) {
            return pacsStudytabRepository.findToday();
        } else if (DateString.equals("oneWeek")) {
            return pacsStudytabRepository.dateFindSevenAgo();
        } else if (DateString.equals("thirtyDay")) {
            return pacsStudytabRepository.dateFindThirtyAgo();
        }

        return null;
    }

    @GetMapping("/getImagePath")
    public List<String> getImagePaths(@RequestParam int studykey, @RequestParam String seriesinsuid) {
        PacsImagetab pacsImagetab = pacsImagetabRepository.findFirstByStudykeyAndSeriesinsuid(studykey, seriesinsuid);

        if (pacsImagetab == null) {
            return Collections.emptyList();
        }

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
        //Collections.sort(dcmFilePaths);
        //System.out.println("dcmFilePaths"+dcmFilePaths);
        return dcmFilePaths;

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





