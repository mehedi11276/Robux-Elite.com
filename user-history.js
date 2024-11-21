// Function to display user purchase history
function displayUserHistory() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const purchaseHistoryTable = document
        .getElementById("purchase-history-table")
        .getElementsByTagName("tbody")[0];

    // Clear existing rows (if any)
    purchaseHistoryTable.innerHTML = "";

    // Display all the orders
    orders.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.package} Robux</td>
            <td>${order.price} BDT</td>
            <td class="status ${order.status.toLowerCase()}">${order.status}</td>
            <td>${order.date}</td>
            <td>${order.transactionId}</td>
            <td>${order.userNumber}</td> <!-- Display User Number -->
        `;
        purchaseHistoryTable.appendChild(row);
    });
}

// Function to display user status history (status transitions)
function displayUserStatusHistory() {
    const statusHistory = JSON.parse(localStorage.getItem("statusHistory")) || [];
    const statusHistoryTable = document
        .getElementById("user-status-history-table")
        .getElementsByTagName("tbody")[0];

    // Clear existing rows (if any)
    statusHistoryTable.innerHTML = "";

    // Display all the status transitions
    statusHistory.forEach((status) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${status.status}</td>
            <td>${status.date}</td>
            <td>${status.reason}</td>
        `;
        statusHistoryTable.appendChild(row);
    });
}

// Initialize user purchase history and status history page
document.addEventListener("DOMContentLoaded", function () {
    displayUserHistory();
    displayUserStatusHistory(); // Display the status history when the page is loaded
});
