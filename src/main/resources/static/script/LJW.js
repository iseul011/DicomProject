let stack = {
    currentImageIdIndex: 0,
    imageIds: [],
};

function createParentDiv() {
    for (let i = 0; i < 25; i++) {
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('parentDiv');
        if (i > 3) {
            parentDiv.classList.add('displayNone');
        }
        parentDiv.id = "parentDiv" + i;
        parentDiv.setAttribute('data-value', i);
        document.getElementById('dicomImageContainer').appendChild(parentDiv);
    }
}

async function viewDicom() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    try {
        let seriesTabList = await getSeriesTab();

        for (let i = 0; i < seriesTabList.length; i++) {
            let item = seriesTabList[i];
            if (item.imagecnt > 0) {
                let directoryPath = await getImagePath(item.studykey, item.seriesinsuid);
                let PRContentList = await getPRContentList(item.studykey, item.serieskey, item.imagecnt);

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
                    imageIds: [directoryPath],
                    PRContentList: PRContentList,
                };
                let dicomFile = await getDicomFile(i);

                await displayDicomImage(i, dicomFile);
                await overlayAiPresent(i);
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

async function getDicomFile(i) {
    let response = await axios.get("/getDicomFile", {
        params: {
            directoryPath: decodeURIComponent(stack[i].imageIds[0][stack[i].currentImageIdIndex])
        },
        responseType: 'arraybuffer'
    });

    if (response.status === 200) {
        arrayBuffer = response.data;
        return `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], {type: 'application/dicom'}))}`;
    }

}

async function displayDicomImage(i, dicomFile) {
    try {
        const blobUrl = dicomFile.replace('dicomweb:', '');
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        const arrayBuffer = await readBlobAsArrayBuffer(blob);

        const byteArray = new Uint8Array(arrayBuffer);
        const dataSet = dicomParser.parseDicom(byteArray);

        // Create viewportElement
        const viewportElement = createViewportElement(i, dataSet);

        // Enable cornerstone for the created viewportElement
        cornerstone.enable(viewportElement);

        // Load and display the image in the viewportElement
        cornerstone.loadImage(dicomFile).then(image => {
            cornerstone.displayImage(viewportElement, image);
        });

        // Add wheel event listener for switching images
        viewportElement.addEventListener('wheel', function (event) {
            cornerstoneTools.addStackStateManager(viewportElement, ['stack']);
            cornerstoneTools.addToolState(viewportElement, 'stack', stack);

            if (event.deltaY > 0) {
                stackScrollDown(viewportElement);
            } else {
                stackScrollUp(viewportElement);
            }

            event.preventDefault();
        });
    } catch (error) {
        console.error(error);
    }
}

function readBlobAsArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsArrayBuffer(blob);
    });
}

function createViewportElement(i, dataSet) {
    const viewportElement = document.createElement('div');
    viewportElement.classList.add('CSViewport');
    viewportElement.id = `viewport${i}`;

    // Create child elements and append them to viewportElement
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
    bottomRight.classList.add('bottomRight');
    bottomRight.innerHTML = `
        <span>${Math.floor(dataSet.string('x00281051'))} / ${Math.floor(dataSet.string('x00281050'))}</span>
        <span>${dataSet.string('x00321032')}</span>
    `;

    const parentDiv = document.getElementById("parentDiv" + i)

    viewportElement.appendChild(topLeft);
    viewportElement.appendChild(topRight);
    viewportElement.appendChild(bottomRight);
    parentDiv.appendChild(viewportElement);

    return viewportElement;
}

async function overlayAiPresent(i) {
    let stackData = stack[i];
    let prContent = stackData.PRContentList[stackData.currentImageIdIndex];
    let maxX = 512;
    let maxY = 512;

    const viewportElement = document.querySelector(`#viewport${i}`);
    let canvas = viewportElement.querySelector('.cornerstone-canvas');
    let overlayCanvas = viewportElement.querySelector('.overlay');

    if (!overlayCanvas) {
        overlayCanvas = document.createElement("canvas");
        overlayCanvas.className = "overlay"
        overlayCanvas.width = Math.min(canvas.width, canvas.height);
        overlayCanvas.height = Math.min(canvas.width, canvas.height);
        viewportElement.appendChild(overlayCanvas);
    }

    const overlayCtx = overlayCanvas.getContext('2d');
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    if (prContent != null && prContent.TextObjectSequence) {
        if (prContent.TextObjectSequence.length > 0) {
            prContent.TextObjectSequence.forEach(function (textObject) {
                maxX = Math.max(maxX, textObject.BoundingBoxBottomRightHandCorner.Column);
                maxY = Math.max(maxY, textObject.BoundingBoxBottomRightHandCorner.Row);
            });
            prContent.TextObjectSequence.forEach(function (textObject) {
                overlayCtx.fillStyle = 'red';
                overlayCtx.font = '10px Arial';

                overlayCtx.textAlign = 'center';
                overlayCtx.textBaseline = 'middle';

                let x = (textObject.BoundingBoxBottomRightHandCorner.Column + textObject.BoundingBoxTopLeftHandCorner.Column) / 2 * (overlayCanvas.width / maxX);
                let y = (textObject.BoundingBoxBottomRightHandCorner.Row + textObject.BoundingBoxTopLeftHandCorner.Row) / 2 * (overlayCanvas.height / maxY);
                var text = textObject.UnformattedTextValue;

                overlayCtx.fillText(text, x, y);
            });
        }
    }

    if (prContent != null && prContent.GraphicObjectSequence) {
        prContent.GraphicObjectSequence.forEach(function (graphicObject) {
            overlayCtx.fillStyle = "";
            overlayCtx.strokeStyle = "";
            if (graphicObject.GraphicType === 'POLYLINE') {
                overlayCtx.beginPath();

                graphicObject.GraphicData.forEach(function (point, index) {
                    const x = point.Column * (overlayCanvas.width / maxX);
                    const y = point.Row * (overlayCanvas.height / maxY);

                    if (index === 0) {
                        overlayCtx.moveTo(x, y);
                    } else {
                        overlayCtx.lineTo(x, y);
                    }
                });

                // 닫힌 도형이면 마지막 점과 첫 번째 점을 연결
                if (graphicObject.ClosedForPresentation === 'CLOSED') {
                    overlayCtx.closePath();
                }
                if (maxX > 1500 || maxY > 1500) {
                    overlayCtx.strokeStyle = "#c0504d";
                    overlayCtx.stroke();
                } else {
                    overlayCtx.fillStyle = "#c0504d";
                    const gradiants =
                        overlayCtx.strokeStyle = "#7fff00";
                    overlayCtx.fill();
                    overlayCtx.stroke();
                }

            }
        });
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

        if (stackData[firstCharacter].currentImageIdIndex >= 0 && stackData[firstCharacter].currentImageIdIndex<stack[firstCharacter].imageIds[0].length) {
            stackData[firstCharacter].currentImageIdIndex++;
            //stack[firstCharacter].currentImageIdIndex++;
            stackUpDown(element, firstCharacter, csViewportParent);
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

        if (stackData[firstCharacter].currentImageIdIndex > 0) {
            stackData[firstCharacter].currentImageIdIndex--;
            //stack[firstCharacter].currentImageIdIndex--;
            stackUpDown(element, firstCharacter, csViewportParent);
        }
    }
}

async function stackUpDown(element, firstCharacter, csViewportParent) {
    try {
        const dicomFile = await getDicomFile(firstCharacter);

        const blobUrl = dicomFile.replace('dicomweb:', '');
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        const arrayBuffer = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                resolve(event.target.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsArrayBuffer(blob);
        });

        const byteArray = new Uint8Array(arrayBuffer);
        const dataSet = dicomParser.parseDicom(byteArray);

        const indexSpan = csViewportParent.querySelector('.imageNumber');

        // Update image number with x00200013 value
        const imageNumberValue = dataSet.string('x00200013');
        if (indexSpan) {
            indexSpan.textContent = imageNumberValue;
        }

        // Load and display the image using Cornerstone
        await cornerstone.loadImage(dicomFile).then(image => {
            cornerstone.displayImage(element, image);
            overlayAiPresent(firstCharacter);
        });
    } catch (error) {
        console.error(error);
    }
}


//GridLayout 만들기
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

//마우스 위치에 따른 레이아웃 색상 변경
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

//마우스 위치에 따른 레이아웃 색상 초기화
function resetBackgroundColor() {
    const allDivs = document.querySelectorAll('.table');

    allDivs.forEach(div => {
        div.style.backgroundColor = '';
    });
}

//선택한 레이아웃 외 parentDiv none
function hideDicomImage(index) {
    const parentDivs = document.getElementsByClassName('parentDiv');
    const parentDiv = parentDivs[index];
    parentDiv.style.display = 'none';

}

//선택한 레이아웃 만큰 parentDiv block
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



createParentDiv();
viewDicom();
