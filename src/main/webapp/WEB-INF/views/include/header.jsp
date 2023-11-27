<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>WebViewer</title>
</head>
<%--<link href="/style/pacs.css" rel="stylesheet" type="text/css"/>--%>
<link href="/style/pacsTest.css" rel="stylesheet" type="text/css"/>

<body>
<header>
    <div class="homeButton">
        <img src="/img/Radiologic.png" alt="Logo">
    </div>
</header>
<script>
    let homeButton = document.querySelector(".homeButton")

    homeButton.addEventListener('click', function () {
        window.location.href = '/worklist';
    });
</script>