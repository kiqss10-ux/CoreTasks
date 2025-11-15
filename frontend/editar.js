const API_URL = "http://localhost:3001/api/tasks";

function getTaskIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fetchTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    if (data.status === 200 && data.data) {
      return data.data;
    } else {
      throw new Error("Tarefa não encontrada");
    }
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    throw error;
  }
}

function fillForm(task) {
  document.getElementById("name").value = task.name || "";
  document.getElementById("description").value = task.description || "";
  document.getElementById("startdate").value = task.startdate ? task.startdate.split("T")[0] : "";
  document.getElementById("enddate").value = task.enddate ? task.enddate.split("T")[0] : "";
  document.getElementById("completed").value = task.completed ? "true" : "false";
}

async function updateTask(id, updatedTask) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const id = getTaskIdFromUrl();
  const messageEl = document.getElementById("message");
  if (!id) {
    messageEl.textContent = "ID da tarefa não fornecido na URL.";
    return;
  }

  try {
    const task = await fetchTask(id);
    fillForm(task);
  } catch (error) {
    messageEl.textContent = "Erro ao carregar a tarefa para edição.";
    return;
  }

  const form = document.getElementById("editTaskForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageEl.textContent = "";

    const updatedTask = {
      name: form.name.value.trim(),
      description: form.description.value.trim(),
      startDate: form.startdate.value || null,
      endDate: form.enddate.value || null,
      completed: form.completed.value,
    };

    // Validação simples
    if (!updatedTask.name || !updatedTask.description || !updatedTask.completed) {
      messageEl.textContent = "Por favor, preencha todos os campos obrigatórios.";
      return;
    }

    try {
      const result = await updateTask(id, updatedTask);
      if (result.status === 200) {
        messageEl.style.color = "green";
        messageEl.textContent = "Tarefa atualizada com sucesso!";
        // Opcional: redirecionar após alguns segundos
        setTimeout(() => {
          window.location.href = `detalhes.html?id=${id}`;
        }, 1500);
      } else {
        messageEl.style.color = "red";
        messageEl.textContent = `Erro: ${result.message || "Não foi possível atualizar a tarefa."}`;
      }
    } catch {
      messageEl.style.color = "red";
      messageEl.textContent = "Erro ao tentar atualizar a tarefa.";
    }
  });
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
