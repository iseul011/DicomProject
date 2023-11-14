let stack = {
    currentImageIdIndex: 0,
    imageIds: [],
};

viewDicom();
//도구 기능들 시작
cornerstoneTools.init();
cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
let isZoomEnabled = false; // 변수를 선언하고 기본값으로 초기화
let isDragging = false;
let initialMousePosition = { x: 0, y: 0 };

document.getElementById('zoomButton').addEventListener('click', () => {
    isZoomEnabled = !isZoomEnabled;

    if (isZoomEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        initialMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
        console.log("뷰포트",activeViewport);
    }
});

document.addEventListener('mousedown', (event) => {
    if (isZoomEnabled) {
        isDragging = true;
        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        initialMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
    }
});

document.addEventListener('mouseup', (event) => {
    if (isZoomEnabled) {
        const targetElement = event.target;
        const clientX = event.clientX;
        const clientY = event.clientY;

        console.log(`Zoom Out at (${clientX}, ${clientY}) on ${targetElement.tagName}`);
    }

    isDragging = false;
});

document.addEventListener('mousemove', (event) => {
    if (isDragging && isZoomEnabled) {
        const currentMousePosition = { x: event.clientX, y: event.clientY };

        const deltaX = currentMousePosition.x - initialMousePosition.x;
        const deltaY = currentMousePosition.y - initialMousePosition.y;

        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        const viewport = cornerstone.getViewport(activeViewport);

        viewport.translation.x -= deltaX * viewport.scale;
        viewport.translation.y -= deltaY * viewport.scale;
        viewport.scale += (deltaX + deltaY) * 0.001;

        cornerstone.setViewport(activeViewport, viewport);

        initialMousePosition = currentMousePosition;
    }
});





let isWwwcEnabled = false;
// let isDragging = false;
// let initialMousePosition = { x: 0, y: 0 };
let activeViewport;

document.getElementById('wwwcButton').addEventListener('click', () => {
    isWwwcEnabled = !isWwwcEnabled;

    if (isWwwcEnabled) {
        cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
    } else {
        cornerstoneTools.setToolPassive('Wwwc');
    }

    console.log(`Wwwc Enabled: ${isWwwcEnabled}`);
});

document.addEventListener('mousedown', (event) => {
    if (isWwwcEnabled) {
        isDragging = true;
        activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        initialMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);

        console.log('Dragging started');
    }
});

document.addEventListener('mousemove', (event) => {
    if (isDragging && isWwwcEnabled) {
        const currentMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
        const deltaX = currentMousePosition.x - initialMousePosition.x;
        const deltaY = currentMousePosition.y - initialMousePosition.y;

        const viewport = cornerstone.getViewport(activeViewport);

        // Wwwc 도구 변경 로직을 여기에 추가
        viewport.voi.windowWidth += deltaX * 1.9;
        viewport.voi.windowCenter += deltaY * 1.9;

        cornerstone.setViewport(activeViewport, viewport);

        initialMousePosition = currentMousePosition;

        console.log(`Wwwc Dragging: deltaX=${deltaX}, deltaY=${deltaY}`);
    }
});

document.addEventListener('mouseup', () => {
    if (isWwwcEnabled) {
        isDragging = false;
        console.log('Dragging ended');
    }
});






let isMoveEnabled = false;
// let isDragging = false;
// let initialMousePosition = { x: 0, y: 0 };
document.getElementById('moveButton').addEventListener('click', () => {
    isMoveEnabled = !isMoveEnabled;

    if (isMoveEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        initialMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
        dcmImage = cornerstone.getEnabledElement(activeViewport).image;
    }
});

document.addEventListener('mousedown', (event) => {
    if (isMoveEnabled) {
        isDragging = true;
        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        initialMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
    }
});

document.addEventListener('mousemove', (event) => {
    if (isDragging && isMoveEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        const viewport = cornerstone.getViewport(activeViewport);

        const currentMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);

        const deltaX = currentMousePosition.x - initialMousePosition.x;
        const deltaY = currentMousePosition.y - initialMousePosition.y;

        viewport.translation.x += deltaX;
        viewport.translation.y += deltaY;

        cornerstone.setViewport(activeViewport, viewport);

        initialMousePosition = currentMousePosition;
    }
});

document.addEventListener('mouseup', () => {
    isMoveEnabled = false;
});

function resetImage() {
    const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
    cornerstone.reset(activeViewport);
}

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    resetImage();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        resetImage();
    }
});

document.getElementById('resetButton').addEventListener('click', () => {
    resetImage();
});



let isInvertEnabled = false;

document.getElementById('invertButton').addEventListener('click', () => {
    isInvertEnabled = !isInvertEnabled;

    const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
    const viewport = cornerstone.getViewport(activeViewport);

    if (isInvertEnabled) {
        // 흑백 반전 활성화
        viewport.invert = true;
    } else {
        // 흑백 반전 비활성화
        viewport.invert = false;
    }

    cornerstone.setViewport(activeViewport, viewport);

    console.log(`Invert Enabled: ${isInvertEnabled}`);
});

//끝

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

