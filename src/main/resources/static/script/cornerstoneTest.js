let stack = {
    currentImageIdIndex: 0,
    imageIds: {},
};
let cont = 4;
function displayDicomImage(arrayBuffer, seriesinsuid) {

    const byteArray = new Uint8Array(arrayBuffer);


    const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }))}`;
    stack.imageIds.push(imageId)
    console.log(stack.imageIds)

    const viewportElement = document.createElement('div');
    viewportElement.classList.add('CSViewport');
    viewportElement.id = `viewport-${seriesinsuid}`;


    cornerstone.enable(viewportElement);
    cornerstone.loadImage(imageId).then(image => {
        cornerstone.displayImage(viewportElement, image);
        cornerstoneTools.addStackStateManager(viewportElement, ['stack']);
        cornerstoneTools.addToolState(viewportElement, 'stack', stack);
    });

}

async function viewDicom() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    try {
        let seriesTabList = await getSeriesTab();
        for (let i = 0; i < seriesTabList.length; i++) {

            let item = seriesTabList[i];

            let directoryPath = await getImagePath(item.studykey, item.seriesinsuid);

            let response = await axios.get("/getDicomFile", {
                params: {
                    directoryPath: directoryPath
                },
                responseType: 'arraybuffer'
            });

            if (response.status === 200) {
                let arrayBuffer = response.data;

                if(i<cont){
                    displayDicomImage(arrayBuffer, item.seriesinsuid);
                }
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