const habitList = document.querySelector(".habits");
const completeList = document.querySelector(".complete");
const failList = document.querySelector(".fail");
const progressText = document.querySelector(".habit-progress");
const addBtn = document.getElementById("add-habit");

// Modal elements
const modal = document.getElementById("habit-modal");
const habitNameInput = document.getElementById("habit-name");
const habitGoalInput = document.getElementById("habit-goal");
const ssaveBtn = document.getElementById("save-habit");
const cancelBtn = document.getElementById("cancel-habit");

// Random emojis
const emojis = ["😀", "😁", "☺️", "😇", "😗", "🤓", "🥸", "😫", "🤩"];
function getRandomEmoji() { return emojis[Math.floor(Math.random() * emojis.length)]; }

// Load habits
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Render all habits
function renderHabits() {
    habitList.innerHTML = "";
    completeList.innerHTML = "<span>Completed</span>";
    failList.innerHTML = "<span>Failed</span>";
    let completedCount = 0;

    habits.forEach((habit, index) => {
        const card = document.createElement("div");
        card.classList.add("habit-card");
        if (!habit.emoji) habit.emoji = getRandomEmoji();

        card.innerHTML = `
            <div class="doCheck">
                <div class="habit-left">
                <span class="habit-icon">${habit.emoji}</span>
                <div>
                    <h3>${habit.name}</h3>
                    <span class="habit-goal">${habit.goal}</span>
                </div>
            </div>
            <div class="habit-status">
                <button class="mark-complete">Done</button>
                <button class="mark-fail">Miss</button>
            </div>
            </div>
        `;

        // Complete button
        card.querySelector(".mark-complete").addEventListener("click", () => {
            habit.percent = 100;
            habit.status = "complete";
            saveAndRender();
        });

        // Fail button
        card.querySelector(".mark-fail").addEventListener("click", () => {
            habit.percent = 0;
            habit.status = "fail";
            saveAndRender();
        });

        // Place in correct section
        if (habit.status === "complete") {
            completeList.appendChild(card);
            completedCount++;
        } else if (habit.status === "fail") {
            failList.appendChild(card);
        } else {
            habitList.appendChild(card);
        }
    });

    progressText.textContent = `${completedCount} of ${habits.length} completed`;
}

// Save and rerender
function saveAndRender() {
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

// Show modal
addBtn.addEventListener("click", () => {
    habitNameInput.value = "";
    habitGoalInput.value = "";
    modal.style.display = "flex";
});

// Save new habit
saveBtn.addEventListener("click", () => {
    const name = habitNameInput.value.trim();
    const goal = habitGoalInput.value.trim();
    if (!name || !goal) return alert("Please enter both name and goal");

    habits.push({ name, goal, percent: 0, status: "normal", emoji: getRandomEmoji() });
    saveAndRender();
    modal.style.display = "none";
});

// Cancel modal
cancelBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

// Initial render
renderHabits();