// =======================
// Live Clock
// =======================

function updateTime() {

    const now = new Date();

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    const timeElement = document.getElementById("liveTime");

    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString([], options);
    }

}

updateTime();

setInterval(updateTime, 1000);