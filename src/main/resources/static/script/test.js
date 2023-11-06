import axios from "axios";


function getImage(form) {
    let directoryPath = encodeURIComponent(form.path.value);

    axios.get("/getFiles", {
        params: {
            directoryPath: directoryPath
        }
    })
        .then(response => {
            if (response.status === 200) {
                let receivedImages = response.data;
                console.log(receivedImages.length);

                for (let i = 0; i < receivedImages.length; i++) {
                    let imgElement = document.createElement('img');
                    imgElement.src = "data:image/png;base64," + receivedImages[i];
                    console.log(imgElement);
                    document.getElementById('img').appendChild(imgElement);
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function getImagePath(){
    const pathArray = window.location.pathname.split('/');
    const studykey = pathArray[2];

    axios.get("/getImagePath", {
        params : {
            studykey : studykey
        }
    })
        .then(response=>{
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error(error);
        });
}