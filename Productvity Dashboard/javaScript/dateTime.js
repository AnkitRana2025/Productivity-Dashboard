const currentTime = document.getElementById("currentTime");
const currentDay = document.getElementById("currentDay");

const digitalClock = document.getElementById("digitalClock");

function updateDateTime() {

    const now = new Date();

    // Time
    const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    // Day
    const day = now.toLocaleDateString("en-IN", {
        weekday: "long"
    });

    // Date
    const date = now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Header
    currentTime.textContent = time;
    currentDay.textContent = day;
    
}

updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);