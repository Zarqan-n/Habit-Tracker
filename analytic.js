const habits = JSON.parse(localStorage.getItem("habits")) || [];

const total = habits.length;
const completed = habits.filter(h => h.status === "complete").length;
const failed = habits.filter(h => h.status === "fail").length;
const pending = habits.filter(h => h.status === "normal").length;

document.getElementById("total-habits").textContent = total;
document.getElementById("completed-habits").textContent = completed;
document.getElementById("failed-habits").textContent = failed;

const successRate = total ? Math.round((completed / total) * 100) : 0;
document.getElementById("success-rate").textContent = `${successRate}%`;

// Chart.js pie chart
const ctx = document.getElementById("habitChart").getContext("2d");
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Completed", "Failed", "Pending"],
    datasets: [{
      data: [completed, failed, pending],
      backgroundColor: ["rgb(0,163,14)", "rgb(255,51,51)", "steelblue"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "bottom" }
    }
  }
});
