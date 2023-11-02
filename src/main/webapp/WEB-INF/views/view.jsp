<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View Converted Image</title>
</head>
<body>
<h1>View Converted Image</h1>
<img src="data:image/jpeg;base64,${base64Image}" alt="Dicom Image">
<br><br>
<%--<a th:href="@{/download}" download="converted_image.jpg">Download Converted Image</a>--%>
</body>
</html>
