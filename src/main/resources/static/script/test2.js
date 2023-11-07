
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
                serieskey: serieskey,
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}



let currentIndex = 0;
let receivedImages = [];
let isMouseOverImage = false;

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
                receivedImages = response.data;
                renderImage(receivedImages[currentIndex]);

                let imgElement = document.createElement('img');
                imgElement.src = "data:image/png;base64," + receivedImages[currentIndex];
                imgElement.onload = function() {
                    adjustBrightness();
                };

                imgElement.addEventListener('mouseover', function() {
                    isMouseOverImage = true;
                });

                imgElement.addEventListener('mouseout', function() {
                    isMouseOverImage = false;
                });
            }
        }

        window.addEventListener('scroll', function(event) {
            if (!isMouseOverImage) {
                if (event.deltaY > 0 && currentIndex < receivedImages.length - 1) {
                    currentIndex++;
                    renderImage(receivedImages[currentIndex]);
                } else if (event.deltaY < 0 && currentIndex > 0) {
                    currentIndex--;
                    renderImage(receivedImages[currentIndex]);
                }
                event.preventDefault();
            }
        });
    } catch (error) {
        console.error(error);
    }
}
document.getElementById('brightnessButton').addEventListener('click', function() {
    adjustBrightness();
});

function adjustBrightness() {
    let imgElements = document.querySelectorAll('#img img');

    imgElements.forEach(imgElement => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] += 50; // R
            imageData.data[i + 1] += 50; // G
            imageData.data[i + 2] += 50; // B
        }

        ctx.putImageData(imageData, 0, 0);

        imgElement.src = canvas.toDataURL('image/png');
    });


    let canvasHovered = false;

    document.getElementById('imageCanvas').addEventListener('mouseenter', function() {
        canvasHovered = true;
    });

    document.getElementById('imageCanvas').addEventListener('mouseleave', function() {
        canvasHovered = false;
    });

    window.addEventListener('scroll', function() {
        if (canvasHovered) {
            return;
        }

        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight = window.innerHeight;
        let totalHeight = document.body.scrollHeight;

        if (scrollTop + windowHeight >= totalHeight && currentIndex < receivedImages.length - 1) {
            currentIndex++;
            renderImage(receivedImages[currentIndex]);
        }

        if (scrollTop === 0 && currentIndex > 0) {
            currentIndex--;
            renderImage(receivedImages[currentIndex]);
        }
    });
}
function enableScrolling() {
    let canvasHovered = false;

    document.getElementById('imageCanvas').addEventListener('mouseenter', function() {
        canvasHovered = true;
    });

    document.getElementById('imageCanvas').addEventListener('mouseleave', function() {
        canvasHovered = false;
    });

    window.addEventListener('scroll', function() {
        if (canvasHovered) {
            return;
        }

        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight = window.innerHeight;
        let totalHeight = document.body.scrollHeight;

        if (scrollTop + windowHeight >= totalHeight && currentIndex < receivedImages.length - 1) {
            currentIndex++;
            renderImage(receivedImages[currentIndex]);
        }

        if (scrollTop === 0 && currentIndex > 0) {
            currentIndex--;
            renderImage(receivedImages[currentIndex]);
        }
    });
}


function renderImage(imageData) {
    let imgElement = document.createElement('img');
    imgElement.src = "data:image/png;base64," + imageData;
    document.getElementById('img').innerHTML = '';
    document.getElementById('img').appendChild(imgElement);
}

getImage();
