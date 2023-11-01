function loadData() {
    let table = document.querySelector(".searchList");
    let rows = table.querySelectorAll("tr");
    for (let i = 1; i < rows.length; i++) {
        rows[i].remove();
    }
    fetch("/v1/storage/search/PacsStudytab")
        .then(res => res.json())
        .then(json => json.forEach(function (item) {
            let row = table.insertRow(1);
            let pid = row.insertCell(0);
            let pname = row.insertCell(1);
            let modality = row.insertCell(2);
            let studydesc = row.insertCell(3);
            let studydate = row.insertCell(4);
            let reportstatus = row.insertCell(5);
            let seriescnt = row.insertCell(6);
            let imagecnt = row.insertCell(7);
            let verify = row.insertCell(8);

            row.addEventListener('click', function () {
                loadPrevious(item.pid, item.pname);
            });



            pid.innerHTML = item.pid;
            pname.innerHTML = item.pname;
            modality.innerHTML = item.modality;
            studydesc.innerHTML = item.studydesc;
            studydate.innerHTML = item.studydate;
            reportstatus.innerHTML = item.reportstatus;
            seriescnt.innerHTML = item.seriescnt;
            imagecnt.innerHTML = item.imagecnt;
            verify.innerHTML = item.verifyflag;
        }))

}

function loadPrevious(pid, pname) {
    let table = document.querySelector(".previousList");
    let rows = table.querySelectorAll("tr");
    for (let i = 1; i < rows.length; i++) {
        rows[i].remove();
    }
    document.querySelector("#patient_id").innerHTML = pid;
    document.querySelector("#patient_name").innerHTML = pname;

    fetch(`/v1/storage/search/PacsStudytab/${pid}`)
        .then(res => res.json())
        .then(json =>
            json.forEach(function (item) {
                let row = table.insertRow(1);
                let modality = row.insertCell(0);
                let studydesc = row.insertCell(1);
                let studydate = row.insertCell(2);
                let reportstatus = row.insertCell(3);
                let seriescnt = row.insertCell(4);
                let imagecnt = row.insertCell(5);
                let verify = row.insertCell(6);

                modality.innerHTML = item.modality;
                studydesc.innerHTML = item.studydesc;
                studydate.innerHTML = item.studydate;
                reportstatus.innerHTML = item.reportstatus;
                seriescnt.innerHTML = item.seriescnt;
                imagecnt.innerHTML = item.imagecnt;
                verify.innerHTML = item.verifyflag;

                row.addEventListener('click', function () {
                    window.location.href = `/viewer/${item.studykey}/${item.studyinsuid}/${item.pid}`;
                });
            }))
}


