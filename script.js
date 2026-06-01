
const toggleBtn = document.querySelector(".toggle-sidebar");
const sidebar = document.getElementById("sidebar");
const topbar = document.getElementById("topbar");
const mainContent = document.getElementById("mainContent");

toggleBtn.addEventListener("click", () => {

    sidebar.classList.toggle("collapsed");
    topbar.classList.toggle("expanded");
    mainContent.classList.toggle("expanded");

});
