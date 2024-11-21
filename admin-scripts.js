document.addEventListener("DOMContentLoaded", function() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersBody = document.getElementById("orders-body");

    // Populate the orders table with stored orders
    orders.forEach((order, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.userNumber}</td>
            <td>${order.package}</td>
            <td>${order.price}</td>
            <td><span class="status ${order.status.toLowerCase()}">${order.status}</span></td>
            <td>${order.date}</td> <!-- Date Column -->
            <td>${order.transactionId}</td> <!-- Transaction ID Column -->
            <td>
                <button class="approve-btn" onclick="changeStatus(${index}, 'Paid')">Approve</button>
                <button class="reject-btn" onclick="changeStatus(${index}, 'Rejected')">Reject</button>
                <button class="reset-btn" onclick="resetStatus(${index})">Reset</button>
            </td>
        `;

        ordersBody.appendChild(row);
    });
});

// Change Order Status (Approve/Reject)
function changeStatus(orderIndex, newStatus) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders[orderIndex]) {
        // Update the status of the selected order
        orders[orderIndex].status = newStatus;
        orders[orderIndex].date = new Date().toLocaleString();  // Add the date of the action
        localStorage.setItem("orders", JSON.stringify(orders));

        // Update the UI (no need to reload the page)
        updateOrderRow(orderIndex, newStatus);
    }
}

// Update the UI without page reload (update status in the row)
function updateOrderRow(orderIndex, newStatus) {
    const ordersBody = document.getElementById("orders-body");
    const row = ordersBody.children[orderIndex];
    const statusCell = row.querySelector('.status');
    const statusButtons = row.querySelectorAll('button');
    const dateCell = row.querySelector('td:nth-child(5)');  // Date Cell
    const transactionIdCell = row.querySelector('td:nth-child(6)'); // Transaction ID Cell

    // Update the status text and button states
    statusCell.textContent = newStatus;
    statusCell.classList.remove('pending', 'paid', 'rejected');
    statusCell.classList.add(newStatus.toLowerCase());

    // Update the Date Cell to reflect the new change date
    dateCell.textContent = new Date().toLocaleString();

    // Disable the button for the completed action (Approve or Reject)
    if (newStatus === "Paid") {
        row.querySelector('.approve-btn').disabled = true;
        row.querySelector('.reject-btn').disabled = false;
    } else if (newStatus === "Rejected") {
        row.querySelector('.approve-btn').disabled = false;
        row.querySelector('.reject-btn').disabled = true;
    }

    // Ensure Reset button is always enabled
    row.querySelector('.reset-btn').disabled = false;
}

// Reset the status to "Pending Review"
function resetStatus(orderIndex) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders[orderIndex]) {
        // Reset the status to "Pending Review"
        orders[orderIndex].status = "Pending Review";
        orders[orderIndex].date = new Date().toLocaleString();  // Add the reset date
        localStorage.setItem("orders", JSON.stringify(orders));

        // Update the UI to reflect the reset
        updateOrderRow(orderIndex, "Pending Review");
    }
}
