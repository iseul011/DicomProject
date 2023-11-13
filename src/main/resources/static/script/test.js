getSeriesTab();

async function getDicomMetadata(arrayBuffer) {
    const byteArray = new Uint8Array(arrayBuffer);
    const dataSet = dicomParser.parseDicom(byteArray);

    return dataSet;
}


function displayDicomImage(arrayBuffer, seriesinsuid) {
    const uint8Array = new Uint8Array(arrayBuffer);
    const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }))}`;

    const viewportElement = document.createElement('div');
    viewportElement.classList.add('CSViewport');
    viewportElement.id = `viewport-${seriesinsuid}`;

    const dataSet = dicomParser.parseDicom(uint8Array);
    //alert(dataSet.string('x00100020'));
    const topLeft = document.createElement('div');
    topLeft.classList.add('topLeft');

    topLeft.innerHTML = `
        <span>${dataSet.string('x00100020')}</span>
        <span>${dataSet.string('x00100010')}</span>
        <span>${dataSet.string('x00100030')}</span>
        <span>${dataSet.string('x00200011')}</span>
        <span>${dataSet.string('x00200013')}</span>
        <span>${dataSet.string('x00080050')}</span>
        <span>${dataSet.string('x00080030')}</span>
    `;

    const topRight = document.createElement('div');
    topRight.classList.add('topRight');
    topRight.innerHTML = `
        <span>${dataSet.string('x00080070')}</span>
        <span>${dataSet.string('x00081090')}</span>
    `;

    const bottomRight = document.createElement('div');
    //<span>${dataSet.string('x00280010')} / ${dataSet.string('x00280011')}</span>
    bottomRight.classList.add('bottomRight');
    bottomRight.innerHTML = `
        <span>${Math.floor(dataSet.string('x00281051'))} / ${Math.floor(dataSet.string('x00281050'))}</span>
        <span>${dataSet.string('x00321032')}</span>
    `;

    const parentDiv = document.createElement('div');
    parentDiv.classList.add('parentDiv');

    viewportElement.appendChild(topLeft);
    viewportElement.appendChild(topRight);
    viewportElement.appendChild(bottomRight);
    parentDiv.appendChild(viewportElement);
    document.getElementById('dicomImageContainer').appendChild(parentDiv);

    cornerstone.enable(viewportElement);
    cornerstone.loadImage(imageId).then(image => {
        cornerstone.displayImage(viewportElement, image);
    });
}

async function viewDicom() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    try {
        let seriesTabList = await getSeriesTab();
        let cont = 4;

        for (let i = 0; i < cont; i++) {
            let item = seriesTabList[i];
            let directoryPath = await getImagePath(item.studykey, item.seriesinsuid);
            let response = await axios.get("/getDicomFile", {
                params: {
                    directoryPath: directoryPath
                },
                responseType: 'arraybuffer'
            });

            if (response.status === 200) {
                let arrayBuffer = response.data;
                const dataSet = await getDicomMetadata(arrayBuffer);
                displayDicomImage(arrayBuffer, item.seriesinsuid);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function getSeriesTab() {

    try {
        const pathArray = window.location.pathname.split('/');
        const studykey = 2;

        let response = await axios.get("/v1/storage/search/PacsSeriestab", {
            params: {
                studykey: studykey
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

viewDicom();



























