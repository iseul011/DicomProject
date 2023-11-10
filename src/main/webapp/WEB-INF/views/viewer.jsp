<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>WebViewer</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-core/dist/cornerstone.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-math@0.1.10/dist/cornerstoneMath.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-tools@6.0.10/dist/cornerstoneTools.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-web-image-loader@2.1.1/dist/cornerstoneWebImageLoader.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-wado-image-loader@4.13.2/dist/cornerstoneWADOImageLoader.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dicom-parser@1.8.21/dist/dicomParser.min.js"></script>

    <link href="/style/vierer.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<%@ include file="include/header.jsp" %>


<div class="container flex">
    <div class="sidebar flex flex-column flex-justify-space flex-align-center">
        <div class="sideMenu-wrap flex">
            <div class="sideMenu-btn flex flex-column flex-align-center" id="profile"></div>
            <div class="sideMenu-btn flex flex-column flex-align-center" id="morePInfo"></div>
            <div class="sideMenu-btn flex flex-column flex-align-center" id="advancedSearch"></div>
        </div>
        <div class="sideSetting-wrap flex">
            <div class="sideMenu-btn flex flex-column flex-align-center" id="setting"></div>
            <div class="sideMenu-btn flex flex-column flex-align-center" id="logout"></div>
        </div>
    </div>
    <div class="mainBox flex">
        <div class="viewerMenu">
            <button>
                <span>워크리스트</span>
            </button>
            <button>
                <span>이전</span>
            </button>
            <button>
                <span>다음</span>
            </button>
            <button>
                <span>Default tool</span>
            </button>
            <button>
                <span>윈도우 레벨</span>
            </button>
            <button>
                <span>흑백 반전</span>
            </button>
            <button>
                <span>이동</span>
            </button>
            <button>
                <span>스크롤 루프</span>
            </button>
            <button>
                <span>1시리즈</span>
            </button>
            <%--            <button id="brightnessButton">--%>
            <%--                <span>밝기 조절</span>--%>
            <%--            </button>--%>

        </div>

        <div class="contentBox">
            <div id="data-container" studykey="${studykey}" studyinsuid="${studyinsuid}" pid="${pid}"></div>
            <h1>Viewer Page</h1>
            <p>Study Key: ${studykey}</p>
            <p>Study Instance UID: ${studyinsuid}</p>
            <p>PID: ${pid}</p>
            <div id="dicomImageContainer"></div>
        </div>
    </div>
</div>
<%@ include file="include/footer.jsp" %>
<div id="dicomImage" style="width: 512px; height: 512px;"></div>

</body>
<script src="/script/cornerstoneTest.js"></script>
</html>




