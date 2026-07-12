// ================= Elements =================

const plannerContainer = document.getElementById("plannerContainer");

const plannerModal = document.getElementById("plannerModal");

const addPlanBtn = document.getElementById("addPlanBtn");

const savePlan = document.getElementById("savePlan");

const closePlanner = document.getElementById("closePlanner");

const cancelPlan = document.getElementById("cancelPlan");

const planTitle = document.getElementById("planTitle");

const planTime = document.getElementById("planTime");

let editPlanId = null;

// Open Modal
addPlanBtn.addEventListener("click", () => {
    plannerModal.style.display = "flex";
});

// Close Modal (X)
closePlanner.addEventListener("click", closePlannerModal);

// Close Modal (Cancel)
cancelPlan.addEventListener("click", closePlannerModal);

// Outside Click
window.addEventListener("click", (e) => {
    if (e.target === plannerModal) {
        closePlannerModal();
    }
});

// ESC Key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePlannerModal();
    }
});

function closePlannerModal() {

    plannerModal.style.display = "none";

    planTitle.value = "";
    planTime.value = "";

    editPlanId = null;

    savePlan.textContent = "Save Plan";

}

function renderPlans() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    plannerContainer.innerHTML = "";

    if (!currentUser.plans || currentUser.plans.length === 0) {

        plannerContainer.innerHTML = `
            <p class="empty-plan">
                📅 No Plans Added
            </p>
        `;

        return;
    }

    currentUser.plans.sort((a, b) => a.time.localeCompare(b.time));

    currentUser.plans.forEach(plan => {

        plannerContainer.innerHTML += `

<div class="plan-card">

    <div class="plan-info">

        <div class="plan-time">
            <i class="ri-time-line"></i>
            <span>${plan.time}</span>
        </div>

        <h3>${plan.title}</h3>

    </div>

    <div class="plan-actions">

        <i class="ri-pencil-line editPlan button"
           data-id="${plan.id}"></i>

        <i class="ri-delete-bin-fill deletePlan button"
           data-id="${plan.id}"></i>

    </div>

</div>

`;
    });

}

savePlan.addEventListener("click", () => {

    const title = planTitle.value.trim();
    const time = planTime.value;

    if (title === "" || time === "") {
        alert("Please fill all fields.");
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
        user => user.id === currentUser.id
    );

    if (userIndex === -1) {
        alert("User not found.");
        return;
    }

    // Agar plans array nahi hai to bana do
    if (!users[userIndex].plans) {
        users[userIndex].plans = [];
    }

    // ================= EDIT MODE =================

    if (editPlanId !== null) {

        users[userIndex].plans = users[userIndex].plans.map(plan => {

            if (plan.id === editPlanId) {

                return {
                    ...plan,
                    title,
                    time
                };

            }

            return plan;

        });

        alert("Plan Updated Successfully ✏️");

    }

    // ================= ADD MODE =================

    else {

        const plan = {

            id: Date.now(),
            title,
            time

        };

        users[userIndex].plans.push(plan);

        alert("Plan Added Successfully 📅");

    }

    // Save LocalStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Update Current User
    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    // Reset
    editPlanId = null;

    savePlan.textContent = "Save Plan";

    closePlannerModal();

    // Refresh UI
    renderPlans();

});

// ============== delete function ==================

function deletePlan(planId) {

    const confirmDelete = confirm("Delete this plan?");

    if (!confirmDelete) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
        user => user.id === currentUser.id
    );

    if (userIndex === -1) return;

    users[userIndex].plans = users[userIndex].plans.filter(
        plan => plan.id !== planId
    );

    // Save Updated Users
    localStorage.setItem("users", JSON.stringify(users));

    // Update Current User
    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    // Refresh UI
    renderPlans();

}

// ================ edit plan function ========================

function editPlan(planId) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const plan = currentUser.plans.find(
        plan => plan.id === planId
    );

    if (!plan) return;

    editPlanId = planId;

    planTitle.value = plan.title;
    planTime.value = plan.time;

    savePlan.textContent = "Update Plan";

    plannerModal.style.display = "flex";

}

plannerContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("deletePlan")) {
        deletePlan(Number(e.target.dataset.id));
    }

    if (e.target.classList.contains("editPlan")) {
        editPlan(Number(e.target.dataset.id));
    }

});

renderPlans();