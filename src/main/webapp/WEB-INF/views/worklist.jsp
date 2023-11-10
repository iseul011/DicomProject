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
<link href="/style/worklist.css" rel="stylesheet" type="text/css"/>

<div class="container">
    <div class="sideBar">
        <div class="sideMenu-wrap">
            <div class="sideMenu-btn" id="profile"></div>
            <div class="sideMenu-btn" id="morePInfo"></div>
            <div class="sideMenu-btn" id="advancedSearch"></div>
        </div>
        <div class="sideSetting-wrap">
            <div class="sideMenu-btn" id="setting"></div>
            <div class="sideMenu-btn" id="logout"></div>
        </div>
    </div>

    <div class="mainBox ">
        <div class="sideBox">
            <div class="sideBoxWrap advancedSearch">
                <div class="calender">

                </div>
                <div class="date">

                </div>
                <div class="modality">

                </div>
                <div class="submitWrap">
                    <input type="submit" value="조회">
                    <input type="button" value="재설정">
                </div>
            </div>
            <div class="sideBoxWrap morePInfo">

            </div>
        </div>
        <div class="listBox">
            <div class="totalList">
                <div class="searchBox">
                    <div class="header" id="search_header">
                        <h3>검색</h3>
                    </div>
                    <div class="searchWrap">
                        <div class="searchInner">
                            <div class="inputBox">
                                <div class="inputWrap">
                                    <div class="inputInner">
                                        <label for="input_patient_id" id="patient_id_label">
                                            <input class="searchInput" type="text" id="input_patient_id"
                                                   placeholder="환자 아이디">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="inputBox">
                                <div class="inputWrap">
                                    <div class="inputInner">
                                        <label for="input_patient_name" id="patient_name_label">
                                            <input class="searchInput" type="text" id="input_patient_name"
                                                   placeholder="환자 이름">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="inputBox">
                                <div class="inputWrap">
                                    <div class="inputInner" id="reading_Status">
                                        <ul>

                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="searchIcon iconFirst" id="search_allTime">
                                전체
                            </div>
                            <div class="searchIcon" id="search_oneDay">
                                1일
                            </div>
                            <div class="searchIcon" id="search_threeDay">
                                3일
                            </div>
                            <div class="searchIcon" id="search_oneWeek">
                                1주일
                            </div>
                            <div class="searchIcon" id="search_reset">
                                재설정
                            </div>
                            <div class="searchIcon iconLast" id="search_submit">
                                검색
                            </div>
                        </div>
                    </div>
                </div>
                <div class="listSetBox">
                    <span class="totalCases"></span>
                    <div class="listSetWrap">
                        <button class="downloadButton" onclick="download()">다운로드
                            <svg class="listSetIcon" focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                 data-testid="DownloadIcon">
                                <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"></path>
                            </svg>
                        </button>
                        <button class="deleteButton" onclick="deleteData()">검사 삭제
                            <svg class="listSetIcon" focusable="false"
                                 aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteForeverIcon">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
                            </svg>
                        </button>
                        <div class="searchListCount" id="search_count">
                            <select id="selectPaging" onchange="selectPaging()">
                                <option value="10">10개씩 보기</option>
                                <option value="20">20개씩 보기</option>
                                <option value="50">50개씩 보기</option>
                            </select>
                            <svg class="searchListCountIcon" focusable="false"
                                 aria-hidden="true" viewBox="0 0 24 24" data-testid="MoreHorizIcon">
                                <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="searchListBox" id="listScroll">
                    <table class="searchList">
                        <thead class="searchListHead">
                        <tr class="searchListHeadRow">
                            <th class="searchListHeadCheck"><input type="checkbox" value='selectall' onclick="chkAll(this)"></th>
                            <th class="searchListHeadShort">환자 아이디</th>
                            <th class="searchListHeadShort">환자 이름</th>
                            <th class="searchListHeadShort">검사 장비</th>
                            <th class="searchListHeadLong">검사 설명</th>
                            <th class="searchListHeadShort">검사 일시</th>
                            <th class="searchListHeadShort">판독 상태</th>
                            <th class="searchListHeadShorter">시리즈</th>
                            <th class="searchListHeadShorter">이미지</th>
                            <th class="searchListHeadShorter">verify</th>
                        </tr>
                        </thead>
                        <tbody class="searchListBody">

                        </tbody>
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
</div>
<script src="/script/worklist.js"></script>
</body>

<%@ include file="include/footer.jsp" %>