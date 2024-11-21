// Mock data for user payments
const payments = [
    {
        package: "500 Robux",
        price: "100 BDT",
        transactionId: "TXN12345",
        userNumber: "+8801965223559",
        status: "pending"
    },
    {
        package: "1000 Robux",
        price: "200 BDT",
        transactionId: "TXN12346",
        userNumber: "+8801965223560",
        status: "paid"
    }
];

// Admin Panel function to display payment status
const orderStatus = document.getElementById('order-status');

payments.forEach(payment => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${payment.package}</td>
        <td>${payment.price}</td>
        <td>${payment.transactionId}</td>
        <td>${payment.userNumber}</td>
        <td class="status">${payment.status}</td>
        <td>
            <button class="approve-btn">Approve</button>
            <button class="reject-btn">Reject</button>
        </td>
    `;
    orderStatus.appendChild(row);
});

document.querySelectorAll('.approve-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        row.querySelector('.status').textContent = 'approved';
    });
});

document.querySelectorAll('.reject-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        row.querySelector('.status').textContent = 'rejected';
    });
});

// Chat Popup Scripts for Admin Panel
const openChatAdmin = document.getElementById('open-chat-admin');
const closeChatAdmin = document.getElementById('close-chat-admin');
const chatPopupAdmin = document.getElementById('chat-popup-admin');

openChatAdmin.addEventListener('click', () => {
    chatPopupAdmin.style.display = 'flex';
});

closeChatAdmin.addEventListener('click', () => {
    chatPopupAdmin.style.display = 'none';
});

document.getElementById('send-message-admin').addEventListener('click', () => {
    const message = document.getElementById('chat-input-admin').value;
    if (message) {
        document.getElementById('chat-box-admin').innerHTML += `<div>${message}</div>`;
        document.getElementById('chat-input-admin').value = '';
    }
});
