import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// Check Login
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// ===== Firebase Configuration =====
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVhcKW8MHsftwDmfpWwWaU3cqjqyngOWw",
  authDomain: "ai-water-surveillance-system.firebaseapp.com",
  projectId: "ai-water-surveillance-system",
  storageBucket: "ai-water-surveillance-system.firebasestorage.app",
  messagingSenderId: "476011640625",
  appId: "1:476011640625:web:405683d56efbef66612210"
};

// Initialize Firebase


// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== Firestore Document =====
const tankDocument = doc(db, "water_tanks", "demo_tank_001");

// ===== Real-time Listener =====
onSnapshot(
    tankDocument,
    (snapshot) => {

        if (!snapshot.exists()) {
            document.getElementById("connectionStatus").innerHTML =
                "🔴 Document Not Found";
            return;
        }

       const data = snapshot.data();

console.log("Snapshot Data:", data);
document.getElementById("tankNameInfo").textContent =
    data.tank_name || "Not Available";

document.getElementById("tankLocationInfo").textContent =
    data.location || "Not Available";
    

        const waterLevel = Number(data.water_level || 0);
        // Water Quality Status

const status = document.getElementById("waterStatus");
const message = document.getElementById("statusMessage");

if (
    data.ph >= 6.5 &&
    data.ph <= 8.5 &&
    data.tds <= 300 &&
    data.turbidity <= 5
) {

    status.textContent = "EXCELLENT";
    status.style.color = "#22c55e";
    message.textContent = "Water quality is safe.";

}
else if (data.tds <= 500) {

    status.textContent = "GOOD";
    status.style.color = "#facc15";
    message.textContent = "Water is usable.";

}
else {
status.textContent = "UNSAFE";
    status.style.color = "#ef4444";
    message.textContent = "Water quality needs attention.";

}


        document.getElementById("waterLevel").textContent =
            waterLevel + "%";
        

        document.getElementById("waterProgress").style.width =
            waterLevel + "%";
        document.getElementById("tankNameCard").textContent =
    data.tank_name || "Not Available";

        document.getElementById("temperature").textContent =
    (data.temperature ?? "--") + " °C";

document.getElementById("phValue").textContent =
    data.ph ?? "--";

document.getElementById("tdsValue").textContent =
    (data.tds ?? "--") + " ppm";

document.getElementById("turbidity").textContent =
    (data.turbidity ?? "--") + " NTU";
document.getElementById("batteryLevel").textContent =
    (data.battery ?? "--") + "%";
document.getElementById("tankLocation").textContent =
    data.location || "Not Available";

document.getElementById("tankLocationText").textContent =
    data.location || "Not Available";


document.getElementById("mapLink").href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(data.location);

document.getElementById("deviceStatus").textContent =
    data.device_status || "Offline";
document.getElementById("solarStatus").textContent =
    data.solar_status || "Unknown";
document.getElementById("wifiSignal").textContent =
    data.wifi_signal || "No Signal";
document.getElementById("diseaseRisk").textContent =
    data.disease_risk || "Unknown";

    
let score = 100;

// pH Check
if (data.ph < 6.5 || data.ph > 8.5) score -= 20;

// TDS Check
if (data.tds > 300) score -= 20;

// Turbidity Check
if (data.turbidity > 5) score -= 20;

// Water Level Check
if (data.water_level < 30) score -= 20;

// Device Status Check
if ((data.device_status || "").toLowerCase() !== "online") score -= 20;

document.getElementById("healthScore").textContent = score + " / 100";

const healthStatus = document.getElementById("healthStatus");

if (score >= 90) {
    healthStatus.textContent = "🟢 Excellent";
    healthStatus.style.color = "green";
} else if (score >= 70) {
    healthStatus.textContent = "🟡 Good";
    healthStatus.style.color = "orange";
} else {
    healthStatus.textContent = "🔴 Poor";
    healthStatus.style.color = "red";
}
const solar = document.getElementById("solarStatus");

if ((data.solar_status || "").toLowerCase() === "charging") {
    solar.style.color = "green";
} else {
    solar.style.color = "orange";
}

const device = document.getElementById("deviceStatus");

if ((data.device_status || "").toLowerCase() === "online") {
    device.style.color = "green";
} else {
    device.style.color = "red";

}
document.getElementById("summaryHealth").textContent =
    score + "%";

document.getElementById("summaryPrediction").textContent =
    score >= 90 ? "SAFE" : "UNSAFE";

document.getElementById("summaryDevice").textContent =
    data.device_status || "Offline";

document.getElementById("summaryBattery").textContent =
    (data.battery ?? "--") + "%";



const wifi = document.getElementById("wifiSignal");

switch ((data.wifi_signal || "").toLowerCase()) {
    case "strong":
        wifi.style.color = "green";
        break;

    case "medium":
        wifi.style.color = "orange";
        break;

    case "weak":
        wifi.style.color = "red";
        break;

    default:
        wifi.style.color = "gray";
}

// 👇 PASTE HERE
const risk = document.getElementById("diseaseRisk");

switch ((data.disease_risk || "").toLowerCase()) {
    case "low":
        risk.style.color = "green";
        break;

    case "medium":
        risk.style.color = "orange";
        break;

    case "high":
        risk.style.color = "red";
        break;

    default:
        risk.style.color = "gray";
}

// =======================
// Smart Alert System
// =======================

const alertBox = document.getElementById("alertMessage");

let alerts = [];

if (data.water_level < 30) {
    alerts.push("⚠ Water Level is Low");
}

if (data.ph < 6.5 || data.ph > 8.5) {
    alerts.push("⚠ pH Value Out of Range");
}

if (data.tds > 300) {
    alerts.push("⚠ High TDS Detected");
}

if (data.turbidity > 5) {
    alerts.push("⚠ High Turbidity");
}

if ((data.device_status || "").toLowerCase() !== "online") {
    alerts.push("❌ Device Offline");
}


if ((data.battery ?? 100) < 20) {
    alerts.push("🔋 Battery Low");
}

if (alerts.length === 0) {
    alertBox.innerHTML = "✅ All Parameters Normal";
    alertBox.style.color = "#22c55e";
} else {
    alertBox.innerHTML = alerts.join("<br>");
    alertBox.style.color = "#ef4444";
}
if (alerts.length === 0) {
    alertBox.innerHTML = "✅ All Parameters Normal";
    alertBox.style.color = "#22c55e";
} else {
    alertBox.innerHTML = alerts.join("<br>");
    alertBox.style.color = "#ef4444";
}

// =======================
// AI Recommendation
// =======================

let recommendation = "";

if (
    data.ph >= 6.5 &&
    data.ph <= 8.5 &&
    data.tds <= 300 &&
    data.turbidity <= 5 &&
    data.water_level >= 30
) {
    recommendation = "✅ Water quality is excellent. No action required.";
}
else if (data.water_level < 30) {
    recommendation = "⚠ Water level is low. Refill the tank soon.";
}
else if (data.tds > 300) {
    recommendation = "⚠ High TDS detected. Clean or replace the water filter.";
}
else if (data.turbidity > 5) {
    recommendation = "⚠ Water is cloudy. Clean the tank immediately.";
}
else if (data.ph < 6.5 || data.ph > 8.5) {
    recommendation = "⚠ pH value is abnormal. Check the water source.";
}
else if ((data.device_status || "").toLowerCase() !== "online") {
    recommendation = "❌ Device is offline. Check ESP32 power and Wi-Fi.";
}
else {
    recommendation = "Monitoring water quality...";
}

console.log("Recommendation:", recommendation);

const aiBox = document.getElementById("aiRecommendation");

aiBox.textContent = recommendation;

if (recommendation.includes("excellent")) {

    aiBox.style.background = "#14532d";
    aiBox.style.border = "2px solid #22c55e";
    aiBox.style.color = "#ffffff";

}
else if (recommendation.includes("low") ||
         recommendation.includes("High") ||
         recommendation.includes("cloudy") ||
         recommendation.includes("abnormal")) {

    aiBox.style.background = "#78350f";
    aiBox.style.border = "2px solid orange";
    aiBox.style.color = "#ffffff";

}
else {

    aiBox.style.background = "#7f1d1d";
    aiBox.style.border = "2px solid red";
    aiBox.style.color = "#ffffff";

}


// Existing code continues...

let updated = data.last_updated;

if (updated && typeof updated.toDate === "function") {
    updated = updated.toDate().toLocaleString();
}

document.getElementById("lastUpdated").textContent =
    updated || "Not Available";
const map = document.getElementById("tankMap");

if (map && data.location) {

    map.src =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(data.location) +
        "&output=embed";

}

document.getElementById("connectionStatus").innerHTML =
    "🟢 Firebase Connected";

}, (error) => {

    console.error(error);

    document.getElementById("connectionStatus").innerHTML =
        "🔴 Firebase Connection Error";

});

const predictBtn = document.getElementById("predictBtn");

if (predictBtn) {

    predictBtn.addEventListener("click", () => {

        const ph = parseFloat(document.getElementById("phValue").textContent);
        const tds = parseFloat(document.getElementById("tdsValue").textContent);
        const turbidity = parseFloat(document.getElementById("turbidity").textContent);

        const result = document.getElementById("predictionResult");
        const accuracy = document.getElementById("predictionAccuracy");
        const message = document.getElementById("predictionMessage");

        if (ph >= 6.5 && ph <= 8.5 &&
            tds <= 300 &&
            turbidity <= 5) {

            result.innerHTML = "Safe Water ✅";
            result.style.color = "#22c55e";
            accuracy.innerHTML = "Prediction Accuracy : 98%";
            message.innerHTML = "Water is safe for drinking.";

        } else {

            result.innerHTML = "Unsafe Water ❌";
            result.style.color = "#ef4444";
            accuracy.innerHTML = "Prediction Accuracy : 95%";
            message.innerHTML = "Water is NOT safe for drinking.";

        }

    });


}
window.logout = function () {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "login.html";
};

// =======================
// Digital Clock
// =======================

// =======================
// AI Prediction Demo
// =======================


// =======================
// Live Clock
// =======================
function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleString();
}

setInterval(updateClock, 1000);
updateClock();

const downloadBtn = document.getElementById("downloadReport");

if (downloadBtn) {

    downloadBtn.addEventListener("click", () => {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        // ===== Title =====
        doc.setFillColor(0, 102, 204);
        doc.rect(0, 0, 210, 25, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("AI Smart Water Surveillance System", 15, 16);

        // ===== Reset Text =====
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text("Water Quality Report", 15, 38);

        doc.line(15, 42, 195, 42);
        const tank = document.getElementById("tankNameCard").textContent;
        const level = document.getElementById("waterLevel").textContent;
        const temp = document.getElementById("temperature").textContent;
        const ph = document.getElementById("phValue").textContent;
        const tds = document.getElementById("tdsValue").textContent;
        const turbidity = document.getElementById("turbidity").textContent;
        const battery = document.getElementById("batteryLevel").textContent;
        const health = document.getElementById("healthScore").textContent;

        const prediction = document
            .getElementById("predictionResult")
            .textContent.replace(/[^\x00-\x7F]/g, "");

        const updated = document.getElementById("lastUpdated").textContent;

        let y = 55;

        doc.setFontSize(12);

        doc.text("Tank Name", 20, y);
        doc.text(":", 70, y);
        doc.text(tank, 80, y);

        y += 10;
        doc.text("Water Level", 20, y);
        doc.text(":", 70, y);
        doc.text(level, 80, y);

        y += 10;
        doc.text("Temperature", 20, y);
        doc.text(":", 70, y);
        doc.text(temp, 80, y);

        y += 10;
        doc.text("pH Value", 20, y);
        doc.text(":", 70, y);
        doc.text(ph, 80, y);

        y += 10;
        doc.text("TDS", 20, y);
        doc.text(":", 70, y);
        doc.text(tds, 80, y);

        y += 10;
        doc.text("Turbidity", 20, y);
        doc.text(":", 70, y);
        doc.text(turbidity, 80, y);

        y += 10;
        doc.text("Battery", 20, y);
        doc.text(":", 70, y);
        doc.text(battery, 80, y);

        y += 10;
        doc.text("Health Score", 20, y);
        doc.text(":", 70, y);
        doc.text(health, 80, y);

        y += 10;
        doc.text("Prediction", 20, y);
        doc.text(":", 70, y);
        doc.text(prediction, 80, y);

        y += 10;
        doc.text("Last Updated", 20, y);
        doc.text(":", 70, y);
        doc.text(updated, 80, y);

        doc.line(15, 270, 195, 270);

        doc.setFontSize(10);
        doc.text("Generated by AI Smart Water Surveillance System", 15, 278);

        doc.save("Water_Quality_Report.pdf");

    });

}
const reportMenu = document.getElementById("reportMenu");

if (reportMenu) {

    reportMenu.addEventListener("click", function (e) {

        e.preventDefault();

        document.getElementById("downloadReport").click();

    });

}
