const API_URL = "https://coretasks-1.onrender.com/api/tasks";

// Função para pegar parâmetro da URL (?id=123)
function getTaskIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Renderiza detalhes
function renderTaskDetails(task) {
  const detailsDiv = document.querySelector("#taskDetails");
  detailsDiv.innerHTML = `
    <p><strong>Nome:</strong> ${task.name}</p>
    <p><strong>Descrição:</strong> ${task.description}</p>
    <p><strong>Data de Início:</strong> ${task.startdate ? new Date(task.startdate).toLocaleDateString() : "-"}</p>
    <p><strong>Data de Fim:</strong> ${task.enddate ? new Date(task.enddate).toLocaleDateString() : "-"}</p>
    <p><strong>Status:</strong> ${task.completed ? "✅ Concluída" : "❌ Pendente"}</p>
  `;
  document.querySelector("#actions").style.display = "flex";
}

// Busca uma tarefa específica
async function fetchTaskById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    if (data.status === 200 && data.data) {
      renderTaskDetails(data.data);
      setupActions(id);
    } else {
      document.querySelector("#taskDetails").innerHTML = `<p>❌ Tarefa não encontrada.</p>`;
    }
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    document.querySelector("#taskDetails").innerHTML = `<p>Erro ao carregar tarefa.</p>`;
  }
}

// Liga botões de ação
function setupActions(id) {
  document.querySelector("#editTask").addEventListener("click", () => {
    window.location.href = `editar.html?id=${id}`;
  });

  document.querySelector("#deleteTask").addEventListener("click", async () => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        const result = await response.json();
        if (result.status === 200) {
          alert("Tarefa excluída com sucesso!");
          window.location.href = "index.html";
        } else {
          alert("Erro ao excluir tarefa.");
        }
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
        alert("Erro na requisição ao excluir.");
      }
    }
  });
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  const id = getTaskIdFromUrl();
  if (!id) {
    document.querySelector("#taskDetails").innerHTML = `<p>ID da tarefa não informado.</p>`;
    return;
  }
  fetchTaskById(id);
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
