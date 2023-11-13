// DICOM 이미지 메타데이터 가져오기
async function getDicomMetadata(arrayBuffer) {
    const byteArray = new Uint8Array(arrayBuffer);
    return dicomParser.parseDicom(byteArray);
}

// DICOM 이미지 표시
function displayDicomImage(arrayBuffer, seriesinsuid) {
    const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }))}`;
    const viewportElement = createViewportElement(seriesinsuid);
    document.getElementById('dicomImageContainer').appendChild(viewportElement);

    cornerstone.enable(viewportElement);
    cornerstone.loadImage(imageId).then(image => {
        cornerstone.displayImage(viewportElement, image);
    });
}

// ViewDicom 메인 함수
async function viewDicom() {
    configureCornerstoneWADO();

    try {
        const seriesTabList = await getSeriesTab();

        for (const item of seriesTabList) {
            const directoryPath = await getImagePath(item.studykey, item.seriesinsuid);
            const arrayBuffer = await getDicomFile(directoryPath);
            const dataSet = await getDicomMetadata(arrayBuffer);
            displayDicomImage(arrayBuffer, item.seriesinsuid);
        }
    } catch (error) {
        console.error(error);
    }
}

// CornerstoneWADOImageLoader 설정
function configureCornerstoneWADO() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
}

// 시리즈 탭 정보 가져오기
async function getSeriesTab() {
    const studykey = getStudyKeyFromPath();
    const response = await axios.get("/v1/storage/search/PacsSeriestab", {
        params: {
            studykey
        }
    });

    if (response.status === 200) {
        return response.data;
    }
}

// 이미지 경로 가져오기
async function getImagePath(studykey, seriesinsuid) {
    const response = await axios.get("/getImagePath", { params: { studykey, seriesinsuid } });

    if (response.status === 200) {
        return response.data;
    }
}

// 이미지 파일 가져오기
async function getDicomFile(directoryPath) {
    const response = await axios.get("/getDicomFile", { params: { directoryPath }, responseType: 'arraybuffer' });

    if (response.status === 200) {
        return response.data;
    }
}

// Viewport 엘리먼트 생성
function createViewportElement(seriesinsuid) {
    const viewportElement = document.createElement('div');
    viewportElement.classList.add('CSViewport');
    viewportElement.style.width = '500px';
    viewportElement.style.height = '500px';
    viewportElement.id = `viewport-${seriesinsuid}`;
    return viewportElement;
}

// 현재 페이지의 Study Key 가져오기
function getStudyKeyFromPath() {
    const pathArray = window.location.pathname.split('/');
    return pathArray[2];
}

// 메인 함수 호출
viewDicom();
