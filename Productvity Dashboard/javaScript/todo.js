// ===================== Todo Elements =====================

const addTodoBtn = document.getElementById("addTodoBtn");
const todoModal = document.getElementById("todoModal");
const closeModal = document.getElementById("closeModal");
const cancelTask = document.getElementById("cancelTask");
const saveTask = document.getElementById("saveTask");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");
let editTaskId = null;

const todoContainer = document.getElementById("todoContainer");

// ===================== User Data =====================

let loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users")) || [];

// Redirect if user not logged in
if (!loggedInUser) {
  alert("Please login first.");
  window.location.href = "index.html";
}

// ===================== Modal Functions =====================

function openModal() {
  todoModal.style.display = "flex";
}

function closeTodoModal() {
  todoModal.style.display = "none";
}

// ===================== Event Listeners =====================

// Open Modal
addTodoBtn.addEventListener("click", openModal);

// Close Modal
closeModal.addEventListener("click", closeTodoModal);
cancelTask.addEventListener("click", closeTodoModal);

// Close on Background Click
window.addEventListener("click", (e) => {
  if (e.target === todoModal) {
    closeTodoModal();
  }
});

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeTodoModal();
  }
});

// ===================== Render Tasks =====================

function renderTasks() {

  loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

  todoContainer.innerHTML = "";

  if (!loggedInUser.tasks || loggedInUser.tasks.length === 0) {
    todoContainer.innerHTML = `
      <p style="text-align:center;color:gray;margin-top:40px;">
        No Tasks Yet 📋
      </p>
    `;
    return;
  }

  let html = "";

  loggedInUser.tasks.forEach((task) => {

    html += `
      <div class="task ${task.priority.toLowerCase()} ${task.completed ? "completed" : ""}">

        <div class="task-top">
          <h3>
    ${task.completed ? "✅" : "📌"} ${task.title}
</h3>

          <span class="priority ${task.priority.toLowerCase()}">
            ${task.priority}
          </span>
        </div>

        <p class="description">
          ${task.description || "No Description"}
        </p>

        <div class="task-bottom">

          <div class="task-info">
            <span>
              <i class="ri-calendar-line"></i>
              ${task.dueDate || "No Date"}
            </span>
          </div>

          <div class="T-button">

            <i class="${task.completed ? 'ri-check-double-line' : 'ri-check-line'} button completeBtn"
    data-id="${task.id}">
</i>

            <i
              class="ri-pencil-line button editBtn"
              data-id="${task.id}">
            </i>

            <i
              class="ri-delete-bin-fill button deleteBtn"
              data-id="${task.id}">
            </i>

          </div>

        </div>

      </div>
    `;
  });

  todoContainer.innerHTML = html;
}

// ===================== delete function ===================

function deleteTask(taskId) {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    // Current User
    const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

    // Users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // User Index
    const userIndex = users.findIndex(
        user => user.id === loggedInUser.id
    );

    // Delete Task
    users[userIndex].tasks = users[userIndex].tasks.filter(
        task => task.id !== taskId
    );

    // Save Updated Users
    localStorage.setItem("users", JSON.stringify(users));

    // Update Current User
    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    // Refresh UI
    renderTasks();
}

// ================= edit function =====================

function editTask(taskId) {

    const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

    const task = loggedInUser.tasks.find(task => task.id === taskId);

    if (!task) return;

    // Store Editing Task ID
    editTaskId = taskId;

    // Fill Modal
    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskPriority.value = task.priority;
    taskDate.value = task.dueDate;

    // Change Button Text
    saveTask.textContent = "Update Task";

    // Open Modal
    openModal();

}
//  ================== complete task ==================

function toggleComplete(taskId) {

    const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
        user => user.id === loggedInUser.id
    );

    if (userIndex === -1) return;

    users[userIndex].tasks = users[userIndex].tasks.map(task => {

        if (task.id === taskId) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });

    // Save
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    renderTasks();

}
// ===================== Save Task =====================

saveTask.addEventListener("click", () => {

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const priority = taskPriority.value;
    const dueDate = taskDate.value;

    if (title === "") {
        alert("Please enter task title.");
        return;
    }

    const userIndex = users.findIndex(
        user => user.id === loggedInUser.id
    );

    if (userIndex === -1) {
        alert("User not found.");
        return;
    }

    // ================= Edit Mode =================

    if (editTaskId !== null) {

        users[userIndex].tasks = users[userIndex].tasks.map(task => {

            if (task.id === editTaskId) {

                return {
                    ...task,
                    title,
                    description,
                    priority,
                    dueDate
                };

            }

            return task;

        });

        alert("Task Updated Successfully ✏️");

    }

    // ================= Add Mode =================

    else {

        const task = {

            id: Date.now(),
            title,
            description,
            priority,
            dueDate,
            completed: false

        };

        users[userIndex].tasks.push(task);

        alert("Task Added Successfully ✅");

    }

    // Save LocalStorage
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    // Reset
    editTaskId = null;

    saveTask.textContent = "Save Task";

    taskTitle.value = "";
    taskDescription.value = "";
    taskPriority.value = "High";
    taskDate.value = "";

    closeTodoModal();

    renderTasks();

});
// ===================== Initial Render =====================

renderTasks();

todoContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("deleteBtn")) {

        deleteTask(Number(e.target.dataset.id));

    }
    if (e.target.classList.contains("editBtn")) {

    editTask(Number(e.target.dataset.id));
}
if (e.target.classList.contains("completeBtn")) {
    toggleComplete(Number(e.target.dataset.id));
}
});