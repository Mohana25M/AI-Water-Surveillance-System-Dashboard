import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ====================================
// Firebase Configuration
// ====================================

const firebaseConfig = {
    apiKey: "AIzaSyBVhcKW8MHsftwDmfpWwWaU3cqjqyngOWw",
    authDomain: "ai-water-surveillance-system.firebaseapp.com",
    projectId: "ai-water-surveillance-system",
    storageBucket: "ai-water-surveillance-system.firebasestorage.app",
    messagingSenderId: "476011640625",
    appId: "1:476011640625:web:405683d56efbef66612210"
};

// ====================================
// Initialize Firebase
// ====================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ====================================
// Firestore Reference
// ====================================

const tankRef = doc(db, "water_tanks", "demo_tank_001");

// ====================================
// Water Level Chart
// ====================================

const tankCanvas = document.getElementById("tankChart");

if (tankCanvas) {

    new Chart(tankCanvas, {

        type: "line",

        data: {

            labels: ["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

            datasets: [{

                label: "Water Level (%)",

                data: [95,93,90,88,90,89],

                borderColor: "#00c3ff",

                backgroundColor: "rgba(0,195,255,0.2)",

                fill: true,

                tension: 0.4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}

// ====================================
// Temperature Chart
// ====================================

const tempCanvas = document.getElementById("tempChart");

if (tempCanvas) {

    new Chart(tempCanvas, {

        type: "line",

        data: {

            labels: ["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

            datasets: [{

                label: "Temperature (°C)",

                data: [27,28,29,30,29,28],

                borderColor: "#ff4d4d",

                backgroundColor: "rgba(255,77,77,0.2)",

                fill: true,

                tension: 0.4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}

// ====================================
// Live Firebase Data
// ====================================

onSnapshot(tankRef, (snapshot) => {

    if (!snapshot.exists()) {

        console.log("No Tank Data Found");

        return;

    }

    const data = snapshot.data();

    document.getElementById("tankWaterLevel").textContent =
        (data.water_level ?? "--") + "%";

    document.getElementById("tankTemp").textContent =
        (data.temperature ?? "--") + "°C";

    document.getElementById("tankPH").textContent =
        data.ph ?? "--";

    document.getElementById("tankTDS").textContent =
        (data.tds ?? "--") + " ppm";

    if (document.getElementById("tankTurbidity")) {
        document.getElementById("tankTurbidity").textContent =
            (data.turbidity ?? "--") + " NTU";
    }

    if (document.getElementById("tankBattery")) {
        document.getElementById("tankBattery").textContent =
            (data.battery ?? "--") + "%";
    }

    if (document.getElementById("tankWifi")) {
        document.getElementById("tankWifi").textContent =
            data.wifi_signal || "Strong";
    }

    if (document.getElementById("tankStatus")) {

        const status = (data.device_status || "ONLINE").toUpperCase();

        document.getElementById("tankStatus").textContent = status;

        document.getElementById("tankStatus").style.color =
            status === "ONLINE" ? "lime" : "red";
    }

});

console.log("✅ Water Tanks Page Loaded Successfully");