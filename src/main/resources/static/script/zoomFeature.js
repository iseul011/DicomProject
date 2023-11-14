
let isZoomEnabled = false;
let isDragging = false;
let initialMousePosition = { x: 0, y: 0 };

function initZoomFeature() {
    cornerstoneTools.init();
    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
}

function handleMouseDown(event) {
    isZoomEnabled = !isZoomEnabled;
    if (!isDragging && isZoomEnabled) {
        isDragging = true;
        initialMousePosition = { x: event.clientX, y: event.clientY };
    }
}

function handleMouseUp(event) {
    if (isZoomEnabled) {
        const targetElement = event.target;
        const clientX = event.clientX;
        const clientY = event.clientY;
        console.log(`Zoom Out at (${clientX}, ${clientY}) on ${targetElement.tagName}`);
    }
    isDragging = false;
}

function handleMouseMove(event) {
    if (isDragging && isZoomEnabled) {
        // 현재 마우스 위치 업데이트
        const currentMousePosition = { x: event.clientX, y: event.clientY };

        // 드래그 중인 거리에 따라 이미지를 확대 또는 축소
        const deltaX = currentMousePosition.x - initialMousePosition.x;
        const deltaY = currentMousePosition.y - initialMousePosition.y;

        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        const viewport = cornerstone.getViewport(activeViewport);

        // 마우스 이벤트가 발생한 지점을 중심으로 확대/축소
        viewport.translation.x -= deltaX * viewport.scale;
        viewport.translation.y -= deltaY * viewport.scale;
        viewport.scale += (deltaX + deltaY) * 0.01;

        // 뷰포트 업데이트
        cornerstone.setViewport(activeViewport, viewport);

        // 현재 마우스 위치를 다시 초기 위치로 업데이트
        initialMousePosition = currentMousePosition;
    }
}