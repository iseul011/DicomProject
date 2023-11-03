function imaget(form) {
    var directoryPath = encodeURIComponent(form.path.value);
    var receivedImages;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getFiles?directoryPath=" + directoryPath, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        console.log(xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) {

            receivedImages = JSON.parse(xhr.responseText);
            console.log(receivedImages.length);
            for (var i = 0; i < receivedImages.length; i++) {
                var imgElement = document.createElement('img');
                imgElement.src = "data:image/png;base64," + receivedImages[i];
                console.log(imgElement);
                document.getElementById('img').appendChild(imgElement);
            }
        }
    };
    var data = {
        path: form.path.value
    };
    xhr.send(JSON.stringify(data));
}
