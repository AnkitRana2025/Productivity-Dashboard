const timerDisplay = document.getElementById("timerDisplay");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const resetBtn = document.getElementById("resetBtn");

const timerSetting = document.getElementById("timerSetting");

const focusMode = document.getElementById("focusMode");

const shortBreak = document.getElementById("shortBreak");

const longBreak = document.getElementById("longBreak");

const timerCircle = document.getElementById("timerCircle");

const timerModal = document.getElementById("timerModal");

const closeTimerModal = document.getElementById("closeTimerModal");

const cancelTimerSetting = document.getElementById("cancelTimerSetting");

const saveTimerSetting = document.getElementById("saveTimerSetting");

const focusInput = document.getElementById("focusInput");

const shortInput = document.getElementById("shortInput");

const longInput = document.getElementById("longInput");

let FOCUS_TIME = 25 * 60;

let SHORT_BREAK = 5 * 60;

let LONG_BREAK = 15 * 60;

let currentMode = "focus";

let focusTime = 25 * 60; // 25 Minutes

let timeLeft = focusTime;

let timer = null;

let isRunning = false;

function updateDisplay() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

    function toggleModeButtons(disabled){

    focusMode.disabled = disabled;

    shortBreak.disabled = disabled;

    longBreak.disabled = disabled;

}

function startTimer() {

    if (isRunning) return;

    isRunning = true;

    // Timer chalne par mode buttons disable
    toggleModeButtons(true);

    timer = setInterval(() => {

        if (timeLeft > 0) {

            timeLeft--;

            updateDisplay();

        } else {

            clearInterval(timer);

            isRunning = false;

            // Timer khatam hone par buttons enable
            toggleModeButtons(false);

            // ================= AUTO SWITCH =================

            if (currentMode === "focus") {

                alert("🎉 Focus Session Completed!\nTime for a Short Break ☕");

                changeMode("short");

            }

            else if (currentMode === "short") {

                alert("☕ Break Finished!\nBack to Focus 🍅");

                changeMode("focus");

            }

            else {

                alert("🌙 Long Break Finished!\nBack to Focus 🍅");

                changeMode("focus");

            }

        }

    }, 1000);

}
function pauseTimer() {

    clearInterval(timer);

    isRunning = false;

    toggleModeButtons(false);

}

function resetTimer() {

    clearInterval(timer);

    isRunning = false;

    toggleModeButtons(false);

    changeMode(currentMode);

}

function changeMode(mode) {

    clearInterval(timer);

    isRunning = false;

    currentMode = mode;

    focusMode.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");

    timerCircle.classList.remove(
        "focus",
        "short",
        "long"
    );

    if (mode === "focus") {

        timeLeft = FOCUS_TIME;
        focusTime = FOCUS_TIME;

        focusMode.classList.add("active");
        timerCircle.classList.add("focus");

    }

    else if (mode === "short") {

        timeLeft = SHORT_BREAK;
        focusTime = SHORT_BREAK;

        shortBreak.classList.add("active");
        timerCircle.classList.add("short");

    }

    else {

        timeLeft = LONG_BREAK;
        focusTime = LONG_BREAK;

        longBreak.classList.add("active");
        timerCircle.classList.add("long");

    }

    updateDisplay();

}

const savedSetting = JSON.parse(localStorage.getItem("pomodoroSettings"));

if(savedSetting){

    FOCUS_TIME = savedSetting.focus;

    SHORT_BREAK = savedSetting.short;

    LONG_BREAK = savedSetting.long;

}

function closeSettingModal(){

    timerModal.style.display = "none";

}

closeTimerModal.addEventListener("click", closeSettingModal);

cancelTimerSetting.addEventListener("click", closeSettingModal);

window.addEventListener("click",(e)=>{

    if(e.target===timerModal){

        closeSettingModal();

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeSettingModal();

    }

});

focusMode.addEventListener("click",()=>{

    changeMode("focus");

});

shortBreak.addEventListener("click",()=>{

    changeMode("short");

});

longBreak.addEventListener("click",()=>{

    changeMode("long");

});

timerSetting.addEventListener("click", () => {

    focusInput.value = FOCUS_TIME / 60;

    shortInput.value = SHORT_BREAK / 60;

    longInput.value = LONG_BREAK / 60;

    timerModal.style.display = "flex";

});

saveTimerSetting.addEventListener("click", () => {

    const focus = Number(focusInput.value);

    const short = Number(shortInput.value);

    const long = Number(longInput.value);

    if (focus < 1 || short < 1 || long < 1) {

        alert("Time must be at least 1 minute.");

        return;

    }

    FOCUS_TIME = focus * 60;

    SHORT_BREAK = short * 60;

    LONG_BREAK = long * 60;

    localStorage.setItem("pomodoroSettings", JSON.stringify({

        focus: FOCUS_TIME,

        short: SHORT_BREAK,

        long: LONG_BREAK

    }));

    changeMode(currentMode);

    closeSettingModal();

});


pauseBtn.addEventListener("click", pauseTimer);

startBtn.addEventListener("click", startTimer);

resetBtn.addEventListener("click", resetTimer);

updateDisplay();
changeMode("focus");