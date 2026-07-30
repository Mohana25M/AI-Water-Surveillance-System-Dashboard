const ctx = document.getElementById("waterLevelChart");

new Chart(ctx, {
    type: "line",
    data: {
        labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM"],
        datasets: [{
            label: "Water Level (%)",
            data: [95, 92, 90, 88, 91, 90],
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
});

new Chart(document.getElementById("waterChart"), {

type: "line",

data: {

labels: ["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

datasets: [{

label: "Water Level",

data: [95,93,90,88,90,89],

borderColor: "#00c3ff",

backgroundColor: "rgba(0,195,255,0.2)",

fill: true,

tension: 0.4

}]

}

});


// Temperature Chart
new Chart(document.getElementById("temperatureChart"), {
    type: "line",
    data: {
        labels: ["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],
        datasets: [{
            label: "Temperature (°C)",
            data: [27,28,29,30,29,28],
            borderColor: "#ff9800",
            backgroundColor: "rgba(255,152,0,0.2)",
            fill: true,
            tension: 0.4
        }]
    }
});


new Chart(document.getElementById("temperatureChart"), {

type: "line",

data: {

labels: ["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],

datasets: [{

label: "Temperature",

data: [27,28,29,30,29,28],

borderColor: "#ff4d4d",

backgroundColor: "rgba(255,77,77,0.2)",

fill: true,

tension: 0.4

}]

}

});


// pH Chart
new Chart(document.getElementById("phChart"), {
    type: "line",
    data: {
        labels: ["10 AM","11 AM","12 PM","1 PM","2 PM","3 PM"],
        datasets: [{
            label: "pH",
            data: [7.0,7.1,7.2,7.1,7.3,7.2],
            borderColor: "#00d4ff",
            backgroundColor: "rgba(0,212,255,0.2)",
            fill: true,
            tension: 0.4
        }]
    }
});
