<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>

<h2>Login</h2>

<c:if test="${not empty error}">
    <div style="color: red;">${error}</div>
</c:if>

<c:if test="${not empty message}">
    <div style="color: green;">${message}</div>
</c:if>

<form action="/login" method="post">
    <label for="userid">Usernamea:</label>
    <input type="text" id="userid" name="userid" required>
    <br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <br>
    <input type="submit" value="Login">
</form>

</body>
</html>
