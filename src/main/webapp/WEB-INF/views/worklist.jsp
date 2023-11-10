<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
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
    <div class="sideBar">
        <div class="sideMenu-wrap">
            <div>
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AccountCircleIcon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"></path>
                </svg>
                <span class="hospital">DICOM</span>
            </div>
            <div class="MuiBox-root css-0">
                <div class="icon MuiBox-root css-0">
                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddToPhotosIcon">
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path>
                    </svg>
                </div>
                <span class="thumbnailBox ">세부검색</span>
            </div>
        </div>
        <div class="sideSetting-wrap">
            <div class="sideMenu-btn" id="setting">
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SettingsIcon">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
                </svg>
            </div>

            <div class="sideMenu-btn" id="logout">
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1sc7qhc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LogoutIcon">
                    <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path>
                </svg>
            </div>
        </div>
    </div>

    <div class="mainBox flex">
        <div class="listBox flex">
            <div class="searchBox">
                <div class="header" id="search_header">
                    <h3>검색</h3>
                </div>
                <div class="searchWrap">
                    <div class="searchInner">
                        <label for="input_patient_id" id="patient_id_label">
                            <input type="text" id="input_patient_id">
                        </label>
                    </div>
                    <div class="searchInner">
                        <label for="input_patient_name" id="patient_name_label">
                            <input type="text" id="input_patient_name">
                        </label>
                    </div>
                    <div class="searchInner" id="reading_Status">

                    </div>
                    <div class="searchIconWrap">
                        <div class="searchIcon" id="search_allTime">

                        </div>
                        <div class="searchIcon" id="search_oneDay">

                        </div>
                        <div class="searchIcon" id="search_threeDay">

                        </div>
                        <div class="searchIcon" id="search_oneWeek">

                        </div>
                        <div class="searchIcon" id="search_reset">

                        </div>
                        <div class="searchIcon" id="search_submit">
                            <button id="clickCount" >
                                검색
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="deleteBtnWrap">
                <button onclick="deleteData()">검사 삭제</button>
                <!--<button onclick="download()">다운로드</button>-->
            </div>
            <div id="search_count">
                <select id="selectPaging" onchange="selectPaging()">
                    <option value="8">8개씩</option>
                    <option value="16">16개씩</option>
                    <option value="24">24개씩</option>
                </select>
            </div>
            <div id="listScroll">
                <table class="searchList">
                    <tr>
                        <td><input type="checkbox" value='selectall' onclick="chkAll(this)" /></td>
                        <th>환자 아이디</th>
                        <th>환자 이름</th>
                        <th>검사 장비</th>
                        <th>검사 설명</th>
                        <th>검사 일시</th>
                        <th>판독 상태</th>
                        <th>시리즈</th>
                        <th>이미지</th>
                        <th>verify</th>
                    </tr>
                </table>
            </div>
            <div id="plusBtn">
                <button id="clickPaging">더보기 ▽</button>
            </div>
        </div>
        <div class="previousBox">
            <div class="header" id="previous_header">
                <h3>Previous</h3>
            </div>
            <div class="patientStatusWrap">
                <span>환자 아이디 :</span>
                <span id="patient_id"></span>
                <span>환자 이름 : </span>
                <span id="patient_name"></span>
            </div>
            <table class="previousList" border="1">
                <tr>
                    <th>검사 장비</th>
                    <th>검사 설명</th>
                    <th>검사 일시</th>
                    <th>판독 상태</th>
                    <th>시리즈</th>
                    <th>이미지</th>
                    <th>verify</th>
                </tr>
            </table>
        </div>
        <div class="reportBox">

        </div>
    </div>
</div>
<script src="/script/worklist.js"></script>
</body>

<%@ include file="include/footer.jsp" %>