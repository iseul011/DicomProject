let isMoveEnabled = false;
let isDragging = false;
let initialMousePosition = { x: 0, y: 0 };

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