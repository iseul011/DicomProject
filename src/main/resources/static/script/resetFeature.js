function initResetFeature() {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
}

function handleContextMenu(event) {
    event.preventDefault();
    resetImage();
}

function handleKeyDown(event) {
    if (event.key === 'Escape') {
        resetImage();
    }
}

function resetImage() {
    const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
    cornerstone.reset(activeViewport);
}