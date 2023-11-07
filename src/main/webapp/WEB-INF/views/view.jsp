<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View Converted Image</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
<h1>View Converted Image</h1>
<canvas id="imageCanvas" width="400" height="300"></canvas>
<script>
    $(document).ready(function() {
        // REST API로부터 이미지를 가져오는 함수
        function fetchBase64Image() {
            $.ajax({
                url: '/viewFile', // REST API 엔드포인트 입력
                method: 'GET',
                success: function(data) {
                    displayImageOnCanvas(data); // 이미지를 Canvas에 출력하는 함수 호출
                },
                error: function(error) {
                    console.log('Error fetching image:', error);
                }
            });
        }

        // Canvas에 base64 이미지를 출력하는 함수
        function displayImageOnCanvas(base64Image) {
            var canvas = document.getElementById('imageCanvas');
            var ctx = canvas.getContext('2d');

            var image = new Image();
            image.onload = function() {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
            image.src = 'data:image/png;base64,' + base64Image; // base64 이미지 설정
        }

        fetchBase64Image(); // 페이지 로딩 시 이미지 가져오기
    });
</script>
</body>
</html>
