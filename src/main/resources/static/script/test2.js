let stack = {
    currentImageIdIndex: 0,
    imageIds: [],
};

// 도구 기능들 시작
cornerstoneTools.init();
let activeViewport;

// Zoom 도구
let isZoomEnabled = false;
let isDraggingZoom = false;
let initialMousePositionZoom = { x: 0, y: 0 };

document.getElementById('zoomButton').addEventListener('click', (event) => {
    isZoomEnabled = !isZoomEnabled;

    if (isZoomEnabled && activeViewport) {
        const activeViewportElement = cornerstone.getEnabledElement(activeViewport).element;
        initialMousePositionZoom = cornerstone.pageToPixel(activeViewportElement, event.clientX, event.clientY);
        console.log("뷰포트", activeViewport);
    }
});

document.addEventListener('mousedown', (event) => {
    if (isZoomEnabled) {
        isDraggingZoom = true;
        if (activeViewport) {
            const activeViewportElement = cornerstone.getEnabledElement(activeViewport).element;
            initialMousePositionZoom = cornerstone.pageToPixel(activeViewportElement, event.clientX, event.clientY);
        }
    }
});

document.addEventListener('mouseup', (event) => {
    if (isZoomEnabled) {
        const targetElement = event.target;
        const clientX = event.clientX;
        const clientY = event.clientY;

        console.log(`Zoom Out at (${clientX}, ${clientY}) on ${targetElement.tagName}`);
    }

    isDraggingZoom = false;
});

document.addEventListener('mousemove', (event) => {
    if (isDraggingZoom && isZoomEnabled) {
        const currentMousePosition = { x: event.clientX, y: event.clientY };

        const deltaX = currentMousePosition.x - initialMousePositionZoom.x;
        const deltaY = currentMousePosition.y - initialMousePositionZoom.y;

        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        const viewport = cornerstone.getViewport(activeViewport);

        viewport.translation.x -= deltaX * viewport.scale;
        viewport.translation.y -= deltaY * viewport.scale;
        viewport.scale += (deltaX + deltaY) * 0.001;

        cornerstone.setViewport(activeViewport, viewport);

        initialMousePositionZoom = currentMousePosition;
    }
});

// Wwwc 도구
let isWwwcEnabled = false;
let isDraggingWwwc = false;
let initialMousePositionWwwc = { x: 0, y: 0 };

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
        isDraggingWwwc = true;
        activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        initialMousePositionWwwc = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);

        console.log('Wwwc Dragging started');
    }
});

document.addEventListener('mousemove', (event) => {
    if (isDraggingWwwc && isWwwcEnabled) {
        const currentMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
        const deltaX = currentMousePosition.x - initialMousePositionWwwc.x;
        const deltaY = currentMousePosition.y - initialMousePositionWwwc.y;

        const viewport = cornerstone.getViewport(activeViewport);

        viewport.voi.windowWidth += deltaX * 1.9;
        viewport.voi.windowCenter += deltaY * 1.9;

        cornerstone.setViewport(activeViewport, viewport);

        initialMousePositionWwwc = currentMousePosition;

        console.log(`Wwwc Dragging: deltaX=${deltaX}, deltaY=${deltaY}`);
    }
});

document.addEventListener('mouseup', () => {
    if (isWwwcEnabled) {
        isDraggingWwwc = false;
        console.log('Wwwc Dragging ended');
    }
});

// Move 도구
let isMoveEnabled = false;
let isDraggingMove = false;
let initialMousePositionMove = { x: 0, y: 0 };

document.getElementById('moveButton').addEventListener('click', () => {
    isMoveEnabled = !isMoveEnabled;

    if (isMoveEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        initialMousePositionMove = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
    }
});

document.addEventListener('mousedown', (event) => {
    if (isMoveEnabled) {
        isDraggingMove = true;
    }
});

document.addEventListener('mousemove', (event) => {
    if (isDraggingMove && isMoveEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        const viewport = cornerstone.getViewport(activeViewport);

        const currentMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);

        const deltaX = currentMousePosition.x - initialMousePositionMove.x;
        const deltaY = currentMousePosition.y - initialMousePositionMove.y;

        viewport.translation.x += deltaX;
        viewport.translation.y += deltaY;

        cornerstone.setViewport(activeViewport, viewport);
    }
});

document.addEventListener('mouseup', () => {
    isDraggingMove = false;
});

// Reset 도구
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

// Invert 도구
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
// 클릭된 엘리먼트의 id를 활용하는 함수
function handleClickedElement(elementId) {
    // 이 함수에서 클릭된 엘리먼트의 id를 활용하여 필요한 동작 수행
    // 예를 들어, 특정 id에 따라 다른 동작을 수행하는 등의 로직을 작성
    console.log('Clicked Element ID:', elementId);

    // 여기서 추가로 필요한 로직을 작성

}

// 마우스 클릭 이벤트에 대한 리스너 추가
document.addEventListener('click', (event) => {
    // 클릭된 지점의 엘리먼트를 가져옴
    const clickedElement = event.target;

    // 클릭된 엘리먼트의 id를 가져오기
    const clickedElementId = clickedElement.id;

    // 가져온 id를 출력 또는 활용
    handleClickedElement(clickedElementId);
});

// 뷰어 시작
viewDicom();
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
        parentDiv.id = `parentDiv-${seriesinsuid}`; // 각 이미지에 대해 고유한 ID 부여

        viewportElement.appendChild(topLeft);
        viewportElement.appendChild(topRight);
        viewportElement.appendChild(bottomRight);
        parentDiv.appendChild(viewportElement);

        document.getElementById('dicomImageContainer').appendChild(parentDiv);
        activateToolsForViewport(viewportElement);
        cornerstone.enable(viewportElement);
        cornerstone.loadImage(imageId).then(image => {
            cornerstone.displayImage(viewportElement, image);

            const stackCopy = { ...stack }; // 스택을 복사하여 각 이미지에 대해 독립적인 스택을 생성
            stackCopy.currentImageIdIndex = 0; // 각 이미지에서 첫 번째 이미지를 보여주기 위해 인덱스 초기화

            cornerstoneTools.addStackStateManager(viewportElement, ['stack']);
            cornerstoneTools.addToolState(viewportElement, 'stack', stackCopy);

            activateToolsForViewport(viewportElement);

            console.log(`Viewport Element ID: ${viewportElement.id}`);
        });
    }

}
// Viewport 초기화 및 도구 활성화
function activateToolsForViewport(viewportElement) {
    cornerstoneTools.setToolActive('Zoom', { element: viewportElement });
    cornerstoneTools.setToolActive('Wwwc', { element: viewportElement, mouseButtonMask: 1 });
    cornerstoneTools.setToolActive('Pan', { element: viewportElement });
    cornerstoneTools.setToolActive('StackScrollMouseWheel', { element: viewportElement });
    cornerstoneTools.setToolActive('Invert', { element: viewportElement });
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