// Current User
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Agar login nahi hai to login page par bhej do
if (!currentUser) {
    window.location.href = "index.html";
}

// Elements
const userName = document.getElementById("userName");
const profileLetter = document.getElementById("profileLetter");
const welcomeText = document.getElementById("welcomeText");
const greetingText = document.getElementById("greetingText");

// Username
userName.textContent = `Hello, ${currentUser.username}`;

// Profile Letter
profileLetter.textContent =
    currentUser.username.charAt(0).toUpperCase();

// Greeting
const hour = new Date().getHours();

let greeting = "";

if (hour >= 5 && hour < 12) {
    greeting = "Good Morning ☀️";
} else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon 🌤️";
} else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening 🌇";
} else {
    greeting = "Good Night 🌙";
}

welcomeText.textContent = `${greeting}, ${currentUser.username}!`;

greetingText.textContent =
    "Stay focused and achieve your goals 🚀";