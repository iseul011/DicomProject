function getImage(form) {
    var directoryPath = encodeURIComponent(form.path.value);
    var receivedImages;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getFiles?directoryPath=" + directoryPath, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {

            receivedImages = JSON.parse(xhr.responseText);

            var container = document.getElementById('img'); // 캔버스 컨테이너

            for (var i = 0; i < receivedImages.length; i++) {
                (function(i) {
                    var canvasElement = document.createElement('canvas');
                    canvasElement.id = 'canvas' + i; // Unique ID for each canvas
                    container.appendChild(canvasElement);

                    var canvas = document.getElementById('canvas' + i);
                    var context = canvas.getContext('2d');

                    var imgElement = document.createElement('img');
                    imgElement.src = "data:image/png;base64," + receivedImages[i];

                    imgElement.onload = function() {
                        canvas.width = imgElement.width;
                        canvas.height = imgElement.height;
                        context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

                        cornerstone.enable(canvas);
                        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
                        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
                    };
                })(i);
            }

        }
    };
    var data = {
        path: form.path.value
    };
    xhr.send(JSON.stringify(data));
}
