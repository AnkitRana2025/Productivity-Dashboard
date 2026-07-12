const toggle = document.getElementById("themeToggle");
const logo = document.getElementById("logo");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    toggle.checked = true;
    logo.src = "./assets/logo2.png";
} else {
    logo.src = "./assets/logo.png";
}

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        document.body.classList.add("dark-theme");
        logo.src = "./assets/logo2.png";
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-theme");
        logo.src = "./assets/logo.png";
        localStorage.setItem("theme", "light");
    }
});