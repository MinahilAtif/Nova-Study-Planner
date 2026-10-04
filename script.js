// ===============================
// NOVA STUDY PLANNER
// ===============================

// ---------- Data ----------
let tasks = JSON.parse(localStorage.getItem("novaTasks")) || [];
let subjects = JSON.parse(localStorage.getItem("novaSubjects")) || [];
let sessions = JSON.parse(localStorage.getItem("novaSessions")) || [];


// ---------- Save Data ----------
function saveData() {
    localStorage.setItem("novaTasks", JSON.stringify(tasks));
    localStorage.setItem("novaSubjects", JSON.stringify(subjects));
    localStorage.setItem("novaSessions", JSON.stringify(sessions));
}


// ===============================
// NAVIGATION
// ===============================

const navItems = document.querySelectorAll(".nav-item[data-section]");
const sections = document.querySelectorAll(".page-section");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const target = item.dataset.section;

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        sections.forEach(section => {
            section.classList.remove("active-section");
        });

        const targetSection = document.getElementById(target);

        if (targetSection) {
            targetSection.classList.add("active-section");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


// ===============================
// DATE
// ===============================

function showDate() {

    const dateElement = document.getElementById("todayDate");

    if (!dateElement) return;

    const today = new Date();

    dateElement.textContent = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

showDate();


// ===============================
// THEME
// ===============================

const themeToggle = document.getElementById("themeToggle");
const settingsThemeToggle =
    document.getElementById("settingsThemeToggle");

function setTheme(theme) {

    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    localStorage.setItem("novaTheme", theme);
}

function toggleTheme() {

    const isDark = document.body.classList.contains("dark");

    setTheme(isDark ? "light" : "dark");
}

themeToggle.addEventListener("click", toggleTheme);

settingsThemeToggle.addEventListener("click", toggleTheme);


// Load saved theme
const savedTheme = localStorage.getItem("novaTheme") || "light";

setTheme(savedTheme);


// ===============================
// MODAL SYSTEM
// ===============================

function openModal(id) {

    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.add("show");
    }
}

function closeModal(id) {

    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.remove("show");
    }
}


// Close buttons
document.querySelectorAll(".close-modal").forEach(button => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.close;

        closeModal(modalId);

    });

});


// Close when clicking outside modal
document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.classList.remove("show");
        }

    });

});


// ===============================
// OPEN TASK MODAL
// ===============================

const addTaskBtn = document.getElementById("addTaskBtn");

if (addTaskBtn) {

    addTaskBtn.addEventListener("click", () => {
        openModal("taskModal");
    });

}


// Dashboard Add Task button
document.querySelectorAll('[data-open="tasks"]').forEach(button => {

    button.addEventListener("click", () => {

        openModal("taskModal");

    });

});


// ===============================
// OPEN SUBJECT MODAL
// ===============================

const addSubjectBtn = document.getElementById("addSubjectBtn");

if (addSubjectBtn) {

    addSubjectBtn.addEventListener("click", () => {
        openModal("subjectModal");
    });

}


// ===============================
// OPEN SESSION MODAL
// ===============================

const addSessionBtn = document.getElementById("addSessionBtn");

if (addSessionBtn) {

    addSessionBtn.addEventListener("click", () => {
        openModal("sessionModal");
    });
// ===============================
// SUBJECTS
// ===============================

const subjectForm = document.getElementById("subjectForm");

subjectForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("subjectName").value.trim();
    const color = document.getElementById("subjectColor").value;

    if (!name) return;

    const subject = {
        id: Date.now(),
        name: name,
        color: color
    };

    subjects.push(subject);

    saveData();

    subjectForm.reset();

    closeModal("subjectModal");

    renderSubjects();

    updateDashboard();

});


// ===============================
// DISPLAY SUBJECTS
// ===============================

function renderSubjects() {

    const subjectsGrid = document.getElementById("subjectsGrid");

    if (subjects.length === 0) {

        subjectsGrid.innerHTML = `
            <div class="empty-state large-empty">
                <span>▦</span>
                <h3>No subjects yet</h3>
                <p>Add subjects to organize your study plan.</p>
            </div>
        `;

        return;
    }

    subjectsGrid.innerHTML = "";

    subjects.forEach(subject => {

        const card = document.createElement("div");

        card.className = "subject-card";

        card.innerHTML = `
            <span
                class="subject-color"
                style="background:${subject.color}"
            ></span>

            <h3>${subject.name}</h3>

            <p>Your study subject</p>

            <button
                class="delete-btn"
                onclick="deleteSubject(${subject.id})"
            >
                Delete
            </button>
        `;

        subjectsGrid.appendChild(card);

    });

}


// ===============================
// DELETE SUBJECT
// ===============================

function deleteSubject(id) {

    subjects = subjects.filter(subject => subject.id !== id);

    saveData();

    renderSubjects();

    updateDashboard();

}


// ===============================
// DASHBOARD COUNTER
// ===============================

function updateDashboard() {

    const subjectCount =
        document.getElementById("subjectCount");

    if (subjectCount) {
        subjectCount.textContent = subjects.length;
    }

}


// ===============================
// LOAD SUBJECTS
// ===============================

renderSubjects();
updateDashboard();
}