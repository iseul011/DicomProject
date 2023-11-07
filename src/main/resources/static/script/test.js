async function getImage() {
    try {
        let seriesTabList = await getSeriesTab();

        for (const item of seriesTabList) {
            let directoryPath = await getImagePath(item.studykey, item.serieskey);
            let response = await axios.get("/getFiles", {
                params: {
                    directoryPath: directoryPath
                }
            });

            if (response.status === 200) {
                let receivedImages = response.data;

                for (let i = 0; i < receivedImages.length; i++) {
                    let imgElement = document.createElement('img');
                    imgElement.src = "data:image/png;base64," + receivedImages[i];
                    document.getElementById('img').appendChild(imgElement);
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

getImage();
