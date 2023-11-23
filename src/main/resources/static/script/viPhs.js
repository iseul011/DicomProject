let stack = {
    currentImageIdIndex: 0,
    imageIds: [],
};

cornerstoneTools.init();

//각도 기능
let angleToolActive = false;
function setupAngleTool() {
    const AngleTool = cornerstoneTools.AngleTool;

    // 상태에 따라 도구 활성화 또는 비활성화
    if (!angleToolActive) {
        cornerstoneTools.addTool(AngleTool);
        cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 });
        angleToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Angle');
        angleToolActive = false;
    }
    toolModalChildren.classList.add('displayNone');
}
//마커 기능
let textMarkerToolActive = false;
function setupTextMarkerTool() {
    const TextMarkerTool = cornerstoneTools.TextMarkerTool;

    const configuration = {
        markers: ['이지훈짱', '이지훈최고', '이지훈대박', '이지훈머박', '이지훈짱짱'],
        current: '이지훈짱',
        ascending: true,
        loop: true,
    };

    if (!textMarkerToolActive) {
        cornerstoneTools.addTool(TextMarkerTool, { configuration });
        cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 });
        textMarkerToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('TextMarker');
        textMarkerToolActive = false;
    }
    toolModalChildren.classList.add('displayNone');
}
//윈도우 레벨
let wwwcToolActive = false;
function toggleWwwcTool() {
    const WwwcTool = cornerstoneTools.WwwcTool;

    // 상태에 따라 도구 활성화 또는 비활성화
    if (!wwwcToolActive) {
        cornerstoneTools.addTool(WwwcTool);
        cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
        wwwcToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Wwwc');
        wwwcToolActive = false;
    }
    toolModalChildren.classList.add('displayNone');
}
//이동
let panToolActive = false;
function togglePanTool() {
    const PanTool = cornerstoneTools.PanTool;

    // 상태에 따라 도구 활성화 또는 비활성화
    if (!panToolActive) {
        cornerstoneTools.addTool(PanTool);
        cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
        panToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Pan');
        panToolActive = false;
    }
    toolModalChildren.classList.add('displayNone');
}
//지정
function toggleOrientationMarkersTool(){
    const OrientationMarkersTool = cornerstoneTools.OrientationMarkersTool;

    cornerstoneTools.addTool(OrientationMarkersTool)
    cornerstoneTools.setToolActive('OrientationMarkers', { mouseButtonMask: 1 })
}

//줌 기능
let zoomToolActive = false;
function toggleZoomTool() {
    const ZoomTool = cornerstoneTools.ZoomTool;

    // 상태에 따라 도구 활성화 또는 비활성화
    if (!zoomToolActive) {
        cornerstoneTools.addTool(ZoomTool, {
            // Optional configuration
            configuration: {
                invert: false,
                preventZoomOutsideImage: false,
                minScale: 0.1,
                maxScale: 20.0,
            }
        });
        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
        zoomToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Zoom');
        zoomToolActive = false;
    }
    toolModalChildren.classList.add('displayNone');
}
//돋보기 기능
let magnifyToolActive = false;
function toggleMagnifyTool() {
    const MagnifyTool = cornerstoneTools.MagnifyTool;

    // 상태에 따라 도구 활성화 또는 비활성화
    if (!magnifyToolActive) {
        cornerstoneTools.addTool(MagnifyTool);
        cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 });
        magnifyToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Magnify');
        magnifyToolActive = false;
    }
    toolModalChildren.classList.add('displayNone');
}
//지정
//toggleOrientationMarkersTool();


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

//도구 버튼
var toolModalChildren = document.getElementById('toolModalChildren');
function toggleToolModal() {
    toolModalChildren.classList.toggle('displayNone');
}
window.addEventListener('click', function (e) {
    if (!e.target.closest('.toolModalParent')) {
        toolModalChildren.classList.add('displayNone');
    }
});

var toolModalChildren2 = document.getElementById('toolModalChildren2');
function toggleToolModal2() {
    toolModalChildren2.classList.toggle('displayNone');
}
window.addEventListener('click', function (e) {
    if (!e.target.closest('.toolModalParent2')) {
        toolModalChildren2.classList.add('displayNone');
    }
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

//---- 썸네일 ----//
let isDivVisible = false;

// 이미지 클릭 시 호출되는 함수
async function handleThumbnailClick(seriesinsuid, seriesIndex) {
    try {
        // 시리즈에 해당하는 이미지 정보 가져오기
        const imageInfo = thrownImageInfo[seriesinsuid];

        // 이미지를 표시
        displayExpandedViewer(imageInfo, seriesIndex);

        // 썸네일 박스를 닫음
        thumbnailBox();
    } catch (error) {
        console.error(error);
    }
}

// 전체 화면 이미지 표시 함수 수정
async function displayExpandedViewer(imageInfo, seriesIndex) {
    try {
        const expandedViewer = document.getElementById('expandedViewer');

        // 확대된 뷰어의 내용을 지웁니다.
        expandedViewer.innerHTML = '';

        // 확대된 뷰어용 새로운 뷰포트 엘리먼트를 생성합니다.
        const expandedViewportElement = document.createElement('div');
        expandedViewportElement.classList.add('expandedViewport');

        // 뷰포트 엘리먼트를 확대된 뷰어에 추가합니다.
        expandedViewer.appendChild(expandedViewportElement);

        // cornerstone 라이브러리를 확대된 뷰포트에 활성화합니다.
        cornerstone.enable(expandedViewportElement);

        // 선택한 이미지를 로드하고 표시합니다.
        cornerstone.loadImage(imageInfo.imageId).then(image => {
            cornerstone.displayImage(expandedViewportElement, image);
        });

        // 추가적으로 필요한 설정 및 도구 상태 관리자, 이벤트 리스너 등을 설정할 수 있습니다.

        // 확대된 뷰어에 닫기 버튼을 추가합니다.
        const closeButton = document.createElement('button');
        closeButton.innerText = '닫기';
        closeButton.addEventListener('click', function () {
            // 닫기 버튼을 클릭하면 확대된 뷰어를 제거합니다.
            expandedViewer.innerHTML = '';
        });
        expandedViewer.appendChild(closeButton);

    } catch (error) {
        console.error(error);
    }
}

// 썸네일 박스 토글 함수 수정
async function thumbnailBox() {
    const thumbnail = document.querySelector('.thumbnail');

    if (isDivVisible) {
        thumbnail.innerHTML = '';
    } else {
        thumbnail.innerHTML += '<h3>썸네일</h3>';
        thumbnail.innerHTML += '<hr/>';

        // 썸네일 이미지 가져오기
        const seriesTabs = document.querySelectorAll('.CSViewport');

        seriesTabs.forEach((seriesTab, index) => {
            const seriesNumber = index + 1;
            const thumbnailImage = seriesTab.querySelector('canvas').toDataURL();
            thumbnail.innerHTML += `<img src="${thumbnailImage}" onclick="handleThumbnailClick(seriesinsuid${index}, ${index})" style="width: 100%; margin-bottom: 10px;"/>`;
            thumbnail.innerHTML += `<div class="bm">시리즈 ${seriesNumber}</div>`;
        });
    }

    // 스타일 조정
    thumbnail.style.backgroundColor = isDivVisible ? "" : "rgb(36, 36, 36)";
    thumbnail.style.height = isDivVisible ? "" : "900px";
    thumbnail.style.width = isDivVisible ? "" : "280px";
    thumbnail.style.color = isDivVisible ? "" : "white";
    thumbnail.style.textAlign = isDivVisible ? "" : "center";
    thumbnail.style.marginRight = isDivVisible ? "" : "10px";
    thumbnail.style.fontSize = isDivVisible ? "" : "18px";
    thumbnail.style.overflowY = isDivVisible ? "" : "scroll";

    isDivVisible = !isDivVisible;
}

