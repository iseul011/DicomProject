<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>WebViewer</title>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-core/dist/cornerstone.js"></script>
    <script src="https://unpkg.com/cornerstone-core/dist/cornerstone.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-math@0.1.10/dist/cornerstoneMath.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-tools@6.0.10/dist/cornerstoneTools.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-web-image-loader@2.1.1/dist/cornerstoneWebImageLoader.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cornerstone-wado-image-loader@4.13.2/dist/cornerstoneWADOImageLoader.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dicom-parser@1.8.21/dist/dicomParser.min.js"></script>
    <link href="/style/viewer.css" rel="stylesheet" type="text/css"/>
    <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

</head>
<body>
<%@ include file="include/header.jsp" %>

<div class="container">
    <div class="sideBar">
        <div class="sideMenu-wrap">
            <div>
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AccountCircleIcon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"></path>
                </svg>
                <span class="hospital">
                     <sec:authentication property="name"/>
                </span>
            </div>

            <div class="MuiBox-root css-0">
                <div class="icon" onclick="thumbnailBox()">
                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddToPhotosIcon">
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path>
                    </svg>
                </div>
                <span class="thumbnailBox">썸네일</span>


                <div class="icon active">
                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="HandymanIcon">
                        <path d="m21.67 18.17-5.3-5.3h-.99l-2.54 2.54v.99l5.3 5.3c.39.39 1.02.39 1.41 0l2.12-2.12c.39-.38.39-1.02 0-1.41z"></path>
                        <path d="m17.34 10.19 1.41-1.41 2.12 2.12c1.17-1.17 1.17-3.07 0-4.24l-3.54-3.54-1.41 1.41V1.71l-.7-.71-3.54 3.54.71.71h2.83l-1.41 1.41 1.06 1.06-2.89 2.89-4.13-4.13V5.06L4.83 2.04 2 4.87 5.03 7.9h1.41l4.13 4.13-.85.85H7.6l-5.3 5.3c-.39.39-.39 1.02 0 1.41l2.12 2.12c.39.39 1.02.39 1.41 0l5.3-5.3v-2.12l5.15-5.15 1.06 1.05z"></path>
                    </svg>
                </div>
                <span class="toolBox">툴바</span>

                <div class="icon">
                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LibraryBooksIcon">
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"></path>
                    </svg>
                </div>
                <span class="reportModal">리포트</span>

            </div>
        </div>

        <div class="sideSetting-wrap">
            <div class="sideMenu-btn" id="setting">
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SettingsIcon">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
                </svg>
            </div>

            <div class="sideMenu-btn" id="logout">
                <a href="/logout">
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LogoutIcon">
                    <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path>
                </svg>
                </a>
            </div>

        </div>

    </div>

    <div class="mainBox">
        <div class="mainMenu">
            <ul class="viewerMenu">
                <button>
                    <img src="/img/worklist.0c26b996e226a3db09e77ef62d440241.png">
                    <span>워크리스트</span>
                </button>

                <button>
                    <img src="/img/previous_study.3cb78eecd6d2385b44cb9176ba1fc87c.png">
                    <span>이전</span>
                </button>

                <button>
                    <img src="/img/next_study.09fbf5daceba6ace2519e74bde2e8420.png">
                    <span>다음</span>
                </button>

                <button class="default" onclick="toggleOverlayCanvas()">
                    <img src="/img/default.fa9b027b98a164fb3b5849c0d3ca39ca.png">
                    <span>Default tool</span>
                </button>

                <button class="wwwc" onclick="toggleWwwcTool()">
                    <img src="/img/wwwc.1cc5a0ecda9fd93a085688cedaa8a78b.png">
                    <span>윈도우 레벨</span>
                </button>

                <button class="invert" id="invertButton">
                    <img src="/img/invert.ede51ece1c3d447e625c3191b6a2af9c.png">
                    <span>흑백 반전</span>
                </button>

                <button class="pan" onclick="togglePanTool()">
                    <img src="/img/pan.47e8cd9f65cf64c8f2fb3d08c6f205ab.png">
                    <span>이동</span>
                </button>

                <button class="scrollLoop">
                    <img src="/img/scrollloop.5508766fa02ed78f41fbf1381d8329e4.png">
                    <span>스크롤 루프</span>
                </button>

                <button class="oneSeriesImage">
                    <img src="/img/changeImageLayout.2294818a3aa0403736162eb1a10a89b7.png">
                    <span>1시리즈</span>
                </button>

                <button class="comparisonCheck">
                    <img src="/img/comparison.07c6226e96a236664e9ac4c5ff078c44.png">
                    <span>비교검사</span>
                </button>

                <button class="playclip">
                    <img src="/img/play.6f437ab2591fe6a6c319e7e77f01df3e.png">
                    <span>플레이 클립</span>
                </button>
                <div>
                    <button class="toolModalParent" onclick="toggleToolModal('toolModalChildren')">
                        <div>
                            <img src="/img/tools.2d1068915b14d4ae8a087ca1036b65b2.png" data-tool="8">
                            <svg viewBox="0 0 1030 638" width="10">
                                <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#FFF"></path>
                            </svg>
                        </div>
                        <span>도구</span>
                        <div id="toolModalChildren" class="toolModalChildren displayNone">
                            <div>
                                <div data-tool="magnify" class="currentTool magnify" data-parent="tools" onclick="toggleMagnifyTool()">
                                    <img src="/img/magnify.233d000e41a3ad1cf9707d94950e6158.png" data-tool="magnify" data-parent="tools">
                                    <span data-tool="magnify" data-parent="tools">돋보기</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="zoom" class="currentTool zoom" data-parent="tools" onclick="toggleZoomTool()">
                                    <img src="/img/zoom.b259899b24b710fa9f31e433cc5b4e7e.png" data-tool="zoom" data-parent="tools">
                                    <span data-tool="zoom" data-parent="tools">확대/축소</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="rotate" class="currentTool rotate" data-parent="tools" onclick="setupRotateTool()">
                                    <img src="/img/rotate.94c480f210401d6f6adabcf17115d1e5.png" data-tool="rotate" data-parent="tools">
                                    <span data-tool="rotate" data-parent="tools">회전</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="rightRotate" class="currentTool rightRotate" data-parent="tools" >
                                    <img src="/img/rightRotate.053a9e994df6b6be59bb0c3d702741e6.png" data-tool="rightRotate" data-parent="tools">
                                    <span data-tool="rightRotate" data-parent="tools">오른쪽 회전</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="leftRotate" class="currentTool leftRotate" data-parent="tools" >
                                    <img src="/img/leftRotate.8a64a37656bf3e1a3eba2c1d82b98c7d.png" data-tool="leftRotate" data-parent="tools">
                                    <span data-tool="leftRotate" data-parent="tools">왼쪽 회전</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="horizontalFlip" class="currentTool horizontalFlip" data-parent="tools" >
                                    <img src="/img/hFlip.80d6a0b3bd0b788f42da409f5d115877.png" data-tool="horizontalFlip" data-parent="tools">
                                    <span data-tool="horizontalFlip" data-parent="tools">수평 뒤집기</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="verticalFlip" class="currentTool verticalFlip" data-parent="tools" >
                                    <img src="/img/vFlip.1a75c203d6207c94829eb64a96bf952b.png" data-tool="verticalFlip" data-parent="tools">
                                    <span data-tool="verticalFlip" data-parent="tools">수직 대칭 이동</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="Crosshairs" class="currentTool Crosshairs" data-parent="tools">
                                    <img src="/img/crossHairs.9132d282e7ad1ca57623c0d0bfe543a5.png" data-tool="Crosshairs" data-parent="tools">
                                    <span data-tool="Crosshairs" data-parent="tools">Crosshairs</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="referenceLine" class="currentTool referenceLine" data-parent="tools">
                                    <img src="/img/referenceLine.ba6d43bced93ff634d34a2e98cdf9f6f.png" data-tool="referenceLine" data-parent="tools">
                                    <span data-tool="referenceLine" data-parent="tools">참조 선</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
                <div>
                    <button class="toolModalParent" onclick="toggleToolModal('toolModalChildren2')">
                        <div>
                            <img src="/img/annotation.19ee74cd3ecff2134a423009b58463aa.png" data-tool="9">
                            <svg viewBox="0 0 1030 638" width="10">
                                <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#FFF"></path>
                            </svg>
                        </div>
                        <span>주석</span>
                        <div class="toolModalChildren2 displayNone">
                            <div>
                                <div data-tool="angle" class="currentTool angle" data-parent="annotation" onclick="setupAngleTool()">
                                    <img src="/img/angle.1e52dac1b36046ae8e3b17f7212d09e3.png" data-tool="angle" data-parent="annotation">
                                    <span data-tool="angle" data-parent="annotation">각도</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="arrowAnnotate" class="currentTool arrowAnnotate" data-parent="annotation" onclick="setupArrowAnnotateTool()">
                                    <img src="/img/arrowAnnotate.3b3e8aff47cbcad5127d6ef07404f4e3.png" data-tool="arrowAnnotate" data-parent="annotation">
                                    <span data-tool="arrowAnnotate" data-parent="annotation">화살표</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="probe" class="currentTool probe" data-parent="annotation" onclick="setupProbeTool()">
                                    <img src="/img/probe.c1bbaff5b3a138e4d0a91ed67b54bc2d.png" data-tool="probe" data-parent="annotation">
                                    <span data-tool="probe" data-parent="annotation">Probe</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="length" class="currentTool length" data-parent="annotation" onclick="setupLengthTool()">
                                    <img src="/img/length.62b344c23d7eb391d08d2ece39f69926.png" data-tool="length" data-parent="annotation">
                                    <span data-tool="length" data-parent="annotation">길이</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="rectangleROI" class="currentTool rectangleROI" data-parent="annotation" onclick="setupRectangleRoiTool()">
                                    <img src="/img/rectangleROI.6d28dc65ff156314a3f7679742611563.png" data-tool="rectangleROI" data-parent="annotation">
                                    <span data-tool="rectangleROI" data-parent="annotation">사각형 그리기</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="ellipticalROI" class="currentTool ellipticalROI" data-parent="annotation" onclick="setupEllipticalRoiTool()">
                                    <img src="/img/ellipticalROI.75a48af081b131624797edd4373c1b22.png" data-tool="ellipticalROI" data-parent="annotation">
                                    <span data-tool="ellipticalROI" data-parent="annotation">원 그리기</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="freeHand" class="currentTool freeHand" data-parent="annotation" onclick="setupFreehandRoiTool()">
                                    <img src="/img/freeHand.ccc90ff2cacb2a39f092e59689485f92.png" data-tool="freeHand" data-parent="annotation">
                                    <span data-tool="freeHand" data-parent="annotation">자율 그리기</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="bidirectional" class="currentTool bidirectional" data-parent="annotation" onclick="setupBidirectionalTool()">
                                    <img src="/img/bidirectional.9a08aab170feb4e1ede185075f4fdaa6.png" data-tool="bidirectional" data-parent="annotation">
                                    <span data-tool="bidirectional" data-parent="annotation">Bidirectional</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="cobbAngle" class="currentTool cobbAngle" data-parent="annotation" onclick="setupCobbAngleTool()">
                                    <img src="/img/cobbAngle.1b412c3001b7d430c1064115fe845d79.png" data-tool="cobbAngle" data-parent="annotation">
                                    <span data-tool="cobbAngle" data-parent="annotation">콥 각도</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="TextMarker" class="currentTool textMarker" data-parent="annotation" onclick="setupTextMarkerTool()">
                                    <img src="/img/textMarker.c203289c93466e8a10569367935d8b07.png" data-tool="TextMarker" data-parent="annotation">
                                    <span data-tool="TextMarker" data-parent="annotation">텍스트 마커</span>
                                </div>
                            </div>

                            <div>
                                <div data-tool="eraser" class="currentTool eraser" data-parent="annotation">
                                    <img src="/img/eraser.bf8a01d63d3fddbbe86da109fdaa188b.png" data-tool="eraser" data-parent="annotation">
                                    <span data-tool="eraser" data-parent="annotation">선택 삭제</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
                <div>
                    <button class="toolModalParent" id="resetButton">
                        <div><img src="/img/refresh.6a8fba2767a97749fd00e3e6f59935f3.png" data-tool="10">
                            <svg viewBox="0 0 1030 638" width="10">
                                <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#FFF"></path>
                            </svg>
                        </div>
                        <span>재설정</span>
                    </button>
                </div>
                <button id="toggleButton">
                    <div>
                        <img src="/img/changeSeriesLayout.6c2935a8c5a52c722e1055e79e316d58.png">
                        <svg viewBox="0 0 1030 638" width="10">
                            <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#FFF"></path>
                        </svg>
                    </div>
                    <span>Series</span>
                </button>

                <button class="disable">
                    <div>
                        <img src="/img/changeSeriesLayout.6c2935a8c5a52c722e1055e79e316d58.png">
                        <svg viewBox="0 0 1030 638" width="10">
                            <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#FFF"></path>
                        </svg>
                    </div>
                    <span>이미지레이아웃</span>
                </button>
            </ul>

            <div class="contentBox">
                <!-- 썸네일 -->
                <div class="thumbnail">
                </div>

                <div class="wadoBox" id="dicomImageContainer">

                </div>
            </div>
        </div>

    </div>
</div>
<%@ include file="include/footer.jsp" %>

<%--<script src="/script/viPhs.js"></script>--%>
<script src="/script/viewer.js"></script>
<%--<script src="/script/cornerstoneTest.js"></script>--%>
<script src="/script/vietools.js"></script>

</body>



</html>




