cornerstoneTools.init();

let testToolActive = false;
function testTool() {
    const testTool = cornerstoneTools.removeTool;

    // 상태에 따라 도구 활성화 또는 비활성화
    if (!testToolActive) {
        cornerstoneTools.addTool(testTool);
        cornerstoneTools.setToolActive('remove', { mouseButtonMask: 1 });
        testToolActive = true;
    } else {
        cornerstoneTools.setToolDisabled('remove');
        testToolActive = false;
    }
}
//회전기능
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
    let clickedElement = event.target
    const clickedElementClasses = event.target.classList;
    if (clickedElement.classList.contains('cornerstone-canvas') || clickedElement.classList.contains('overlay')) {
        // 클릭된 엘리먼트의 상위로 올라가며 CSViewport을 찾기
        const clickedViewportElement = clickedElement.parentNode
        console.log(clickedViewportElement)
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