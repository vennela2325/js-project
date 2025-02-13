import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyAgLFKLAJuAxhxEqLXl7GqFhhtyp-QWRtQ",
    authDomain: "expenditure-tracker-js.firebaseapp.com",
    databaseURL: "https://expenditure-tracker-js-default-rtdb.firebaseio.com",
    projectId: "expenditure-tracker-js",
    storageBucket: "expenditure-tracker-js.firebasestorage.app",
    messagingSenderId: "938742415497",
    appId: "1:938742415497:web:2f25c5fb6c3011e0be4658",
    measurementId: "G-EK9P2K6BQM"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


async function addExpense() {
    const category = document.getElementById("category").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (!category || amount <= 0 || !date) {
        Swal.fire("Error", "All fields are required", "error");
        return;
    }

    const expenseId = Date.now().toString(); // Unique ID for each expense

    try {
        await set(ref(db, "expenses/" + expenseId), {
            category,
            amount,
            date
        });
        Swal.fire("Success", "Expense added successfully", "success");
        fetchExpenses();
    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
}


async function fetchExpenses() {
    const dbRef = ref(db, "expenses");
    const snapshot = await get(dbRef);
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    let expenseData = {};

    if (snapshot.exists()) {
        const expenses = snapshot.val();
        for (const key in expenses) {
            const expense = expenses[key];
            expenseData[expense.category] = (expenseData[expense.category] || 0) + expense.amount;

            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `${expense.category} - $${expense.amount} (${expense.date})
                <button class="btn btn-danger btn-sm" onclick="deleteExpense('${key}')">Delete</button>`;
            expenseList.appendChild(li);
        }
    }
    updateChart(expenseData);
}


async function deleteExpense(id) {
    try {
        await remove(ref(db, "expenses/" + id));
        Swal.fire("Deleted", "Expense deleted successfully", "success");
        fetchExpenses();
    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
}
let expenseChart = null;

function updateChart(expenseData) {
    const ctx = document.getElementById("expenseChart").getContext("2d");

    if (expenseChart instanceof Chart) {
        expenseChart.destroy();
    }

    const totalAmount = Object.values(expenseData).reduce((sum, val) => sum + val, 0);

    expenseChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(expenseData).map(category => {
                const value = expenseData[category];
                const percentage = ((value / totalAmount) * 100).toFixed(2);
                return `${category} (${percentage}%)`;
            }),
            datasets: [{
                data: Object.values(expenseData),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const value = tooltipItem.raw;
                            const percentage = ((value / totalAmount) * 100).toFixed(2);
                            return `${tooltipItem.label}: $${value} (${percentage}%)`;
                        }
                    }
                },
                datalabels: {  // ✅ Show percentage inside pie chart
                    formatter: (value, context) => {
                        const percentage = ((value / totalAmount) * 100).toFixed(2);
                        return `${percentage}%`;
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 14
                    }
                }
            }
        },
        plugins: [ChartDataLabels] // ✅ Register Datalabels plugin
    });
}




document.addEventListener("DOMContentLoaded", fetchExpenses);


window.addExpense = addExpense;
window.deleteExpense = deleteExpense;
