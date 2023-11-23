let stack = {
    currentImageIdIndex: 0,
    imageIds: [],
};

cornerstoneTools.setToolDisabled('CobbAngle');
cornerstoneTools.init();

let rotateToolActive = false;
function setupRotateTool() {
    const RotateTool = cornerstoneTools.RotateTool;

    // 상태에 따라 도구 활성화 또는 비활성화
    if (!rotateToolActive) {
        cornerstoneTools.addTool(RotateTool);
        cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 });
        rotateToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Rotate');
        rotateToolActive = false;
    }
}
//화살표 도구
let arrowAnnotateToolActive = false;
function setupArrowAnnotateTool() {
    const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;

    if (!arrowAnnotateToolActive) {
        cornerstoneTools.addTool(ArrowAnnotateTool);
        cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 });
        arrowAnnotateToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('ArrowAnnotate');
        arrowAnnotateToolActive = false;
    }
}
//RGB 도구
let probeToolActive = false;
function setupProbeTool() {
    const ProbeTool = cornerstoneTools.ProbeTool;

    if (!probeToolActive) {
        cornerstoneTools.addTool(ProbeTool);
        cornerstoneTools.setToolActive('Probe', { mouseButtonMask: 1 });
        probeToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Probe');
        probeToolActive = false;
    }
}
//Bidirectional 도구
let bidirectionalToolActive = false;
function setupBidirectionalTool() {
    const BidirectionalTool = cornerstoneTools.BidirectionalTool;

    if (!bidirectionalToolActive) {
        cornerstoneTools.addTool(BidirectionalTool);
        cornerstoneTools.setToolActive('Bidirectional', { mouseButtonMask: 1 });
        bidirectionalToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Bidirectional');
        bidirectionalToolActive = false;
    }
}
//콥 각도
let cobbAngleToolActive = false;
function setupCobbAngleTool() {
    const CobbAngleTool = cornerstoneTools.CobbAngleTool;

    if (!cobbAngleToolActive) {
        cornerstoneTools.addTool(CobbAngleTool);
        cornerstoneTools.setToolActive('CobbAngle', {mouseButtonMask: 1});
        cobbAngleToolActive = true;
    } else {
        cobbAngleToolActive = false;
    }
}

//길이 그리기
let lengthToolActive = false;
function setupLengthTool() {
    const LengthTool = cornerstoneTools.LengthTool;

    if (!lengthToolActive) {
        cornerstoneTools.addTool(LengthTool);
        cornerstoneTools.setToolActive('Length', {mouseButtonMask: 1});
        lengthToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Length');
        lengthToolActive = false;
    }
}

//동그라미 그리기
let ellipticalRoiToolActive = false;
function setupEllipticalRoiTool() {
    const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;

    if (!ellipticalRoiToolActive) {
        cornerstoneTools.addTool(EllipticalRoiTool);
        cornerstoneTools.setToolActive('EllipticalRoi', {mouseButtonMask: 1});
        ellipticalRoiToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('EllipticalRoi');
        ellipticalRoiToolActive = false;
    }
}

//사각형 그리기
let rectangleRoiToolActive = false;
function setupRectangleRoiTool() {
    const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;

    if (!rectangleRoiToolActive) {
        cornerstoneTools.addTool(RectangleRoiTool);
        cornerstoneTools.setToolActive('RectangleRoi', {mouseButtonMask: 1});
        rectangleRoiToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('RectangleRoi');
        rectangleRoiToolActive = false;
    }
}

//자율그리기
let freehandRoiToolActive = false;
function setupFreehandRoiTool() {
    const FreehandRoiTool = cornerstoneTools.FreehandRoiTool;

    if (!freehandRoiToolActive) {
        cornerstoneTools.addTool(FreehandRoiTool);
        cornerstoneTools.setToolActive('FreehandRoi', {mouseButtonMask: 1});
        freehandRoiToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('FreehandRoi');
        freehandRoiToolActive = false;
    }
}

//각도 기능
let angleToolActive = false;
function setupAngleTool() {
    const AngleTool = cornerstoneTools.AngleTool;

    if (!angleToolActive) {
        cornerstoneTools.addTool(AngleTool);
        cornerstoneTools.setToolActive('Angle', {mouseButtonMask: 1});
        angleToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Angle');
        angleToolActive = false;
    }
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
        cornerstoneTools.addTool(TextMarkerTool, {configuration});
        cornerstoneTools.setToolActive('TextMarker', {mouseButtonMask: 1});
        textMarkerToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('TextMarker');
        textMarkerToolActive = false;
    }
}

//윈도우 레벨
let wwwcToolActive = false;
function toggleWwwcTool() {
    const WwwcTool = cornerstoneTools.WwwcTool;

    if (!wwwcToolActive) {
        cornerstoneTools.addTool(WwwcTool);
        cornerstoneTools.setToolActive('Wwwc', {mouseButtonMask: 1});
        wwwcToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Wwwc');
        wwwcToolActive = false;
    }
}

//이동
let panToolActive = false;

function togglePanTool() {
    const PanTool = cornerstoneTools.PanTool;

    if (!panToolActive) {
        cornerstoneTools.addTool(PanTool);
        cornerstoneTools.setToolActive('Pan', {mouseButtonMask: 1});
        panToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Pan');
        panToolActive = false;
    }
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
        cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 1});
        zoomToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Zoom');
        zoomToolActive = false;
    }
}

//돋보기 기능
let magnifyToolActive = false;
function toggleMagnifyTool() {
    const MagnifyTool = cornerstoneTools.MagnifyTool;
    // 상태에 따라 도구 활성화 또는 비활성화
    if (!magnifyToolActive) {
        cornerstoneTools.addTool(MagnifyTool)
        cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 })
        magnifyToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('Magnify');
        magnifyToolActive = false;
    }
}
//지정
// toggleOrientationMarkersTool();
// function toggleOrientationMarkersTool(){
//     const OrientationMarkersTool = cornerstoneTools.OrientationMarkersTool;
//
//     cornerstoneTools.addTool(OrientationMarkersTool);
//     cornerstoneTools.setToolActive('OrientationMarkers', { mouseButtonMask: 1 });
// }
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

let clickedElementId;

function handleClickedViewport(viewportElement) {
    // 클릭된 뷰포트의 ID를 가져오기
    const clickedViewportId = viewportElement.id;

    // 가져온 ID를 출력 또는 활용
    console.log('Clicked Viewport ID:', clickedViewportId);

    // 여기서 추가로 필요한 로직을 작성

    // 빨간색 테두리 스타일을 제거
    const allViewports = document.querySelectorAll('.CSViewport');
    allViewports.forEach(viewport => {
        viewport.classList.remove('selectedViewport');

    });

    // 클릭된 뷰포트에 빨간색 테두리 스타일 추가
    viewportElement.classList.add('selectedViewport');

    // 클릭된 뷰포트 활성화
    cornerstone.enable(viewportElement);

    // 클릭된 뷰포트의 ID를 전역 변수에 저장
    clickedElementId = clickedViewportId;
}

document.addEventListener('click', (event) => {
    // 클릭된 엘리먼트의 클래스 목록 확인
    const clickedElementClasses = event.target.classList;

    // CSViewport 클래스를 가진 엘리먼트인지 확인
    if (clickedElementClasses.contains('CSViewport')) {
        // 클릭된 엘리먼트의 상위로 올라가며 CSViewport을 찾기
        const clickedViewportElement = event.target.closest('.CSViewport');
        if (clickedViewportElement) {
            handleClickedViewport(clickedViewportElement);
        }
    }
});

function toggleToolModal(modalClass) {
    var allModals = document.querySelectorAll('.toolModalChildren, .toolModalChildren2');
    allModals.forEach(function (modal) {
        if (modal.classList.contains(modalClass)) {
            modal.classList.toggle('displayNone');
        } else {
            modal.classList.add('displayNone');
        }
    });
}

//끝


async function overlayAiPresent(prContent, i) {
    if (prContent != null && prContent.TextObjectSequence) {
        const viewportElement = document.querySelector(`#viewport${i}`);
        const overlayCanvas = document.createElement("canvas");
        overlayCanvas.width = 512;
        overlayCanvas.height = 512;
        const overlayCtx = overlayCanvas.getContext('2d');

        if (prContent.TextObjectSequence.length > 0) {
            prContent.TextObjectSequence.forEach(function (textObject) {
                overlayCtx.fillStyle = 'white';
                overlayCtx.font = '16px Arial';
                overlayCtx.textAlign = 'center';

                var x = (textObject.BoundingBoxBottomRightHandCorner.Column + textObject.BoundingBoxTopLeftHandCorner.Column) / 2;
                var y = (textObject.BoundingBoxBottomRightHandCorner.Row + textObject.BoundingBoxTopLeftHandCorner.Row) / 2;
                var text = textObject.UnformattedTextValue;

                overlayCtx.fillText(text, x, y);
            });
        }

        viewportElement.appendChild(overlayCanvas);
    }
}

function displayDicomImage(i, seriesTabList) {
    if (i >= seriesTabList) {
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('parentDiv');
        parentDiv.style.display = 'none';
        parentDiv.setAttribute('data-value', i);
        document.getElementById('dicomImageContainer').appendChild(parentDiv);
        return;
    }


    const blobUrl = stack[i].imageIds[stack.currentImageIdIndex].replace('dicomweb:', '');

    fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onload = function (event) {
                const arrayBuffer = event.target.result;

                const byteArray = new Uint8Array(arrayBuffer);
                const dataSet = dicomParser.parseDicom(byteArray);

                // 데이터가 준비되면 처리 코드를 여기에 이동
                const viewportElement = document.createElement('div');
                viewportElement.classList.add('CSViewport');
                viewportElement.id = `viewport${i}`;

                const topLeft = document.createElement('div');
                topLeft.classList.add('topLeft');

                topLeft.innerHTML = `
                    <span>${dataSet.string('x00100020')}</span>
                    <span>${dataSet.string('x00100010')}</span>
                    <span>${dataSet.string('x00100030')}</span>
                    <span>${dataSet.string('x00200011')}</span>
                    <span class="imageNumber">${dataSet.string('x00200013')}</span>
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
                parentDiv.setAttribute('data-value', i);
                if (i > 3) {
                    parentDiv.style.display = 'none';
                }

                viewportElement.appendChild(topLeft);
                viewportElement.appendChild(topRight);
                viewportElement.appendChild(bottomRight);
                parentDiv.appendChild(viewportElement);

                document.getElementById('dicomImageContainer').appendChild(parentDiv);

                cornerstone.enable(viewportElement);

                cornerstone.loadImage(stack[i].imageIds[stack.currentImageIdIndex]).then(image => {
                    cornerstone.displayImage(viewportElement, image);
                });

                // 마우스 휠 이벤트를 사용하여 다음 또는 이전 이미지로 전환
                viewportElement.addEventListener('wheel', function (event) {
                    // 스택 설정
                    cornerstoneTools.addStackStateManager(viewportElement, ['stack']);
                    cornerstoneTools.addToolState(viewportElement, 'stack', stack);

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
            };
            reader.readAsArrayBuffer(blob);
        })
        .catch(error => console.error(error));

}


async function viewDicom() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    try {
        let seriesTabList = await getSeriesTab();

        for (let i = 0; i < 25; i++) {
            if (i < seriesTabList.length) {
                let item = seriesTabList[i];
                let directoryPath = await getImagePath(item.studykey, item.seriesinsuid);
                let PRContentList = await getPRContentList(item.studykey, item.serieskey, item.imagecnt);
                let arrayBuffer;

                function extractNumber(path) {
                    const match = path.match(/\.(\d+)\.\d+\.dcm$/);
                    return match ? parseInt(match[1]) : null;
                }

                directoryPath.sort((a, b) => {
                    const numberA = extractNumber(a);
                    const numberB = extractNumber(b);

                    // 숫자가 있는 경우에만 비교
                    if (numberA !== null && numberB !== null) {
                        return numberA - numberB;
                    }

                    // 숫자가 없는 경우 문자열로 비교
                    return a.localeCompare(b);
                });

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
                        const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], {type: 'application/dicom'}))}`;
                        stack[i].imageIds.push(imageId);
                    }


                    if (i < seriesTabList.length && j === 0) {
                        displayDicomImage(i, seriesTabList.length);
                        await overlayAiPresent(PRContentList[j], i);
                    }
                }

            } else {
                displayDicomImage(i, seriesTabList.length);
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

async function getPRContentList(studykey, serieskey, imagecnt) {
    try {
        let response = await axios.get("/getPRContentList", {
            params: {
                studykey: studykey,
                serieskey: serieskey,
                imagecnt: imagecnt
            }
        });

        if (response.status === 200) {
            if (response.data != null) {
                return response.data;
            } else {
                return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

function stackScrollDown(element) {

    const stackToolData = cornerstoneTools.getToolState(element, 'stack');

    if (stackToolData && stackToolData.data.length > 0) {
        const stackData = stackToolData.data[0];
        let firstCharacter;
        const mouseOverElement = document.elementFromPoint(event.pageX, event.pageY);
        const csViewportParent = mouseOverElement.closest('.CSViewport');

        if (csViewportParent) {
            const id = csViewportParent.id;
            if (id.length > 0) {
                firstCharacter = id.charAt(id.length - 1);
            }
        }

        if (stackData.currentImageIdIndex >= 0 && stackData.currentImageIdIndex < stackData[firstCharacter].imageIds.length - 1) {
            stackData.currentImageIdIndex++;

            const blobUrl = stack[firstCharacter].imageIds[stackData.currentImageIdIndex].replace('dicomweb:', '');
            fetch(blobUrl)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const arrayBuffer = event.target.result;

                        const byteArray = new Uint8Array(arrayBuffer);
                        const dataSet = dicomParser.parseDicom(byteArray);

                        const indexSpan = csViewportParent.querySelector('.imageNumber');

                        // x00200013 값으로 이미지 번호 업데이트
                        const imageNumberValue = dataSet.string('x00200013');
                        if (indexSpan) {
                            indexSpan.textContent = imageNumberValue;
                        }

                        const nextImageId = stack[firstCharacter].imageIds[stackData.currentImageIdIndex];
                        cornerstone.loadImage(nextImageId).then(image => {
                            cornerstone.displayImage(element, image);
                        });
                    };
                    reader.readAsArrayBuffer(blob);
                })
                .catch(error => console.error(error));
        }
    }
}


function stackScrollUp(element) {
    const stackToolData = cornerstoneTools.getToolState(element, 'stack');


    if (stackToolData && stackToolData.data.length > 0) {
        const stackData = stackToolData.data[0];
        let firstCharacter;
        const mouseOverElement = document.elementFromPoint(event.pageX, event.pageY);
        const csViewportParent = mouseOverElement.closest('.CSViewport');

        if (csViewportParent) {
            const id = csViewportParent.id;
            if (id.length > 0) {
                firstCharacter = id.charAt(id.length - 1);
            }
        }


        if (stackData.currentImageIdIndex > 0) {
            stackData.currentImageIdIndex--;

            const blobUrl = stack[firstCharacter].imageIds[stackData.currentImageIdIndex].replace('dicomweb:', '');
            fetch(blobUrl)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const arrayBuffer = event.target.result;

                        const byteArray = new Uint8Array(arrayBuffer);
                        const dataSet = dicomParser.parseDicom(byteArray);

                        const indexSpan = csViewportParent.querySelector('.imageNumber');

                        const imageNumberValue = dataSet.string('x00200013');
                        if (indexSpan) {
                            indexSpan.textContent = imageNumberValue;
                        }

                        const nextImageId = stack[firstCharacter].imageIds[stackData.currentImageIdIndex];
                        cornerstone.loadImage(nextImageId).then(image => {
                            cornerstone.displayImage(element, image);
                        });
                    };
                    reader.readAsArrayBuffer(blob);
                })
                .catch(error => console.error(error));


            const prevImageId = stackData[firstCharacter].imageIds[stackData.currentImageIdIndex];
            cornerstone.loadImage(prevImageId).then(image => {
                cornerstone.displayImage(element, image);
            });
        }
    }
}

//레이 아웃 틀 만들기
let isTogleBoxVisible = false;
const button = document.getElementById('toggleButton');

function togleBox() {
    const button = document.getElementById('toggleButton');

    if (isTogleBoxVisible) {
        const togleBox = document.getElementById('togleBox');
        if (togleBox) {
            button.removeChild(togleBox);
        }
    } else {
        const togleBox = document.createElement('div');
        togleBox.classList.add('togleBox');
        togleBox.id = 'togleBox';

        for (let i = 0; i < 5; i++) {
            const togleDiv = document.createElement('div');

            for (let j = 0; j < 5; j++) {
                const vertical = document.createElement('div');
                vertical.classList.add('vertical-align');

                const table = document.createElement('div');
                table.classList.add('table');
                table.id = 'table';
                table.setAttribute("data-row", i + 1);
                table.setAttribute("data-column", j + 1);

                table.addEventListener('click', function (event) {
                    const clickedRow = event.currentTarget.getAttribute('data-row');
                    const clickedColumn = event.currentTarget.getAttribute('data-column');

                    gridLayout(clickedRow, clickedColumn);
                });

                table.addEventListener('mouseover', function (event) {
                    const hoveredRow = parseInt(event.currentTarget.getAttribute('data-row'));
                    const hoveredColumn = parseInt(event.currentTarget.getAttribute('data-column'));

                    applyBackgroundColor(hoveredRow, hoveredColumn);
                });

                table.addEventListener('mouseout', function (event) {
                    resetBackgroundColor();
                });

                vertical.appendChild(table);
                togleDiv.appendChild(vertical);
            }
            togleBox.appendChild(togleDiv);
        }

        button.appendChild(togleBox);
    }

    isTogleBoxVisible = !isTogleBoxVisible;
}

button.addEventListener('click', togleBox);

function applyBackgroundColor(row, column) {
    const allDivs = document.querySelectorAll('.table');

    allDivs.forEach(div => {
        const divRow = parseInt(div.getAttribute('data-row'));
        const divColumn = parseInt(div.getAttribute('data-column'));

        if (divRow <= row && divColumn <= column) {
            div.style.backgroundColor = 'rgb(204, 204, 204)';
        }
    });
}

function resetBackgroundColor() {
    const allDivs = document.querySelectorAll('.table');

    allDivs.forEach(div => {
        div.style.backgroundColor = '';
    });
}

function hideDicomImage(index) {
    const parentDivs = document.getElementsByClassName('parentDiv');
    const parentDiv = parentDivs[index];
    parentDiv.style.display = 'none';

}

function showDicomImage(index) {
    const parentDivs = document.getElementsByClassName('parentDiv');
    const parentDiv = parentDivs[index];
    parentDiv.style.display = 'block';
}

//레이아웃 선택시 그리드 크기 설정
function gridLayout(row, column) {
    const wadoBox = document.getElementById('dicomImageContainer');
    wadoBox.style.gridTemplateRows = `repeat(${row},1fr)`;
    wadoBox.style.gridTemplateColumns = `repeat(${column},1fr)`;

    const parentDivs = document.getElementsByClassName('parentDiv');
    for (let i = 0; i < parentDivs.length; i++) {
        const parentDiv = parentDivs[i];
        const dataValue = parentDiv.getAttribute('data-value');

        if (dataValue) {
            const value = parseInt(dataValue);
            if (value < row * column) {
                showDicomImage(i);
            } else {
                hideDicomImage(i);
            }
        }
    }

    const allViewports = document.querySelectorAll('.CSViewport');
    allViewports.forEach(viewport => {
        cornerstone.resize(viewport);
    });
}


viewDicom();