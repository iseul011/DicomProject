<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="https://unpkg.com/cornerstone-core@2.2.4/dist/cornerstone.js"></script>
<html>
<head>
    <title>WebViewer</title>
</head>
<body>
<div id="data-container" studykey="${studykey}" studyinsuid="${studyinsuid}" pid="${pid}"></div>
<h1>Viewer Page</h1>
<p>Study Key: ${studykey}</p>
<p>Study Instance UID: ${studyinsuid}</p>
<p>PID: ${pid}</p>
</body>
<script src="/script/viewer.js"></script>
</html>
