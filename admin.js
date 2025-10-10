// admin.js
document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const userTableBody = document.getElementById("userTableBody");
  const clearFormBtn = document.getElementById("clearFields");
  const clearAllBtn = document.getElementById("deleteAll");
  const searchInput = document.getElementById("search");

  loadUsers();

  function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    userTableBody.innerHTML = "";

    users.forEach((user) => addUserToTable(user));
  }

  userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const date = new Date().toLocaleDateString("pt-BR");

    if (!username || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    const user = { username, email, date };
    addUserToTable(user);
    saveUserToLocalStorage(user);
    userForm.reset();
  });

  function addUserToTable(user) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.username || "—"}</td>
      <td>${user.email || "—"}</td>
      <td>${user.date || "—"}</td>
      <td><button class="delete-button">Excluir</button></td>
    `;

    row.querySelector(".delete-button").addEventListener("click", () => {
      if (confirm(`Deseja excluir ${user.username}?`)) {
        row.remove();
        deleteUserFromLocalStorage(user.email);
      }
    });

    userTableBody.appendChild(row);
  }

  function saveUserToLocalStorage(user) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  function deleteUserFromLocalStorage(email) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter((u) => u.email !== email);
    localStorage.setItem("users", JSON.stringify(users));
  }

  clearFormBtn.addEventListener("click", () => userForm.reset());

  clearAllBtn.addEventListener("click", () => {
    if (confirm("Deseja realmente excluir todos os usuários?")) {
      localStorage.removeItem("users");
      userTableBody.innerHTML = "";
    }
  });

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const rows = userTableBody.getElementsByTagName("tr");

    Array.from(rows).forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(filter) ? "" : "none";
    });
  });
});
