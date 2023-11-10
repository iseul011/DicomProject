<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
<%--    <script src="https://unpkg.com/konva@9/konva.min.js"></script>--%>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/cornerstone-core/dist/cornerstone.js"></script>
    <script src="https://unpkg.com/cornerstone-tools/dist/cornerstoneTools.js"></script>
    <script src="https://unpkg.com/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-web-image-loader/dist/cornerstoneWebImageLoader.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dicom-parser/dist/dicomParser.min.js"></script>
    <script src="https://unpkg.com/dicom-parser/dist/dicomParser.js"></script>
    <script src="https://unpkg.com/dcmjs"></script>
</head>
<body>
<form>
    <input type="text" name="path" value="201608\\22\\MS0010\\MR\\9" >
    <input type="text" name="fname" value="1.3.12.2.1107.5.1.4.65266.30000018122721584475300010337.dcm" >
    <input type="button" onclick="getImage(form)">

    <div id="img"></div>
    <script src="/script/LJW.js"></script>
</form>
</body>
</html>
