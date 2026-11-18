/* =========================================================
   1. Mobile Navigation Menu
========================================================= */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  const isOpen = navLinks.classList.contains("active");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   2. Dark / Light Mode Toggle
========================================================= */
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener("click", function () {
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  darkModeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

/* =========================================================
   3. Contact Form Validation
========================================================= */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formMessage.textContent = "";

  if (name.length < 2) {
    formMessage.style.color = "#f87171";
    formMessage.textContent = "Please enter your name (at least 2 characters).";
    return;
  }
  if (!emailPattern.test(email)) {
    formMessage.style.color = "#f87171";
    formMessage.textContent = "Please enter a valid email address.";
    return;
  }
  if (message.length < 10) {
    formMessage.style.color = "#f87171";
    formMessage.textContent = "Message must be at least 10 characters.";
    return;
  }

  formMessage.style.color = "var(--secondary)";
  formMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
  contactForm.reset();
});

/* =========================================================
   4. Dynamic Year
========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================
   5. ADD NEW PROJECT FEATURE (LocalStorage)
========================================================= */
const projectsGrid = document.getElementById("projectsGrid");
const showProjectFormBtn = document.getElementById("showProjectFormBtn");
const addProjectForm = document.getElementById("addProjectForm");
const cancelProjectBtn = document.getElementById("cancelProjectBtn");

let savedProjects = JSON.parse(localStorage.getItem("myProjects")) || [];

// Function to render a project card
function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  // Format tags
  const tagsArray = project.tags
    .split(",")
    .map((tag) => `<span>${tag.trim()}</span>`)
    .join("");

  card.innerHTML = `
    <div class="project-top">
      <span class="project-number">PROJECT</span>
      <span class="project-icon">${project.icon}</span>
    </div>
    <h3>${project.title}</h3>
    <p>${project.desc}</p>
    <div class="project-tags">${tagsArray}</div>
    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Project ↗</a>
  `;

  projectsGrid.appendChild(card);
}

// Render saved projects on page load
savedProjects.forEach((project) => createProjectCard(project));

// Toggle Form Visibility
showProjectFormBtn.addEventListener("click", function () {
  addProjectForm.classList.remove("hidden");
  showProjectFormBtn.classList.add("hidden");
});

cancelProjectBtn.addEventListener("click", function () {
  addProjectForm.classList.add("hidden");
  showProjectFormBtn.classList.remove("hidden");
  addProjectForm.reset();
});

// Handle New Project Submission
addProjectForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newProject = {
    title: document.getElementById("projTitle").value.trim(),
    icon: document.getElementById("projIcon").value.trim(),
    desc: document.getElementById("projDesc").value.trim(),
    tags: document.getElementById("projTags").value.trim(),
    link: document.getElementById("projLink").value.trim(),
  };

  // Save to array and local storage
  savedProjects.push(newProject);
  localStorage.setItem("myProjects", JSON.stringify(savedProjects));

  // Add to screen
  createProjectCard(newProject);

  // Reset and hide form
  addProjectForm.reset();
  addProjectForm.classList.add("hidden");
  showProjectFormBtn.classList.remove("hidden");
});
