// ================= Elements =================

const goalList = document.getElementById("goalList");

const goalModal = document.getElementById("goalModal");

const addGoalBtn = document.getElementById("addGoalBtn");

const saveGoal = document.getElementById("saveGoal");

const closeGoal = document.getElementById("closeGoal");

const cancelGoal = document.getElementById("cancelGoal");

const goalTitle = document.getElementById("goalTitle");

const goalCount = document.getElementById("goalCount");

const goalPercent = document.getElementById("goalPercent");

const progressFill = document.getElementById("progressFill");

let editGoalId = null;

// Open Modal
addGoalBtn.addEventListener("click", () => {

    goalModal.style.display = "flex";

});

// Close Button
closeGoal.addEventListener("click", closeGoalModal);

// Cancel Button
cancelGoal.addEventListener("click", closeGoalModal);

// Outside Click
window.addEventListener("click", (e) => {

    if (e.target === goalModal) {

        closeGoalModal();

    }

});

// ESC Key
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeGoalModal();

    }

});

function closeGoalModal() {

    goalModal.style.display = "none";

    goalTitle.value = "";

    editGoalId = null;

    saveGoal.textContent = "Save Goal";

}

saveGoal.addEventListener("click", () => {

    const title = goalTitle.value.trim();

    if (title === "") {

        alert("Please enter a goal.");

        return;

    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
        user => user.id === currentUser.id
    );

    if (userIndex === -1) return;

    if (!users[userIndex].goals) {

        users[userIndex].goals = [];

    }

    const goal = {

        id: Date.now(),

        title,

        completed: false

    };

    users[userIndex].goals.push(goal);

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    closeGoalModal();

    renderGoals();

});

function renderGoals() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    goalList.innerHTML = "";

    if (!currentUser.goals || currentUser.goals.length === 0) {

        goalList.innerHTML = `

            <p class="empty-goal">

                🎯 No Goals Added

            </p>

        `;

        goalCount.textContent = "0 / 0 Completed";

        goalPercent.textContent = "0%";

        progressFill.style.width = "0%";

        return;

    }

    currentUser.goals.forEach(goal => {

        goalList.innerHTML += `
<div class="goal-card ${goal.completed ? "completed" : ""}">

    <div class="goal-info">

        <div class="goal-top">

            <input
                type="checkbox"
                class="goalCheck"
                data-id="${goal.id}"
                ${goal.completed ? "checked" : ""}
            >

            <h4 class="goal-heading">${goal.title}</h4>

        </div>

        <p>

            ${
                goal.completed
                ? "✅ Completed"
                : "🎯 Pending"
            }

        </p>

    </div>

    <i
        class="ri-delete-bin-6-line deleteGoal"
        data-id="${goal.id}">
    </i>

</div>
`;
    });

    updateProgress();

}

function updateProgress() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser.goals) return;

    const total = currentUser.goals.length;

    const completed = currentUser.goals.filter(
        goal => goal.completed
    ).length;

    const percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    goalCount.textContent =
        `${completed} / ${total} Completed`;

    goalPercent.textContent =
        `${percent}%`;

    progressFill.style.width =
        `${percent}%`;

}

function toggleGoal(goalId) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
        user => user.id === currentUser.id
    );

    if (userIndex === -1) return;

    const goal = users[userIndex].goals.find(
        goal => goal.id === goalId
    );

    if (!goal) return;

    goal.completed = !goal.completed;

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    renderGoals();

}

function deleteGoal(goalId) {

    const confirmDelete = confirm("Delete this goal?");

    if (!confirmDelete) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
        user => user.id === currentUser.id
    );

    if (userIndex === -1) return;

    users[userIndex].goals = users[userIndex].goals.filter(
        goal => goal.id !== goalId
    );

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    renderGoals();

}

goalList.addEventListener("click", (e) => {

    if (e.target.classList.contains("deleteGoal")) {

        deleteGoal(Number(e.target.dataset.id));

    }

});

goalList.addEventListener("change", (e) => {

    if (e.target.classList.contains("goalCheck")) {

        toggleGoal(Number(e.target.dataset.id));

    }

});

renderGoals();