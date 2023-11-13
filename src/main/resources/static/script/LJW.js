viewDicom();


function displayDicomImage(arrayBuffer, seriesinsuid) {
    const byteArray = new Uint8Array(arrayBuffer);
    
    const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }))}`;

    const viewportElement = document.createElement('div');
    viewportElement.classList.add('CSViewport');
    viewportElement.id = `viewport-${seriesinsuid}`;

    //addMouseWheelEventListener(viewportElement);

    const dataSet = dicomParser.parseDicom(byteArray);
    
    //alert(dataSet.string('x00100020'));
    const topLeft = document.createElement('div');
    topLeft.classList.add('topLeft');

    topLeft.innerHTML = `
        <span>${dataSet.string('x00100020')}</span>
        <span>${dataSet.string('x00100010')}</span>
        <span>${dataSet.string('x00100030')}</span>
        <span>${dataSet.string('x00200011')}</span>
        <span>${dataSet.string('x00200013')}</span>
        <span>${dataSet.string('x00080020')}</span>
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
        let cont = 1;
        for (let i = 0; i < seriesTabList.length; i++) {
            let items = seriesTabList[i].seriesnum;
            console.log(items);

        }

        for (let i = 0; i < cont; i++) {
            let item = seriesTabList[i];

            console.log("seriesnum : "+item.seriesnum);
            let directoryPath = await getImagePath(item.studykey, item.seriesnum);
            console.log(directoryPath[0]);
            for(let y=0; y<directoryPath.length; y++){
                let response = await axios.get("/getDicomFile", {
                    params: {
                        directoryPath: directoryPath[0]
                    },
                    responseType: 'arraybuffer'
                });

                if (response.status === 200) {
                    let arrayBuffer = response.data;
                    displayDicomImage(arrayBuffer, item.seriesinsuid);
                }

            }

        }

    } catch (error) {
        console.error(error);
    }
}

async function getSeriesTab() {

    try {
        const pathArray = window.location.pathname.split('/');
        //const studykey = pathArray[2];
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
async function getImagePath(studykey, seriesnum) {
    try {
        let response = await axios.get("/getImagePath", {
            params: {
                studykey: studykey,
                seriesnum: seriesnum
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}



// 마우스 휠 이벤트를 감지하고 해당하는 이미지를 표시하는 함수를 추가합니다.
function addMouseWheelEventListener(viewportElement) {
    viewportElement.addEventListener('wheel', function (event) {
        event.preventDefault();
        // 현재 뷰포트를 가져옵니다.
        const activeViewport = cornerstone.getViewport(viewportElement);

        // 마우스 휠 이벤트에서 deltaY 값을 가져옵니다.
        const deltaY = event.deltaY;

        // 현재 이미지의 imageId를 찾습니다.
        const currentImageId = activeViewport.imageIds[activeViewport.frameIndex];

        // 현재 이미지의 인덱스를 기반으로 다음 이미지의 인덱스를 계산합니다.
        const numImagesToScroll = deltaY > 0 ? 1 : -1;
        const nextIndex = activeViewport.imageIds.indexOf(currentImageId) + numImagesToScroll;

        // 다음 이미지의 imageId를 찾습니다.
        const nextImageId = activeViewport.imageIds[nextIndex];

        // 다음 이미지를 로드하고 표시합니다.
        cornerstone.loadImage(nextImageId).then(image => {
            cornerstone.displayImage(viewportElement, image);
        });
    });
}



