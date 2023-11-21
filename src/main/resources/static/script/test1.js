let stack = {
    currentImageIdIndex: 0,
    imageIds: [],
};

cornerstoneTools.init();

// Zoom 도구
let isZoomEnabled = false;
let isDraggingZoom = false;
let initialMousePositionZoom = { x: 0, y: 0 };
let zoom = 0.001;
document.getElementById('zoomButton').addEventListener('click', (event) => {
    isZoomEnabled = !isZoomEnabled;


        if (isZoomEnabled) {
            cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
        } else {
            cornerstoneTools.setToolPassive('Zoom');
        }
});

document.addEventListener('mousedown', (event) => {
    if (isZoomEnabled) {
        isDraggingZoom = true;

        const activeViewport = cornerstone.getEnabledElement(document.getElementById(clickedElementId)).element;
        initialMousePositionZoom = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
    }
});

document.addEventListener('mousemove', (event) => {
    if (isDraggingZoom && isZoomEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.getElementById(clickedElementId)).element;
        const viewport = cornerstone.getViewport(activeViewport);
        const currentMousePosition = { x: event.clientX, y: event.clientY };

        // const deltaY = currentMousePosition.y - initialMousePositionZoom.y;
        //
        // // 클릭 지점을 중심으로 이미지 확대/축소
        // const centerY = initialMousePositionZoom.y;
        //
        // viewport.translation.y += centerY * (1 - 1 / (1 + deltaY * 0.001));
        // viewport.scale *= 1 / (1 + deltaY * zoom);
        const deltaX = currentMousePosition.x - initialMousePositionZoom.x;
        const deltaY = currentMousePosition.y - initialMousePositionZoom.y;

        viewport.translation.x -= deltaX * viewport.scale;
        viewport.translation.y -= deltaY * viewport.scale;
        viewport.scale += (deltaX + deltaY) * 0.001;

        cornerstone.setViewport(activeViewport, viewport);

        initialMousePositionZoom = currentMousePosition;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingZoom = false;
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

    console.log(`Wwwc 활성화: ${isWwwcEnabled}`);
});

document.addEventListener('mousedown', (event) => {
    if (isWwwcEnabled) {
        isDraggingWwwc = true;

        const activeViewport = cornerstone.getEnabledElement(document.getElementById(clickedElementId)).element;
        initialMousePositionWwwc = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);

        console.log('Wwwc 드래깅 시작');
    }
});

document.addEventListener('mousemove', (event) => {
    if (isDraggingWwwc && isWwwcEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.getElementById(clickedElementId)).element;
        const currentMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
        const deltaX = currentMousePosition.x - initialMousePositionWwwc.x;
        const deltaY = currentMousePosition.y - initialMousePositionWwwc.y;

        const viewport = cornerstone.getViewport(activeViewport);

        viewport.voi.windowWidth += deltaX * 1.9;
        viewport.voi.windowCenter += deltaY * 1.9;

        cornerstone.setViewport(activeViewport, viewport);

        initialMousePositionWwwc = currentMousePosition;

        console.log(`Wwwc 드래깅: deltaX=${deltaX}, deltaY=${deltaY}`);
    }
});

document.addEventListener('mouseup', () => {
    if (isWwwcEnabled) {
        isDraggingWwwc = false;
        console.log('Wwwc 드래깅 종료');
    }
});

// Move 도구
let isMoveEnabled = false;
let isDraggingMove = false;
let initialMousePositionMove = { x: 0, y: 0 };

document.getElementById('moveButton').addEventListener('click', (event) => {
    isMoveEnabled = !isMoveEnabled;

    if (isMoveEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.getElementById(clickedElementId)).element;
        initialMousePositionMove = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
    }
});

document.addEventListener('mousedown', (event) => {
    if (isMoveEnabled) {
        isDraggingMove = true;
        const activeViewport = cornerstone.getEnabledElement(document.getElementById(clickedElementId)).element;
        initialMousePositionMove = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
    }
});

document.addEventListener('mousemove', (event) => {
    if (isDraggingMove && isMoveEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.getElementById(clickedElementId)).element;
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

// 초기화 도구
function resetImage() {
    const activeViewport = cornerstone.getEnabledElement(document.getElementById(clickedElementId)).element;
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

    const activeViewport = cornerstone.getEnabledElement(document.getElementById(clickedElementId)).element;
    const viewport = cornerstone.getViewport(activeViewport);

    if (isInvertEnabled) {
        viewport.invert = true;
    } else {
        viewport.invert = false;
    }

    cornerstone.setViewport(activeViewport, viewport);

    console.log(`반전 활성화: ${isInvertEnabled}`);
});

// 클릭된 엘리먼트의 ID를 저장할 전역 변수 또는 다른 적절한 방법을 사용하여 전달
let clickedElementId;

// 클릭된 엘리먼트의 id를 활용하는 함수
function handleClickedElement(elementId) {
    setTimeout(function() {
    const activeViewport = cornerstone.getEnabledElement(document.getElementById(elementId));

    if (!activeViewport) {
        // 뷰포트가 비활성화 상태이므로 활성화
        cornerstone.enable(document.getElementById(elementId));
    }

    // 이제 작업을 수행할 수 있음
    console.log('Clicked Element ID:', elementId);

    // 여기서 추가로 필요한 로직을 작성
    // 클릭된 엘리먼트의 ID를 전역 변수에 저장
    clickedElementId = elementId;

    // 빨간색 테두리 스타일을 제거
    const allViewports = document.querySelectorAll('.CSViewport');
    allViewports.forEach(viewport => {
        viewport.classList.remove('selectedViewport');
    });

    // 클릭된 뷰포트에 빨간색 테두리 스타일 추가
    if (activeViewport.element.classList.contains('CSViewport')) {
        activeViewport.element.classList.add('selectedViewport');
    }
}, 1000);
}

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


function displayDicomImage(arrayBuffer, seriesinsuid,i) {

    const byteArray = new Uint8Array(arrayBuffer);
    const dataSet = dicomParser.parseDicom(byteArray);


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

    console.log(stack[i].imageIds[stack.currentImageIdIndex]);
    cornerstone.loadImage(stack[i].imageIds[0]).then(image => {
        cornerstone.displayImage(viewportElement, image);

        // 스택 설정
        cornerstoneTools.addStackStateManager(viewportElement, ['stack']);
        cornerstoneTools.addToolState(viewportElement, 'stack', stack);
    });

    console.log(cornerstoneTools);
    // 마우스 휠 이벤트를 사용하여 다음 또는 이전 이미지로 전환
    viewportElement.addEventListener('wheel', function (event) {
        // 마우스 휠 방향에 따라 다음 또는 이전 이미지로 전환
        if (event.deltaY > 0) {
            // 다음 이미지로 전환
            stackScrollDown(viewportElement);
        } else {
            // 이전 이미지로 전환
            stackScrollUp(viewportElement);
        }

        // 이벤트 버블링 방지
        event.preventDefault();

    });

}

async function viewDicom() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    try {

        let seriesTabList = await getSeriesTab();

        let cont = 4;
        for (let i = 0; i < seriesTabList.length; i++) {
            let item = seriesTabList[i];
            let directoryPath = await getImagePath(item.studykey, item.seriesinsuid);
            let arrayBuffer = null;

            stack[i] = {
                currentImageIdIndex: 0,
                imageIds: [],
            };

            for (let j = 0; j < directoryPath.length; j++) {
                let response = await axios.get("/getDicomFile", {
                    params: {
                        directoryPath: decodeURIComponent(directoryPath[j])
                    },
                    responseType: 'arraybuffer'
                });

                if (response.status === 200) {
                    arrayBuffer = response.data;
                    const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }))}`;
                    stack[i].imageIds.push(imageId);
                    console.log(stack[i].imageIds[stack[i].currentImageIdIndex]);
                }

                if(i<cont && j === 0){
                    displayDicomImage(arrayBuffer, item.seriesinsuid, i);
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

function stackScrollDown(element) {
    console.log("다운")
    const stackToolData = cornerstoneTools.getToolState(element, 'stack');

    if (stackToolData && stackToolData.data.length > 0) {
        const stackData = stackToolData.data[0];

        if (stackData.currentImageIdIndex >= 0) {
            stackData.currentImageIdIndex++;
            const nextImageId = stackData[1].imageIds[stackData.currentImageIdIndex];
            cornerstone.loadImage(nextImageId).then(image => {
                cornerstone.displayImage(element, image);
            });
        }
    }
}

function stackScrollUp(element) {
    console.log("업")
    const stackToolData = cornerstoneTools.getToolState(element, 'stack');

    if (stackToolData && stackToolData.data.length > 0) {
        const stackData = stackToolData.data[0];

        if (stackData.currentImageIdIndex > 0) {
            stackData.currentImageIdIndex--;
            const prevImageId = stackData[1].imageIds[stackData.currentImageIdIndex];
            cornerstone.loadImage(prevImageId).then(image => {
                cornerstone.displayImage(element, image);
            });
        }
    }
}