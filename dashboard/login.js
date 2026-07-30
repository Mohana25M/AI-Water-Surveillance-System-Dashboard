function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("error");

    // Demo Login Credentials
    const adminUser = "admin";
    const adminPass = "admin123";

    if (username === "" || password === "") {
        message.style.color = "red";
        message.textContent = "Please enter username and password.";
        return;
    }

    if (username === adminUser && password === adminPass) {

        message.style.color = "green";
        message.textContent = "Login Successful! Redirecting...";

        // Save login status
        localStorage.setItem("isLoggedIn", "true");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } else {

        message.style.color = "red";
        message.textContent = "Invalid Username or Password.";

    }

}

