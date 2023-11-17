<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>WebViewer</title>
</head>
<link href="/style/pacs.css" rel="stylesheet" type="text/css"/>

<body>
<header>
    <button id="myButton">
        <img src="/img/logo_white.47988f1d7fe07963d2bb776adf9e2ade.png" alt="Logo">
    </button>
</header>
<script>
    var myButton = document.getElementById('myButton');

    myButton.addEventListener('click', function() {
        window.location.href = '/worklist';
    });
</script>