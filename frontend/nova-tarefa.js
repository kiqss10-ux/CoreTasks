const API_URL = "https://coretasks-1.onrender.com/api/tasks";

async function createTask(task) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newTaskForm");
  const messageEl = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageEl.textContent = "";
    messageEl.style.color = "black";

    const newTask = {
      name: form.name.value.trim(),
      description: form.description.value.trim(),
      startDate: form.startdate.value || null,
      endDate: form.enddate.value || null,
      completed: form.completed.value,
    };

    if (!newTask.name || !newTask.description || !newTask.completed) {
      messageEl.style.color = "red";
      messageEl.textContent = "Por favor, preencha todos os campos obrigatórios.";
      return;
    }

    try {
      const result = await createTask(newTask);
      if (result.status === 201) {
        messageEl.style.color = "green";
        messageEl.textContent = "Tarefa criada com sucesso!";
        setTimeout(() => {
          window.location.href = `detalhes.html?id=${result.data.id}`;
        }, 1500);
      } else {
        messageEl.style.color = "red";
        messageEl.textContent = `Erro: ${result.message || "Não foi possível criar a tarefa."}`;
      }
    } catch {
      messageEl.style.color = "red";
      messageEl.textContent = "Erro ao tentar criar a tarefa.";
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