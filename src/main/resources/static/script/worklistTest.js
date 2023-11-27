const clickCount = document.getElementById("search_submit");
const searchTable = document.querySelector(".searchListBody");

let number = 0;
let rowNumber = 0;
let column = '';
let order = true;
let pidValue = null;
let pNameValue = null;
let reportStatusValue = 0;
let searchListData;

function searchList() {
    const getPid = document.getElementById("input_patient_id");
    const getPName = document.getElementById("input_patient_name");
    const getReport_Status = document.getElementById("report_Status");

    pidValue = getPid.value;
    pNameValue = getPName.value;
    reportStatusValue = getReport_Status.value;
    selectPaging();
    resetSearchTable();

}

async function resetSearchTable() {
    await getSearchListData();
    printTotalCount()
    createMoreCountButton();
    deleteMoreCountButton();
}

function selectPaging() {
    rowNumber = 0;
    let select = document.getElementById("selectPaging");
    number = parseInt(select.options[select.selectedIndex].value);
}

async function getSearchListData() {
    searchTable.innerHTML = '';

    const response = await axios.get("/v1/storage/search/PacsStudytab/searchList", {
        params: {
            column: column,
            order: order,
            pidValue: pidValue,
            pNameValue: pNameValue,
            reportStatusValue: reportStatusValue
        }
    });

    searchListData = response.data;

    overCount();

    for (let i = 0; i < number; i++) {
        printSearchTable(searchListData[i]);
    }
}

function printTotalCount() {
    const totalCount = document.querySelector(".totalCases");

    totalCount.innerHTML = `<p>총 검사 건수: ${number}</p>`;

}

function printSearchTable(data) {
    let reportStatusString = transReportStatus(data.reportstatus);

    let row = searchTable.insertRow(rowNumber++);
    let chk = row.insertCell(0);
    let pid = row.insertCell(1);
    let pname = row.insertCell(2);
    let modality = row.insertCell(3);
    let studydesc = row.insertCell(4);
    let studydate = row.insertCell(5);
    let reportstatus = row.insertCell(6);
    let AIScore = row.insertCell(7);
    let seriescnt = row.insertCell(8);
    let imagecnt = row.insertCell(9);
    let verify = row.insertCell(10);

    row.addEventListener('click', function () {
        loadPrevious(data.pid);
    });

    let checkbox = `<input type="checkbox" class="checkbox" name="checkbox" value="${data.studykey}"/>`;
    row.className = "searchListBodyRow"
    chk.className = "searchListCheckBox"
    pid.className = "searchListBodyColumnLeft"
    pname.className = "searchListBodyColumnLeft"
    modality.className = "searchListBodyColumnCenter"
    studydesc.className = "searchListBodyColumnLeft"
    studydate.className = "searchListBodyColumnCenter"
    reportstatus.className = "searchListBodyColumnCenter"
    AIScore.className = "searchListBodyColumnCenter"
    seriescnt.className = "searchListBodyColumnCenter"
    imagecnt.className = "searchListBodyColumnCenter"
    verify.className = "searchListBodyColumnCenter"

    chk.innerHTML = checkbox;
    pid.innerHTML = data.pid;
    pname.innerHTML = data.pname;
    modality.innerHTML = data.modality;
    studydesc.innerHTML = data.studydesc;
    studydate.innerHTML = data.studydate;
    reportstatus.innerHTML = reportStatusString;
    AIScore.innerHTML = data.ai_score;
    seriescnt.innerHTML = data.seriescnt;
    imagecnt.innerHTML = data.imagecnt;
    verify.innerHTML = data.verifyflag;
}

function createMoreCountButton() {
    const moreCountButtonWrap = document.querySelector(".moreCountButtonWrap");
    moreCountButtonWrap.innerHTML =
        `<button class="moreCountButton" onclick="printMore()">더 보기
            <svg class="moreCountButtonIcon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ExpandMoreIcon">
                <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            </svg>
        </button>`;
}

function deleteMoreCountButton() {
    if (number === searchListData.length) {
        const moreCountButtonWrap = document.querySelector(".moreCountButtonWrap");
        moreCountButtonWrap.innerHTML = ``;
    }
}

function printMore() {
    number += 10;
    overCount();
    for (let i = rowNumber; i < number; i++) {
        printSearchTable(searchListData[i])
    }


    printTotalCount();
    deleteMoreCountButton();
}

function overCount() {
    if (searchListData.length < number) {
        number = searchListData.length;
    }
}

function loadPrevious(pid) {
    // 클릭한 row의 다음에 tr을 추가합니다.
    const clickedRow = event.currentTarget;
    let previousTable;
    const nextRow = clickedRow.parentNode.rows[clickedRow.rowIndex];
    let previousListRow;

    if (nextRow && nextRow.classList.contains('previousListRow')) {
        nextRow.remove();
    } else {
        previousTable = document.createElement('table');
        previousTable.className = 'previousListTable';

        // previousListDiv 안에 바로 테이블을 추가합니다.
        const previousDiv = document.createElement('div');
        previousDiv.className = 'previousListDiv';
        previousDiv.appendChild(previousTable);

        const td = document.createElement('td');
        td.colSpan = 11;
        td.className = "previousListBox"
        td.appendChild(previousDiv);

        const newRow = clickedRow.parentNode.insertRow(clickedRow.rowIndex);
        newRow.className = 'previousListRow';
        newRow.appendChild(td);

        // 클릭한 row 다음에 추가된 previousListRow에 데이터를 채워넣는 함수
        function fillPreviousTable(data) {
            let reportStatusString = transReportStatus(data.reportstatus);

            let row = previousTable.insertRow(-1);
            let thumbnailBox = row.insertCell(0);
            let modality = row.insertCell(1);
            let studydesc = row.insertCell(2);
            let studydate = row.insertCell(3);
            let reportstatus = row.insertCell(4);
            let AIScore = row.insertCell(5);
            let seriescnt = row.insertCell(6);
            let imagecnt = row.insertCell(7);
            let verify = row.insertCell(8);

            thumbnailBox.classList = "thumbnailBox";
            modality.classList = "previousListNormal searchListBodyColumnCenter"
            studydesc.classList = "previousListLong searchListBodyColumnLeft"
            studydate.classList = "previousListNormal searchListBodyColumnCenter"
            reportstatus.classList = "previousListNormal searchListBodyColumnCenter"
            AIScore.classList = "previousListNormal searchListBodyColumnCenter"
            seriescnt.classList = "previousListShort searchListBodyColumnCenter";
            imagecnt.classList = "previousListShort searchListBodyColumnCenter"
            verify.classList = "previousListShort searchListBodyColumnCenter"

            getThumbnail(thumbnailBox, data.studykey)
            modality.innerHTML = data.modality;
            studydesc.innerHTML = data.studydesc;
            studydate.innerHTML = data.studydate;
            reportstatus.innerHTML = reportStatusString;
            AIScore.innerHTML = data.ai_score;
            seriescnt.innerHTML = data.seriescnt;
            imagecnt.innerHTML = data.imagecnt;
            verify.innerHTML = data.verifyflag;

            row.addEventListener('click', function () {
                window.location.href = `/viewer/${data.studykey}/${data.studyinsuid}/${data.pid}`;
            });
        }

        axios.get(`/v1/storage/search/PacsStudytab/searchByPid`, {
            params: {
                pid: pid
            }
        })
            .then(response => {
                const data = response.data;
                data.forEach(fillPreviousTable);
            });
    }
}

function getThumbnail(thumbnailBox, studykey) {
    axios.get(`/v1/storage/getImage`, {
        params: {
            studykey: studykey,
            serieskey: 1
        },
    })
        .then(response => {
            const thumbnailWrap = document.createElement('div');
            thumbnailWrap.classList = "thumbnailWrap"
            const thumbnail = document.createElement('img');
            thumbnail.src = `data:image/jpeg;base64,${response.data}`;
            thumbnail.alt = 'Thumbnail';

            thumbnailWrap.appendChild(thumbnail);
            thumbnailBox.appendChild(thumbnailWrap)
        })
        .catch(error => {
            console.error(error);
        });
}

function chkAll() {
    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach((checkbox) => {
        checkbox.checked = !checkbox.checked;
    });
}


function sortTable(input) {
    rowNumber = 0;
    if (column === input) {
        order = !order;
    } else {
        column = input
        order = true
    }
    resetSearchTable();
}

function addFocusStyle(id) {
    let inputWrap;
    if (id === "input_patient_id") {
        inputWrap = document.getElementById("pIdWrap");
        inputWrap.classList.add("focused");
    } else if (id === "input_patient_name") {
        inputWrap = document.getElementById("pNameWrap");
        inputWrap.classList.add("focused");
    }
}

function removeFocusStyle(id) {
    let inputWrap;
    if (id === "input_patient_id") {
        inputWrap = document.getElementById("pIdWrap");
        inputWrap.classList.remove("focused");
    } else if (id === "input_patient_name") {
        inputWrap = document.getElementById("pNameWrap");
        inputWrap.classList.remove("focused");
    }
}

function transReportStatus(reportStatus) {
    if (reportStatus === 2) {
        return "열람 중"
    } else if (reportStatus === 3) {
        return "읽지 않음"
    } else if (reportStatus === 4) {
        return "예비 판독"
    } else if (reportStatus === 5) {
        return "판독 완료"
    }
}

async function downloadDicomFiles() {
    const selectedStudyKeys = getSelectedStudyKeys();
    for (const studykey of selectedStudyKeys) {
        let seriesTabList = await getSeriesTab(studykey);

        for (let i = 0; i < seriesTabList.length; i++) {
            let item = seriesTabList[i];
            let directoryPaths = await getImagePath(item.studykey, item.seriesinsuid);
            directoryPaths.forEach(directoryPath => {
                axios({
                    method: 'get',
                    url: `/getDicomDownloadPath`,
                    params: {
                        directoryPath: encodeURIComponent(directoryPath)
                    },
                    responseType: 'arraybuffer'
                })
                    .then(response => {
                        const contentDisposition = response.headers.get('content-disposition');
                        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                        const fileName = fileNameMatch ? fileNameMatch[1] : 'downloadedFile';
                        var link = document.createElement('a');
                        var blob = new Blob([response.data], {type: 'application/dicom'});
                        link.href = window.URL.createObjectURL(blob);
                        link.download = fileName
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    });
            });
        }
    }
}


async function getSeriesTab(studykey) {
    try {
        const response = await axios.get("/v1/storage/search/PacsSeriestab", {
            params: {
                studykey: studykey // 여러 studykey를 콤마로 구분하여 전달
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

async function getImagePath(studykey, seriesinsuid) {
    try {
        let response = await axios.get("/getImagePath", {
            params: {
                studykey: studykey,
                seriesinsuid: seriesinsuid
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

function getSelectedStudyKeys() {
    const selectedRows = document.querySelectorAll('.searchListBodyRow input[type="checkbox"]:checked');
    return Array.from(selectedRows).map(row => row.value);
}