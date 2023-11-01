<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="http://localhost:9000/js/jquery-3.6.4.min.js"></script>

</head>
<body>
<form>
    <input type="text" name="path" value="dev\DCM-Sample4KDT\CT-Abdomen" >
    <input type="text" name="fname" value="1.3.12.2.1107.5.1.4.65266.30000018122721584475300010337.dcm" >
    <input type="button" onclick="imaget(form)">

    <div id="img"></div>

</form>
<script src="/script/test.js"></script>
</body>
</html>
