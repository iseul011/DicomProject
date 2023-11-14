let isWwwcEnabled = false;
let isDragging = false;
let initialMousePosition = { x: 0, y: 0 };
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