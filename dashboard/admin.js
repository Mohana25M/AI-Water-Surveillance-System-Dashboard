// ===============================
// AI Water Surveillance Admin
// ===============================

// Tank Storage
let tanks = [];

// Wait until page is loaded
document.addEventListener("DOMContentLoaded", () => {

    const saveBtn = document.getElementById("saveBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // Save Tank
    if (saveBtn) {

        saveBtn.addEventListener("click", saveTank);

    }

    // Logout
    if (logoutBtn) {

        logoutBtn.addEventListener("click", logout);

    }

    // Load Existing Tanks
    displayTanks();

});

// ===============================
// Save Tank
// ===============================
function saveTank() {

    const tankName = document.getElementById("tankName").value.trim();
    const location = document.getElementById("location").value.trim();
    const capacity = document.getElementById("capacity").value.trim();

    if (!tankName || !location || !capacity) {

        alert("Please fill all fields.");
        return;

    }

    tanks.push({

        tankName,
        location,
        capacity

    });

    // Clear Inputs
    document.getElementById("tankName").value = "";
    document.getElementById("location").value = "";
    document.getElementById("capacity").value = "";

    displayTanks();

}

// ===============================
// Display Tank List
// ===============================
function displayTanks() {

    const table = document.getElementById("tankTable");

    if (!table) return;

    table.innerHTML = "";

    tanks.forEach((tank, index) => {

        table.innerHTML += `

        <tr>

            <td>${tank.tankName}</td>

            <td>${tank.location}</td>

            <td>${tank.capacity} L</td>

            <td>

                <button class="edit-btn" onclick="editTank(${index})">
                ✏ Edit
                </button>

                <button class="delete-btn" onclick="deleteTank(${index})">
                🗑 Delete
                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Delete Tank
// ===============================
function deleteTank(index) {

    if (confirm("Delete this tank?")) {

        tanks.splice(index, 1);

        displayTanks();

    }

}

// ===============================
// Edit Tank
// ===============================
function editTank(index) {

    document.getElementById("tankName").value = tanks[index].tankName;
    document.getElementById("location").value = tanks[index].location;
    document.getElementById("capacity").value = tanks[index].capacity;

    tanks.splice(index, 1);

    displayTanks();

}

// ===============================
// Logout
// ===============================
function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}

