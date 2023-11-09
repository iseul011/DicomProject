// async function getImage() {
//     cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
//     cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
//
//     let seriesTabList = await getSeriesTab();
//
//     for (const seriesTab of seriesTabList) {
//         let studykey = seriesTab.studykey;
//         let serieskey = seriesTab.serieskey;
//         let directoryPath = await getImagePath(studykey, serieskey);
//
//         axios.get('/getFiles', {
//             params: {
//                 directoryPath: directoryPath
//             }
//         }) // 서버로부터 모든 DICOM 파일들을 가져오는 API 엔드포인트
//             .then(response => {
//                 const filesMap = response.data;
//                 for (const fileName in filesMap) {
//                     const fileContent = filesMap[fileName];
//                     const imageId = `dicomweb:${URL.createObjectURL(new Blob([fileContent]))}`;
//                     // Cornerstone로 DICOM 이미지를 표시하고 처리
//                     cornerstone.loadImage(imageId).then(image => {
//                         const canvas = document.createElement('canvas');
//                         canvas.id = 'dicomCanvas.' + fileName; // 각 이미지에 대한 고유한 ID
//                         canvas.width = 512;
//                         canvas.height = 512;
//                         document.getElementById('dicomImageContainer').appendChild(canvas);
//                         cornerstone.enable(canvas);
//                         cornerstone.displayImage(canvas, image);
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching DICOM files:', error);
//             });
//     }
// }

async function getImage() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    let seriesTabList = await getSeriesTab();

    for (const seriesTab of seriesTabList) {
        let studykey = seriesTab.studykey;
        let serieskey = seriesTab.serieskey;
        let directoryPath = await getImagePath(studykey, serieskey);

        try {
            const response = await axios.get(`/getFiles`, {
                params: {
                    directoryPath: directoryPath
                }
            });

            const filesList = response.data; // Assuming filesList is an array of ArrayBuffers

            for (const fileData of filesList) {
                const blob = new Blob([fileData], { type: 'application/dicom' });
                const imageId = `dicomweb:${URL.createObjectURL(blob)}`;
                const image = await cornerstone.loadImage(imageId);

                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                document.getElementById('dicomImageContainer').appendChild(canvas);
                cornerstone.enable(canvas);
                cornerstone.displayImage(canvas, image);
            }
        } catch (error) {
            console.error('Error fetching or displaying DICOM files:', error);
        }
    }
}

async function getDicomFiles() {
    try {
        let seriesTabList = await getSeriesTab();

        for (const item of seriesTabList) {
            let directoryPath = await getImagePath(item.studykey, item.serieskey);
            let response = await axios.get("/getDicomFiles", {
                params: {
                    directoryPath: directoryPath
                },
                responseType: 'arraybuffer'
            });

            if (response.status === 200) {
                let arrayBuffer = response.data;
                const options = {TransferSyntaxUID: '1.2.840.10008.1.2.4.50'};
                console.log(arrayBuffer)
                // Parse the DICOM file using dicomParser
                let byteArray = new Uint8Array(arrayBuffer);
                console.log(byteArray)
                let dataSet = dicomParser.parseDicom(byteArray, options);

                // Extract metadata
                var studyInstanceUid = dataSet.string('x0020000d');
                console.log(studyInstanceUid)
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

async function getImagePath(studykey, serieskey) {
    try {
        let response = await axios.get("/getImagePath", {
            params: {
                studykey: studykey,
                serieskey: serieskey
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

function getDicomFile() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    const element = document.getElementById('dicomImage');
    cornerstone.enable(element);

    fetch('/getDicomFile')  // 서버로부터 DICOM 파일을 가져오는 API 엔드포인트
        .then(response => response.blob())
        .then(blob => {
            const imageId = `dicomweb:${URL.createObjectURL(blob)}`;
            cornerstone.loadImage(imageId).then(image => {
                // Cornerstone을 사용하여 DICOM 이미지를 표시하고 처리
                cornerstone.displayImage(element, image);
            });
        })
        .catch(error => {
            console.error('Error fetching DICOM file:', error);
        });
}

getImage();