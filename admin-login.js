// Admin credentials (you can change these to your desired username and password)
const adminUsername = "admin";
const adminPassword = "securepassword123";

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check credentials
    if (username === adminUsername && password === adminPassword) {
        alert("Login successful!");
        // Redirect to the admin panel
        window.location.href = "admin-panel.html";
    } else {
        // Show error message
        document.getElementById("error-message").style.display = "block";
    }
});
