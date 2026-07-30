import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tankRef = doc(db, "water_tanks", "demo_tank_001");




// History Arrays
const labels = [];

const waterHistory = [];
const tempHistory = [];
const phHistory = [];
const tdsHistory = [];
const turbidityHistory = [];
const batteryHistory = [];

const waterChart = new Chart(document.getElementById("waterChart"),{

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

}

});



const phChart = new Chart(document.getElementById("phChart"),{


type:"line",

data:{

labels:["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

datasets:[{

label:"pH",

data:[7.0,7.1,7.2,7.1,7.3,7.2],

borderColor:"#22c55e",

fill:false,

tension:0.4

}]

}

});



const tdsChart = new Chart(document.getElementById("tdsChart"),{

type:"bar",

data:{

labels:["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

datasets:[{

label:"TDS",

data:[170,175,180,182,178,180],

backgroundColor:"#f59e0b"

}]

}

});


const temperatureChart = new Chart(document.getElementById("temperatureChart"),{

type: "line",

data: {

labels: ["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

datasets: [{

label: "Temperature",

data: [27,28,29,30,29,28],

borderColor: "#ef4444",

backgroundColor: "rgba(239,68,68,0.2)",

fill: true,

tension: 0.4

}]

}

});

const turbidityChart = new Chart(document.getElementById("turbidityChart"),{


type: "line",

data: {

labels: ["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

datasets: [{

label: "Turbidity",

data: [2,3,3,4,3,3],

borderColor: "#06b6d4",

backgroundColor: "rgba(6,182,212,0.2)",

fill: true,

tension: 0.4

}]

}

});


const batteryChart = new Chart(document.getElementById("batteryChart"),{

type: "bar",

data: {

labels: ["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

datasets: [{

label: "Battery",

data: [100,98,96,95,93,90],

backgroundColor: "#22c55e"

}]

}

});


document.getElementById("avgWater").textContent = "90%";
document.getElementById("avgTemp").textContent = "28°C";
document.getElementById("avgPH").textContent = "7.2";
document.getElementById("avgTDS").textContent = "180 ppm";


onSnapshot(tankRef, (snapshot) => {

    if (!snapshot.exists()) return;

    const data = snapshot.data();

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    labels.push(time);
    waterHistory.push(data.water_level);
    tempHistory.push(data.temperature);
    phHistory.push(data.ph);
    tdsHistory.push(data.tds);
    turbidityHistory.push(data.turbidity);
    batteryHistory.push(data.battery);

    // Keep only last 10 readings
    if (labels.length > 10) {
        labels.shift();
        waterHistory.shift();
        tempHistory.shift();
        phHistory.shift();
        tdsHistory.shift();
        turbidityHistory.shift();
        batteryHistory.shift();
    }

    updateCharts();

    document.getElementById("avgWater").textContent = data.water_level + "%";
    document.getElementById("avgTemp").textContent = data.temperature + "°C";
    document.getElementById("avgPH").textContent = data.ph;
    document.getElementById("avgTDS").textContent = data.tds + " ppm";

});




function updateCharts() {

    waterChart.data.labels = labels;
    waterChart.data.datasets[0].data = waterHistory;
    waterChart.update();

    temperatureChart.data.labels = labels;
    temperatureChart.data.datasets[0].data = tempHistory;
    temperatureChart.update();

    phChart.data.labels = labels;
    phChart.data.datasets[0].data = phHistory;
    phChart.update();

    tdsChart.data.labels = labels;
    tdsChart.data.datasets[0].data = tdsHistory;
    tdsChart.update();

    turbidityChart.data.labels = labels;
    turbidityChart.data.datasets[0].data = turbidityHistory;
    turbidityChart.update();

    batteryChart.data.labels = labels;
    batteryChart.data.datasets[0].data = batteryHistory;
    batteryChart.update();

}