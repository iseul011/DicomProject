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

            canvas.addEventListener('mouseup', function() {
                isDragging = false;
            });

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
            renderImages(receivedImages); // 이미지 렌더링 함수 호출
        }
    };
    var data = {
        path: form.path.value
    };
    xhr.send(JSON.stringify(data));
}
