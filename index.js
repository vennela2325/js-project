// Signup function
function signup() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;
    let message = document.getElementById("signupMessage");

    if (username === "" || password === "") {
        message.textContent = "Please fill all fields!";
        return;
    }

    // Check if user already exists
    if (localStorage.getItem(username)) {
        message.textContent = "User already exists!";
        return;
    }

    // Store user details in localStorage
    localStorage.setItem(username, password);
    message.style.color = "green";
    message.textContent = "Signup successful!";
}

// Login function
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let message = document.getElementById("loginMessage");

    if (username === "" || password === "") {
        message.textContent = "Please fill all fields!";
        return;
    }

    // Retrieve stored password
    let storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        message.style.color = "green";
        message.textContent = "Login successful!";
    } else {
        message.textContent = "Invalid username or password!";
    }
}

function home (){
    window.location.href="home.html"
}