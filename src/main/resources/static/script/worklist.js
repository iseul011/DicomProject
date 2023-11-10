const searchSubmit = document.getElementById("search_submit");
searchSubmit.addEventListener('click', () => {
    number = 0;

    const searchList = document.querySelector(".searchListBody");
    searchList.innerHTML='';
    loadData();
});

const clickPaging = document.getElementById("clickPaging");
let number = 0;
clickPaging.addEventListener("click", () => {
    const searchList = document.querySelector(".searchListBody");
    searchList.innerHTML='';

    number += 8;
    loadData();
});


function loadData() {
    // 무한 스크롤
    const listScroll = document.getElementById("listScroll");

    let table = document.querySelector(".searchListBody");
    let rows = table.querySelectorAll("tr");

    let count = parseInt(selectPaging().value, 10) + parseInt(number, 10);

    axios.get("/v1/storage/search/PacsStudytab")
        .then(response => {
            const data = response.data;

            if(data.length < count) {
                count = data.length;
            }

            // foreach -> for
            for(let i=0; i<count; i++) {
                let row = table.insertRow(0);

                let chk = row.insertCell(0);
                let pid = row.insertCell(1);
                let pname = row.insertCell(2);
                let modality = row.insertCell(3);
                let studydesc = row.insertCell(4);
                let studydate = row.insertCell(5);
                let reportstatus = row.insertCell(6);
                let seriescnt = row.insertCell(7);
                let imagecnt = row.insertCell(8);
                let verify = row.insertCell(9);

                row.addEventListener('click', function () {
                    loadPrevious(data[i].pid, data[i].pname);
                });

                let checkbox = `<input type="checkbox" name="del" id="del" value="${data[i].pid}"/>`;
                row.className = "searchListBodyRow"
                chk.className = "searchListBodyColumnCenter"
                pid.className = "searchListBodyColumnLeft"
                pname.className = "searchListBodyColumnLeft"
                modality.className = "searchListBodyColumnCenter"
                studydesc.className = "searchListBodyColumnLeft"
                studydate.className = "searchListBodyColumnCenter"
                reportstatus.className = "searchListBodyColumnCenter"
                seriescnt.className = "searchListBodyColumnCenter"
                imagecnt.className = "searchListBodyColumnCenter"
                verify.className = "searchListBodyColumnCenter"

                chk.innerHTML = checkbox;
                pid.innerHTML = data[i].pid;
                pname.innerHTML = data[i].pname;
                modality.innerHTML = data[i].modality;
                studydesc.innerHTML = data[i].studydesc;
                studydate.innerHTML = data[i].studydate;
                reportstatus.innerHTML = data[i].reportstatus;
                seriescnt.innerHTML = data[i].seriescnt;
                imagecnt.innerHTML = data[i].imagecnt;
                verify.innerHTML = data[i].verifyflag;
            }

        });

}

function loadPrevious(pid, pname) {
    let table = document.querySelector(".previousList");
    let rows = table.querySelectorAll("tr");

    for (let i = 1; i < rows.length; i++) {
        rows[i].remove();
    }

    document.querySelector("#patient_id").innerHTML = pid;
    document.querySelector("#patient_name").innerHTML = pname;

    axios.get(`/v1/storage/search/PacsStudytab/${pid}`)
        .then(response => {
            const data = response.data;

            data.forEach(function (item) {

                let row = table.insertRow(1);
                let modality = row.insertCell(0);
                let studydesc = row.insertCell(1);
                let studydate = row.insertCell(2);
                let reportstatus = row.insertCell(3);
                let seriescnt = row.insertCell(4);
                let imagecnt = row.insertCell(5);
                let verify = row.insertCell(6);

                modality.innerHTML = item.modality;
                studydate.innerHTML = item.studydate;
                reportstatus.innerHTML = item.reportstatus;
                seriescnt.innerHTML = item.seriescnt;
                imagecnt.innerHTML = item.imagecnt;
                verify.innerHTML = item.verifyflag;

                row.addEventListener('click', function () {
                    window.location.href = `/viewer/${item.studykey}/${item.studyinsuid}/${item.pid}`;
                });
            });
        });
}

function chkAll(selectAll) {
    const checkboxes = document.getElementsByName('del');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    });
}

function deleteData() {
    const chk = 'input[name="del"]:checked';
    const selectedElements = document.querySelectorAll(chk);

    const selectedElementsCnt = selectedElements.length;
    const pid = new Array(selectedElementsCnt);

    document.querySelectorAll('input[name="del"]:checked').forEach(function(v, i) {
        pid[i] = v.value;
    });

    axios.post(`/v1/storage/delete`, pid, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (confirm("삭제 하시겠습니까?")) {
                alert("삭제 완료");
            } else {
                alert("리로드");
            }
        });
}

function selectPaging() {
    let select = document.getElementById("selectPaging");
    let option = select.options[select.selectedIndex];

    console.log(option.value);
    return option;
}

// function paging(item) {
//     let str = "";
//
//     str += `<table>`;
//     str += `<tr>item.</tr>`;
//     str += ``;
//     str += ``;
//     str += ``;
//     str += ``;
//     str += ``;
//     str += `</table>`;
// }

// function download() {
//     const chk = 'input[name="del"]:checked';
//     const selectedElements = document.querySelectorAll(chk);
//
//     const selectedElementsCnt = selectedElements.length;
//     const pid = new Array(selectedElementsCnt);
//
// }

