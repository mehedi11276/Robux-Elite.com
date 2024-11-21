// Handle package selection
function selectPackage(packageAmount, packagePrice) {
    document.getElementById("selected-package").value = packageAmount;
    document.getElementById("package-price").value = packagePrice;

    // Show the payment section
    document.getElementById("payment").style.display = "block";
    document.getElementById("payment").scrollIntoView({ behavior: "smooth" });

    alert(`You selected ${packageAmount} Robux for ${packagePrice} BDT.`);
}

// Handle payment submission
document.getElementById("payment-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const packageAmount = document.getElementById("selected-package").value;
    const price = document.getElementById("package-price").value;
    const transactionId = document.getElementById("transaction-id").value;
    const userNumber = document.getElementById("user-number").value;
    const status = "Pending Review"; // Default status
    const date = new Date().toLocaleDateString();

    // Basic validation (check if fields are empty)
    if (!transactionId || !userNumber) {
        alert("Please fill in all fields!");
        return;
    }

    // Simulate saving payment (localStorage for now)
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({
        package: packageAmount,
        price: price,
        transactionId: transactionId,
        userNumber: userNumber,
        status: status,
        date: date,
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Payment submitted successfully! Your order is under review.");

    // Hide payment section after submission
    document.getElementById("payment").style.display = "none";

    // Reset the form fields
    document.getElementById("payment-form").reset();

    // Update purchase history
    updatePurchaseHistory();
});

// Update purchase history table
function updatePurchaseHistory() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const historyBody = document.getElementById("history-body");

    historyBody.innerHTML = ""; // Clear previous history

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

        historyBody.appendChild(row);
    });
}

// Initialize user purchase history page
document.addEventListener("DOMContentLoaded", updatePurchaseHistory);
