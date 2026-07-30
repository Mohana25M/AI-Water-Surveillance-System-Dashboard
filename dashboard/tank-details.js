import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBVhcKW8MHsftwDmfpWwWaU3cqjqyngOWw",
    authDomain: "ai-water-surveillance-system.firebaseapp.com",
    projectId: "ai-water-surveillance-system",
    storageBucket: "ai-water-surveillance-system.firebasestorage.app",
    messagingSenderId: "476011640625",
    appId: "1:476011640625:web:405683d56efbef66612210"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore Document
const tankRef = doc(db, "water_tanks", "demo_tank_001");

// Real-time Data
onSnapshot(tankRef, (snapshot) => {

    if (!snapshot.exists()) return;

    const data = snapshot.data();
document.getElementById("detailTankName").textContent =
    data.tank_name || "Not Available";

document.getElementById("detailLocation").textContent =
    data.location || "Not Available";

document.getElementById("detailLevel").textContent =
    (data.water_level ?? "--") + "%";

document.getElementById("detailTemperature").textContent =
    (data.temperature ?? "--") + " °C";

document.getElementById("detailPH").textContent =
    data.ph ?? "--";

document.getElementById("detailTDS").textContent =
    (data.tds ?? "--") + " ppm";

document.getElementById("detailTurbidity").textContent =
    (data.turbidity ?? "--") + " NTU";

document.getElementById("detailBattery").textContent =
    (data.battery ?? "--") + "%";

document.getElementById("detailDevice").textContent =
    data.device_status || "Offline";

document.getElementById("detailSolar").textContent =
    data.solar_status || "Unknown";

});


// =========================
// Water Level Chart
// =========================

const waterCtx = document.getElementById("waterLevelChart");

if (waterCtx) {

new Chart(waterCtx,{

type:"line",

data:{

labels:["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

datasets:[{

label:"Water Level",

data:[95,93,90,88,90,89],

borderColor:"#00c3ff",

backgroundColor:"rgba(0,195,255,0.2)",

fill:true,

tension:0.4

}]

},

options:{

responsive:true,

maintainAspectRatio:false

}

});

}




// =========================
// Temperature Chart
// =========================

const tempCtx = document.getElementById("temperatureChart");

if(tempCtx){

new Chart(tempCtx,{

type:"line",

data:{

labels:["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

datasets:[{

label:"Temperature",

data:[27,28,29,30,29,28],

borderColor:"#ef4444",

backgroundColor:"rgba(239,68,68,0.2)",

fill:true,

tension:0.4

}]

},

options:{

responsive:true,

maintainAspectRatio:false

}

});

}
