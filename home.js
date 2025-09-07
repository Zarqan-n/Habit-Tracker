const habitList = document.querySelector(".habits");
const completeList = document.querySelector(".complete");
const failList = document.querySelector(".fail");
const progressText = document.querySelector(".habit-progress");
const addBtn = document.getElementById("add-habit");

const modal = document.getElementById("habit-modal");
const habitNameInput = document.getElementById("habit-name");
const habitGoalInput = document.getElementById("habit-goal");
const saveBtn = document.getElementById("save-habit");
const cancelBtn = document.getElementById("cancel-habit");

const emojis = ["😀", "😁", "☺️", "😇", "😗", "🤓", "🥸", "😫", "🤩"];
const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

let habits = JSON.parse(localStorage.getItem("habits")) || [];

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

        card.querySelector(".mark-complete").addEventListener("click", () => {
            habit.percent = 100;
            habit.status = "complete";
            saveAndRender();
        });

        card.querySelector(".mark-fail").addEventListener("click", () => {
            habit.percent = 0;
            habit.status = "fail";
            saveAndRender();
        });

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

function saveAndRender() {
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

addBtn.addEventListener("click", () => {
    habitNameInput.value = "";
    habitGoalInput.value = "";
    modal.style.display = "flex";
});

saveBtn.addEventListener("click", () => {
    const name = habitNameInput.value.trim();
    const goal = habitGoalInput.value.trim();
    if (!name || !goal) return alert("Please enter both name and goal");

    habits.push({ name, goal, percent: 0, status: "normal", emoji: getRandomEmoji() });
    saveAndRender();
    modal.style.display = "none";
});

cancelBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

renderHabits();

const deleteBtn = document.getElementById("delete-habit-btn");
const deleteModal = document.getElementById("delete-modal");
const deleteList = document.getElementById("delete-list");
const cancelDelete = document.getElementById("cancel-delete");

const confirmModal = document.getElementById("confirm-modal");
const confirmText = document.getElementById("confirm-text");
const confirmOk = document.getElementById("confirm-ok");
const confirmCancel = document.getElementById("confirm-cancel");

function showConfirm(message, callback) {
    confirmText.textContent = message;
    confirmModal.style.display = "flex";

    confirmOk.onclick = () => {
        callback(true);
        confirmModal.style.display = "none";
    };
    confirmCancel.onclick = () => {
        callback(false);
        confirmModal.style.display = "none";
    };
}

// Open delete modal and populate habits dynamically
deleteBtn.addEventListener("click", () => {
    deleteList.innerHTML = "";

    if (habits.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No habits to delete";
        deleteList.appendChild(li);
    } else {
        habits.forEach((habit, index) => {
            const li = document.createElement("li");
            li.textContent = habit.name;
            li.style.cursor = "pointer";

            li.addEventListener("click", () => {
                showConfirm(`Are you sure you want to delete "${habit.name}"?`, (confirmed) => {
                    if (!confirmed) return;
                    habits.splice(index, 1);
                    localStorage.setItem("habits", JSON.stringify(habits));
                    renderHabits();
                    deleteModal.style.display = "none";
                });
            });

            deleteList.appendChild(li);
        });
    }

    deleteModal.style.display = "flex";
});

// Cancel delete modal
cancelDelete.addEventListener("click", () => deleteModal.style.display = "none");
window.addEventListener("click", e => {
    if (e.target === deleteModal) deleteModal.style.display = "none";
    if (e.target === confirmModal) confirmModal.style.display = "none";
});

