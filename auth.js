
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgLFKLAJuAxhxEqLXl7GqFhhtyp-QWRtQ",
    authDomain: "expenditure-tracker-js.firebaseapp.com",
    projectId: "expenditure-tracker-js",
    storageBucket: "expenditure-tracker-js.firebasestorage.app",
    messagingSenderId: "938742415497",
    appId: "1:938742415497:web:2f25c5fb6c3011e0be4658",
    measurementId: "G-EK9P2K6BQM"
};


const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);


document.getElementById("signUpBtn").addEventListener("click", (e) => {
    e.preventDefault();
    let signUpModal = new bootstrap.Modal(document.getElementById("signUpModal"));
    signUpModal.show();
});

document.getElementById("signUpSubmitBtn").addEventListener("click", async () => {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    if (!name || !email || !password || !confirmPassword) {
        Swal.fire("Error", "All fields are required", "error");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        Swal.fire("Error", "Enter a valid email address", "error");
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match", "error");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        Swal.fire("Success", "Registered successfully", "success").then(() => {
            document.getElementById("signupForm").reset();
            let loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
            loginModal.show();
        });
    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
});


document.getElementById("loginBtn").addEventListener("click", (e) => {
    e.preventDefault();
    let loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show();
});

document.getElementById("loginSubmitBtn").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
        Swal.fire("Error", "All fields are required", "error");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        Swal.fire("Success", "Logged in successfully", "success").then(() => {
            
            document.getElementById("login-email").value = "";
            document.getElementById("login-password").value = "";
            
            location.href = "expenses.html";
        });
    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
});
