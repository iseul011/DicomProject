<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>WebViewer</title>
</head>
<body>
<%@ include file="include/header.jsp" %>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/cornerstone-core"></script>

<div class="container flex">
    <div class="sideBar flex">
        <div class="menuWrap flex">

        </div>
        <div class="settingWrap flex">

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

        </div>
        <div class="contentBox">
            <div id="data-container" studykey="${studykey}" studyinsuid="${studyinsuid}" pid="${pid}"></div>
            <h1>Viewer Page</h1>
            <p>Study Key: ${studykey}</p>
            <p>Study Instance UID: ${studyinsuid}</p>
            <p>PID: ${pid}</p>
            <div id="img"></div>
            <canvas id="imageCanvas" width="400" height="300"></canvas>
        </div>
    </div>
</div>
<%@ include file="include/footer.jsp" %>
</body>
<script src="/script/test.js"></script>
</html>




