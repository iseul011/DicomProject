
function loadData() {
    let table = document.querySelector(".searchList");
    let rows = table.querySelectorAll("tr");


    let page = document.getElementById("paging");
    let count = 0;

    axios.get("/v1/storage/search/PacsStudytab")
        .then(response => {
            const data = response.data;
            data.forEach(function (item) {
                let row = table.insertRow(1);

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
                    loadPrevious(item.pid, item.pname);
                });

                let checkbox = `<input type="checkbox" name="del" id="del" value="${item.pid}"/>`;
                console.log(item.pid);
                chk.innerHTML = checkbox;

                pid.innerHTML = item.pid;
                pname.innerHTML = item.pname;
                modality.innerHTML = item.modality;
                studydesc.innerHTML = item.studydesc;
                studydate.innerHTML = item.studydate;
                reportstatus.innerHTML = item.reportstatus;
                seriescnt.innerHTML = item.seriescnt;
                imagecnt.innerHTML = item.imagecnt;
                verify.innerHTML = item.verifyflag;
            });
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

// function paging(item) {
//
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
//
// }

// function download() {
//     const chk = 'input[name="del"]:checked';
//     const selectedElements = document.querySelectorAll(chk);
//
//     const selectedElementsCnt = selectedElements.length;
//     const pid = new Array(selectedElementsCnt);
//
// }

