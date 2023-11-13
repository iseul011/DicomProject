// DICOM 이미지 메타데이터 가져오기
async function getDicomMetadata(arrayBuffer) {
    // DICOM 파일의 바이트 배열을 Uint8Array로 변환하여 메타데이터를 파싱
    const byteArray = new Uint8Array(arrayBuffer);
    return dicomParser.parseDicom(byteArray);
}

// DICOM 이미지 표시
function displayDicomImage(arrayBuffer, seriesinsuid) {
    // DICOM 파일의 ArrayBuffer를 Blob으로 변환하고 이를 이용해 이미지 URL 생성
    const imageUrl = URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }));

    // DICOM 이미지의 unique identifier를 이용하여 뷰포트 엘리먼트 생성
    const imageId = `dicomweb:${imageUrl}`;
    const viewportElement = createViewportElement(seriesinsuid);

    // 뷰포트 엘리먼트를 화면에 추가
    document.getElementById('dicomImageContainer').appendChild(viewportElement);

    // Cornerstone 라이브러리를 이용하여 이미지 로드 및 표시
    cornerstone.enable(viewportElement);
    cornerstone.loadImage(imageId).then(image => {
        cornerstone.displayImage(viewportElement, image);
    });

    // 이미지 URL을 해제하여 메모리 누수 방지
    URL.revokeObjectURL(imageUrl);
}

// ViewDicom 메인 함수
async function viewDicom() {
    // CornerstoneWADOImageLoader 설정
    configureCornerstoneWADO();

    try {
        // 시리즈 탭 리스트 가져오기
        const seriesTabList = await getSeriesTab();

        // 각 시리즈에 대한 이미지 처리
        const promises = seriesTabList.map(async (item) => {
            const directoryPath = await getImagePath(item.studykey, item.seriesinsuid);
            const arrayBuffer = await getDicomFile(directoryPath);
            const dataSet = await getDicomMetadata(arrayBuffer);
            displayDicomImage(arrayBuffer, item.seriesinsuid);
        });

        // 모든 이미지 로드가 완료될 때까지 대기
        await Promise.all(promises);
    } catch (error) {
        console.error(error);
    }
}

// CornerstoneWADOImageLoader 설정 함수
function configureCornerstoneWADO() {
    // CornerstoneWADOImageLoader에 Cornerstone 및 dicomParser 설정
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
}

// 시리즈 탭 정보 가져오기 함수
async function getSeriesTab() {
    // 현재 페이지의 Study Key를 가져와 시리즈 탭 정보를 요청
    const studykey = getStudyKeyFromPath();
    const response = await axios.get("/v1/storage/search/PacsSeriestab", {
        params: {
            studykey
        }
    });

    // HTTP 상태가 200일 경우에만 데이터 반환
    if (response.status === 200) {
        return response.data;
    }
}

// 이미지 경로 가져오기 함수
async function getImagePath(studykey, seriesinsuid) {
    // Study Key와 Series Unique Identifier를 이용하여 이미지 경로 요청
    const response = await axios.get("/getImagePath", { params: { studykey, seriesinsuid } });

    // HTTP 상태가 200일 경우에만 데이터 반환
    if (response.status === 200) {
        return response.data;
    }
}

// 이미지 파일 가져오기 함수
async function getDicomFile(directoryPath) {
    // 이미지 디렉토리 경로를 이용하여 DICOM 파일 요청
    const response = await axios.get("/getDicomFile", { params: { directoryPath }, responseType: 'arraybuffer' });

    // HTTP 상태가 200일 경우에만 데이터 반환
    if (response.status === 200) {
        return response.data;
    }
}

// Viewport 엘리먼트 생성 함수
function createViewportElement(seriesinsuid) {
    // 시리즈 Unique Identifier를 이용하여 Viewport 엘리먼트 생성
    const viewportElement = document.createElement('div');
    viewportElement.classList.add('CSViewport');
    viewportElement.style.width = '500px';
    viewportElement.style.height = '500px';
    viewportElement.id = `viewport-${seriesinsuid}`;
    return viewportElement;
}

// 현재 페이지의 Study Key 가져오기 함수
function getStudyKeyFromPath() {
    // 현재 페이지의 경로를 이용하여 Study Key 추출
    const pathArray = window.location.pathname.split('/');
    return pathArray[2];
}

function zoomIn() {
    const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
    const viewport = cornerstone.getViewport(activeViewport);
    viewport.scale += 0.01;
    cornerstone.setViewport(activeViewport, viewport);
}

function zoomOut() {
    const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;
    const viewport = cornerstone.getViewport(activeViewport);
    viewport.scale -= 0.01;
    cornerstone.setViewport(activeViewport, viewport);
}

function invertImage() {
    const activeViewport = cornerstone.getEnabledElement(document.querySelector('.CSViewport')).element;

    // 이미지가 로드되었는지 확인
    const imageLoaded = cornerstone.getEnabledElement(activeViewport).image;
    if (!imageLoaded) {
        console.error('Image not loaded.');
        return;
    }

    // 이미지 데이터 가져오기
    const imageData = cornerstone.getPixels(activeViewport);

    // pixelData가 있는지 확인
    if (!imageData || !imageData.pixelData) {
        console.error('Pixel data not available.');
        return;
    }

    // 각 픽셀에 대해 RGB 값을 반전
    const pixelData = imageData.pixelData;
    for (let i = 0; i < pixelData.length; i++) {
        pixelData[i] = 255 - pixelData[i]; // 255에서 현재 픽셀 값 뺀 값으로 반전
    }

    // 이미지 데이터를 업데이트하여 새로 그림
    cornerstone.updateImage(activeViewport);
}

// 메인 함수 호출
viewDicom();
