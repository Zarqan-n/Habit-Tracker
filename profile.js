// Load habits
const habits = JSON.parse(localStorage.getItem("habits")) || [];

// Compute achievements
let totalCompleted = habits.filter(h => h.status === "complete").length;

// Compute streaks (simple version: consecutive days with completed habits)
let currentStreak = 0;
let longestStreak = 0;
const today = new Date().toDateString();

// Iterate habits for streaks
habits.forEach(h => {
  if (h.lastCompletedDate === today) currentStreak++;
  if (h.longestStreak) longestStreak = Math.max(longestStreak, h.longestStreak);
});

// Update achievements on page
document.getElementById("total-completed").textContent = totalCompleted;
document.getElementById("current-streak").textContent = currentStreak;
document.getElementById("longest-streak").textContent = longestStreak;

// Load profile info
const userName = localStorage.getItem("userName") || "User Name";
const userEmail = localStorage.getItem("userEmail") || "user@example.com";
document.getElementById("user-name").textContent = userName;
document.getElementById("user-email").textContent = userEmail;

// Populate recent activity with spacing using flex
const recentList = document.getElementById("recent-list");
recentList.innerHTML = ""; // clear previous entries
const recentHabits = habits.slice(-5).reverse(); // last 5

recentHabits.forEach(h => {
  const li = document.createElement("li");
  li.classList.add("recent-li");

  const nameSpan = document.createElement("span");
  nameSpan.textContent = h.name;
  nameSpan.classList.add("habit-name");

  const statusSpan = document.createElement("span");
  statusSpan.textContent = h.status === "complete" ? "Done ✅" :
                           h.status === "fail" ? "Miss ❌" : "Pending ⌛";
  statusSpan.classList.add("habit-status");

  li.appendChild(nameSpan);
  li.appendChild(statusSpan);
  recentList.appendChild(li);
});

// Modal handling for profile edit
const modal = document.getElementById("profile-modal");
const editBtn = document.getElementById("edit-profile");
const nameInput = document.getElementById("profile-name");
const emailInput = document.getElementById("profile-email");
const saveBtn = document.getElementById("save-profile");
const cancelBtn = document.getElementById("cancel-profile");

// Open modal
editBtn.addEventListener("click", () => {
  nameInput.value = localStorage.getItem("userName") || "";
  emailInput.value = localStorage.getItem("userEmail") || "";
  modal.style.display = "flex";
});

// Save profile info
saveBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if (!name || !email) return alert("Please enter both name and email");

  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);

  document.getElementById("user-name").textContent = name;
  document.getElementById("user-email").textContent = email;

  modal.style.display = "none";
});

// Cancel modal
cancelBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// Avatar handling
const avatarDisplay = document.getElementById("avatar-display");

// Load avatar from localStorage
const savedAvatar = localStorage.getItem("userAvatar");
if (savedAvatar) avatarDisplay.textContent = savedAvatar;

// Handle avatar selection from modal
document.querySelectorAll(".avatar-choice").forEach(el => {
  el.addEventListener("click", () => {
    const chosen = el.textContent;
    localStorage.setItem("userAvatar", chosen);
    avatarDisplay.textContent = chosen;
    modal.style.display = "none"; // close modal after selection
  });
});
