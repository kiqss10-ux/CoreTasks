const API_URL = "https://coretasks-1.onrender.com/tasks";
let currentPage = 1;
const pageSize = 5; // tarefas por página
let allTasks = [];

// Renderiza tabela
function renderTasks(tasks) {
  const tableBody = document.querySelector("#tasksTableBody");
  tableBody.innerHTML = "";

  if (tasks.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">Não há tarefas cadastradas.</td></tr>`;
    return;
  }

  tasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.description}</td>
      <td>${task.startdate ? new Date(task.startdate).toLocaleDateString() : "-"}</td>
      <td>${task.enddate ? new Date(task.enddate).toLocaleDateString() : "-"}</td>
      <td>${task.completed ? "✅ Concluída" : "❌ Pendente"}</td>
    `;

    // Clique → abrir página de detalhes
    row.addEventListener("click", () => {
      window.location.href = `detalhes.html?id=${task.id}`;
    });

    tableBody.appendChild(row);
  });
}

// Atualiza paginação
function renderPagination() {
  const pageInfo = document.querySelector("#pageInfo");
  const totalPages = Math.ceil(allTasks.length / pageSize);
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

  document.querySelector("#prevPage").disabled = currentPage === 1;
  document.querySelector("#nextPage").disabled = currentPage === totalPages;
}

// Muda de página
function changePage(direction) {
  const totalPages = Math.ceil(allTasks.length / pageSize);
  currentPage = Math.min(Math.max(1, currentPage + direction), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  renderTasks(allTasks.slice(start, end));
  renderPagination();
}

// Busca todas as tarefas
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.status === 200 && data.data) {
      allTasks = data.data;
      changePage(0);
    } else {
      console.error("Erro ao carregar tarefas:", data.message);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

// Inicializa
document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
  document.querySelector("#prevPage").addEventListener("click", () => changePage(-1));
  document.querySelector("#nextPage").addEventListener("click", () => changePage(1));
});

let currentFont = 100; // porcentagem

document.getElementById("increase-font").addEventListener("click", () => {
  if (currentFont < 160) {
    currentFont += 10;
    document.body.style.fontSize = currentFont + "%";
  }
});

document.getElementById("decrease-font").addEventListener("click", () => {
  if (currentFont > 60) {
    currentFont -= 10;
    document.body.style.fontSize = currentFont + "%";
  }
});