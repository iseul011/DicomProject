function renderImages(receivedImages) {
    receivedImages.forEach(function (imageData, index) {
        var divElement = document.createElement("div");
        divElement.id = "dicomImage" + index;
        document.body.appendChild(divElement); // div 태그를 body에 추가

        var canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 300;
        divElement.appendChild(canvas); // canvas를 div에 추가

        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            var isDragging = false;
            var lastX;
            var lastY;
            var scale = 1;

            canvas.addEventListener('mousedown', function(e) {
                isDragging = true;
                lastX = e.offsetX;
                lastY = e.offsetY;
            });

            canvas.addEventListener('mousemove', function(e) {
                if(isDragging) {
                    var deltaX = e.offsetX - lastX;
                    var deltaY = e.offsetY - lastY;
                    lastX = e.offsetX;
                    lastY = e.offsetY;

                    var x = e.offsetX - canvas.width / 2;
                    var y = e.offsetY - canvas.height / 2;

                    var dx = x / scale;
                    var dy = y / scale;

                    scale += deltaY * 0.01;

                    // 최소 스케일 제한
                    if (scale < 1) {
                        scale = 1;
                    }

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.setTransform(scale, 0, 0, scale, canvas.width / 2 + dx * scale, canvas.height / 2 + dy * scale);
                    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
                }
            });

            //마우스 버튼을 눌렀다 뗄 때
            canvas.addEventListener('mouseup', function() {
                isDragging = false;
            });

            //마우스가 캔버스를 벗어날 때
            canvas.addEventListener('mouseleave', function() {
                isDragging = false;
            });
        };
        img.src = "data:image/jpeg;base64," + imageData;
    });
}

function getImage(form) {
    var directoryPath = encodeURIComponent(form.path.value);
    var receivedImages;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getFiles?directoryPath=" + directoryPath, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            receivedImages = JSON.parse(xhr.responseText);

            receivedImages.forEach(function(imageData, index) {
                const decodedData = atob(imageData);
                const arrayBuffer = new ArrayBuffer(decodedData.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < decodedData.length; i++) {
                    uint8Array[i] = decodedData.charCodeAt(i);
                }
                console.log("uint8Array:", uint8Array);
                //const dicomData = dcmjs.data.DicomMessage.readFile(uint8Array);
                const dicomData = dcmjs.DicomMessage.readFile(uint8Array);

                console.log("dicomData:", dicomData);

                const sopInstanceUid = dicomData.dict['x0020000d'].value[0];
                console.log("SOP Instance UID:", sopInstanceUid);

                var divElement = document.createElement("div");
                divElement.id = "dicomImage" + index;

                document.getElementById('img').appendChild(divElement);

                var image = new Image();
                image.src = "data:image/jpeg;base64," + imageData;

                cornerstone.enable(divElement);

                var metadata = cornerstoneWADOImageLoader.wadors.metaDataManager.get(sopInstanceUid,image);
                console.log(metadata);

                cornerstone.loadAndCacheImage(metadata).then(function (image) {
                    console.log('Image loaded successfully:', image);
                    cornerstone.displayImage(divElement, image);
                }).catch(function(error) {
                    console.error('Error loading and caching image:', error);
                });0

            });

        }
    };
    var data = {
        path: form.path.value
    };
    xhr.send(JSON.stringify(data));
}

