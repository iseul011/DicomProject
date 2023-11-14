let stack = {
    currentImageIdIndex: 0,
    imageIds: [],
};

viewDicom();

function displayDicomImage(arrayBuffer, seriesinsuid) {
    let cont = 4;
    let IMAGEKEY = 1;

    const byteArray = new Uint8Array(arrayBuffer);
    const dataSet = dicomParser.parseDicom(byteArray);
    console.log(dataSet)
    if(IMAGEKEY === parseInt (dataSet.string('x00200013'))){
        const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }))}`;
        console.log(imageId)
        stack.imageIds.push(imageId);

        const viewportElement = document.createElement('div');
        viewportElement.classList.add('CSViewport');
        viewportElement.id = `viewport-${seriesinsuid}`;

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

            const scrollWheelTool = cornerstoneTools.getToolForElement(viewportElement, 'StackScrollMouseWheel');
            if (scrollWheelTool && scrollWheelTool.isEnabled()) {
                cornerstoneTools.setToolActive('StackScrollMouseWheel', { element: viewportElement });
                IMAGEKEY++;
            }
            cornerstoneTools.addStackStateManager(viewportElement, ['stack']);
            cornerstoneTools.addToolState(viewportElement, 'stack', stack);
        });

    }
}

async function viewDicom() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    cornerstoneTools.init();
    const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
    cornerstoneTools.addTool(StackScrollMouseWheelTool);

    StackScrollMouseWheelTool.applyActiveStrategy = applyActiveStrategy;

    try {

        let seriesTabList = await getSeriesTab();

        let items = [];

        for (let i = 0; i < seriesTabList.length; i++) {
            items.push(seriesTabList[i].seriesnum);
        }

        // 중복된 숫자를 제거
        let uniqueItems = [...new Set(items)];

        for (let i = 0; i < uniqueItems.length; i++) {
            let item = seriesTabList[i];

            let directoryPath = await getImagePath(item.studykey, uniqueItems[i]);
                //console.log(directoryPath[0])
                let response = await axios.get("/getDicomFile", {
                    params: {
                        directoryPath: directoryPath[0]
                    },
                    responseType: 'arraybuffer'
                });

                if (response.status === 200) {
                    let arrayBuffer = response.data;

                    stack = {
                        currentImageIdIndex: 0,
                        imageIds: directoryPath,
                    };

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
        const studykey = pathArray[2];
        // const studykey =2 ;

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
function applyActiveStrategy(evt, operationData) {

    if (evt.deltaY > 0) {
        // 다음 이미지로 전환
        stack.currentImageIdIndex++;
    } else if (evt.deltaY < 0) {
        // 이전 이미지로 전환
        stack.currentImageIdIndex--;
    }

    // 현재 이미지 인덱스가 이미지 아이디 배열의 범위를 벗어나지 않도록 처리
    stack.currentImageIdIndex = Math.max(0, Math.min(stack.currentImageIdIndex, stack.imageIds.length - 1));

}

