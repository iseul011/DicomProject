let stack = {
    currentImageIdIndex: 0,
    imageIds: [],
};

//도구 기능들 시작
cornerstoneTools.init();
cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 1});
let isZoomEnabled = false; // 변수를 선언하고 기본값으로 초기화
let isDragging = false;
let initialMousePosition = {x: 0, y: 0};

document.getElementById('zoomButton').addEventListener('click', () => {
    isZoomEnabled = !isZoomEnabled;

    if (isZoomEnabled) {
        const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
        initialMousePosition = cornerstone.pageToPixel(activeViewport, event.clientX, event.clientY);
        console.log("뷰포트", activeViewport);
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
        const currentMousePosition = {x: event.clientX, y: event.clientY};

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
        cornerstoneTools.setToolActive('Wwwc', {mouseButtonMask: 1});
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

    function displayDicomImage(i,seriesTabList) {
        if (i>=seriesTabList) {
            const parentDiv = document.createElement('div');
            parentDiv.classList.add('parentDiv');
            parentDiv.style.display = 'none';
            parentDiv.setAttribute('data-value',i);
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
                    viewportElement.id =`viewport${i}`;

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
                    parentDiv.setAttribute('data-value',i);
                    if(i > 3){
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
                if(i<seriesTabList.length){
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
                            displayDicomImage(i,seriesTabList.length);
                            await overlayAiPresent(PRContentList[j], i);
                        }
                }

                }else {
                    displayDicomImage(i,seriesTabList.length);
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

                table.addEventListener('click', function(event) {
                    const clickedRow = event.currentTarget.getAttribute('data-row');
                    const clickedColumn = event.currentTarget.getAttribute('data-column');

                    gridLayout(clickedRow, clickedColumn);
                });

                table.addEventListener('mouseover', function(event) {
                    const hoveredRow = parseInt(event.currentTarget.getAttribute('data-row'));
                    const hoveredColumn = parseInt(event.currentTarget.getAttribute('data-column'));

                    applyBackgroundColor(hoveredRow, hoveredColumn);
                });

                table.addEventListener('mouseout', function(event) {
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