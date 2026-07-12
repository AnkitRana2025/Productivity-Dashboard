// ================= Elements =================

const watchHours = document.getElementById("watchHours");
const watchMinutes = document.getElementById("watchMinutes");
const watchSeconds = document.getElementById("watchSeconds");
const watchAmPm = document.getElementById("watchAmPm");

const watchDay = document.getElementById("watchDay");
const watchDate = document.getElementById("watchDate");

const watchGreeting = document.getElementById("watchGreeting");
const watchIcon = document.getElementById("watchIcon");

const smartWatchWidget = document.getElementById("smartWatchWidget");

// ================= Update Clock =================

function updateClock() {

    const now = new Date();

    let hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // ================= AM / PM =================

    watchAmPm.textContent = hour >= 12 ? "PM" : "AM";

    // Remove Previous Theme
    smartWatchWidget.classList.remove(
        "morning",
        "afternoon",
        "evening",
        "night"
    );

    // ================= Greeting =================

    if (hour >= 5 && hour < 12) {

        watchGreeting.textContent = "Good Morning ☀️";

        watchIcon.textContent = "☀️";

        smartWatchWidget.classList.add("morning");

    }

    else if (hour >= 12 && hour < 17) {

        watchGreeting.textContent = "Good Afternoon 🌤️";

        watchIcon.textContent = "🌤️";

        smartWatchWidget.classList.add("afternoon");

    }

    else if (hour >= 17 && hour < 21) {

        watchGreeting.textContent = "Good Evening 🌇";

        watchIcon.textContent = "🌇";

        smartWatchWidget.classList.add("evening");

    }

    else {

        watchGreeting.textContent = "Good Night 🌙";

        watchIcon.textContent = "🌙";

        smartWatchWidget.classList.add("night");

    }

    // ================= 12 Hour Format =================

    hour = hour % 12 || 12;

    watchHours.textContent = String(hour).padStart(2, "0");

    watchMinutes.textContent = String(minute).padStart(2, "0");

    watchSeconds.textContent = String(second).padStart(2, "0");

    // ================= Day =================

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    watchDay.textContent = days[now.getDay()];

    // ================= Date =================

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    watchDate.textContent =
        `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

}

// ================= Initialize =================

updateClock();

setInterval(updateClock, 1000);