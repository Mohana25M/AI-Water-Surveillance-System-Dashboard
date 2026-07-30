// ===============================
// SETTINGS PAGE JAVASCRIPT
// ===============================

// ===============================
// Profile
// ===============================
const profileBtn = document.getElementById("profileBtn");

if (profileBtn) {
    profileBtn.addEventListener("click", () => {

        alert(
`Administrator Profile

Name : Administrator
Role : System Admin

AI Smart Water Surveillance System`
        );

    });
}

// ===============================
// Notifications
// ===============================
const notificationBtn = document.getElementById("notificationBtn");

if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {

        alert(
`Notification Settings

✔ Water Level Alerts
✔ pH Alerts
✔ TDS Alerts
✔ Turbidity Alerts

Feature coming soon...`
        );

    });
}

// ===============================
// WiFi Settings
// ===============================
const wifiBtn = document.getElementById("wifiBtn");

if (wifiBtn) {

    wifiBtn.addEventListener("click", () => {

        alert(
`ESP32 Wi-Fi Settings

Status : Connected
Signal : Strong

Configuration feature coming soon...`
        );

    });

}

// ===============================
// Database
// ===============================
const databaseBtn = document.getElementById("databaseBtn");

if (databaseBtn) {

    databaseBtn.addEventListener("click", () => {

        alert(
`Firebase Database

Status : Connected

Project :
AI Water Surveillance System`
        );

    });

}

// ===============================
// About Project
// ===============================


const aboutBtn = document.getElementById("aboutBtn");

if (aboutBtn) {

    aboutBtn.addEventListener("click", () => {

        window.location.href = "about.html";

    });

}

// ===============================
// Logout
// ===============================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        if (confirm("Do you want to Logout?")) {

            localStorage.removeItem("isLoggedIn");

            window.location.href = "login.html";

        }

    });

}

// ===============================
// Back Button
// ===============================
const backBtn = document.getElementById("backBtn");

if (backBtn) {

    backBtn.addEventListener("click", () => {

        window.location.href = "index.html";

    });

}

// ===============================
// Dark Mode
// ===============================
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    // Load Saved Theme
    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");

        themeToggle.checked = true;

    }

    // Toggle Theme
    themeToggle.addEventListener("change", () => {

        if (themeToggle.checked) {

            document.body.classList.add("dark-mode");

            localStorage.setItem("theme", "dark");

        } else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem("theme", "light");

        }

    });

}

console.log("Settings Page Loaded Successfully");