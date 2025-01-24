
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let message = document.getElementById("loginMessage");

    if (username === "" || password === "") {
        message.textContent = "Please fill all fields!";
        return;
    }


    let storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        message.style.color = "green";
        message.textContent = "Login successful!";
    } else {
        message.textContent = "Invalid username or password!";
    }
}

