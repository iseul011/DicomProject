<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login Page</title>
    <meta charset="UTF-8">
</head>
<body>
<style>
    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: white;
    }

    body {
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
        background: #383838;
    }

    input, button {
        border: none;
        outline: none;
        background: none;
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
    }
    .tip {
        font-size: 20px;
        margin: 40px auto 50px;
        text-align: center;
        height: 120px;
    }
    .cont {
        overflow: hidden;
        position: relative;
        width: 900px;
        height: 550px;
        margin: 0 auto 100px;
        background: #1c1e1f;
    }
    .form {
        position: relative;
        width: 900px;
        height: 200%;
        transition: transform 1.2s ease-in-out;
        padding: 100px 30px 0;
    }
    .cont.s--signup {
        transform: translate3d(-640px, 0, 0);
    }
    button {
        display: block;
        margin: 0 auto;
        width: 260px;
        height: 36px;
        border-radius: 30px;
        color: #fff;
        font-size: 15px;
        cursor: pointer;
    }

    .img__text h2 {
        margin-bottom: 10px;
        font-weight: normal;
    }
    .img__text p {
        font-size: 14px;
        line-height: 1.5;
    }
    .img__btn span {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transition: transform 1.2s;
    }
    .cont.s--signup .img__btn span {
        transform: translateY(0);
    }
    .cont.s--signup .img__btn span {
        transform: translateY(72px);
    }
    h2 {
        width: 100%;
        font-size: 26px;
        text-align: center;
        color : #fff;
        font-family: 굴림;
    }
    label {
        display: block;
        width: 260px;
        margin: 25px auto 0;
        text-align: center;
    }
    label span {
        font-size: 12px;
        color: #cfcfcf;
        text-transform: uppercase;
    }
    input {
        display: block;
        width: 100%;
        margin-top: 5px;
        padding-bottom: 5px;
        font-size: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        text-align: center;
    }
    .submit {
        margin-top: 40px;
        margin-bottom: 20px;
        background: #266eff;
        text-transform: uppercase;
    }

    .fb-btn span {
        font-weight: bold;
        color: #455a81;
    }

    .sign-in {
        transition-timing-function: ease-out;
    }
    .cont.s--signup .sign-in {
        transition-timing-function: ease-in-out;
        transition-duration: 1.2s;
        transform: translate3d(640px, 0, 0);
    }
</style>
<p class="tip"></p>
<div class="cont">
    <div class="form sign-in">
        <h2>MEDIVISION</h2>
        <form action="/login" method="post">
            <label for="username">
                <span>Id</span>
                <input type="text" id="username" name="username" required />
            </label>
            <label  for="password">
                <span>Password</span>
                <input type="password" id="password" name="password" required />
            </label>
            <button class="submit" type="submit">Sign In</button>
        </form>
    </div>
</div>
</body>
</html>

