let stack = {
    currentImageIdIndex: 0,
    imageIds: [],
};

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


async function displayDicomImage(i) {
    try {
        const blobUrl = stack[i].imageIds[stack.currentImageIdIndex].replace('dicomweb:', '');
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
        const image = await cornerstone.loadImage(stack[i].imageIds[stack.currentImageIdIndex]);
        cornerstone.displayImage(viewportElement, image);

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

    const parentDiv = document.createElement('div');
    parentDiv.classList.add('parentDiv');

    viewportElement.appendChild(topLeft);
    viewportElement.appendChild(topRight);
    viewportElement.appendChild(bottomRight);
    parentDiv.appendChild(viewportElement);

    document.getElementById('dicomImageContainer').appendChild(parentDiv);

    return viewportElement;
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
            let PRContentList = await getPRContentList(item.studykey, item.serieskey, item.imagecnt);
            let arrayBuffer = null;

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
                PRContentList: PRContentList,
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

            }
            if (i < cont && stack[i].imageIds.length > 0) {
                await displayDicomImage(i);
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

    console.log("다운")
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
        const indexSpan = csViewportParent.querySelector('.imageNumber');
        console.log(indexSpan)

        if (stackData.currentImageIdIndex >= 0 && stackData.currentImageIdIndex < stackData[firstCharacter].imageIds.length - 1) {
            stackData.currentImageIdIndex++;
            stack[firstCharacter].currentImageIdIndex++;
            const nextImageId = stackData[firstCharacter].imageIds[stackData.currentImageIdIndex];
            cornerstone.loadImage(nextImageId).then(image => {
                cornerstone.displayImage(element, image);
                overlayAiPresent(firstCharacter);
            });
        }
    }
}

function stackScrollUp(element) {
    console.log("업")
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
        const indexSpan = csViewportParent.querySelector('.imageNumber');
        console.log(indexSpan)
        if (stackData.currentImageIdIndex > 0) {
            stackData.currentImageIdIndex--;
            stack[firstCharacter].currentImageIdIndex--;
            const prevImageId = stackData[firstCharacter].imageIds[stackData.currentImageIdIndex];
            cornerstone.loadImage(prevImageId).then(image => {
                cornerstone.displayImage(element, image);
                overlayAiPresent(firstCharacter);
            });
        }
    }
}

viewDicom();