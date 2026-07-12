const registerForm = document.querySelector("form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if(username === "" && password === ""){
    alert("Enter your detail");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // user allready exists

  const userExists = users.some(user => user.username === username);

  if(userExists){
    alert("user is already exists");
    return;
  }

  const newUser = {
    id: Date.now(),
    username: username,
    password:password,
    theme: "light",
    tasks: [],
    planner: [],
    goals: [],
    notes: [],
    pomodoro:{
    completed:0
}
  };
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert(`${username} your registration successfull`)

  window.location.href = "../index.html"
})
