<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>WebViewer</title>
</head>
<body>

<div class="container flex">
    <div class="sideBar flex">
        <div class="menuWrap flex">

        </div>
        <div class="settingWrap flex">

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
                            <button onclick="loadData()">
                                검색
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="search_count">

            </div>
            <table class="searchList">
                <tr>
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
            <table class="previousList">
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
</html>
