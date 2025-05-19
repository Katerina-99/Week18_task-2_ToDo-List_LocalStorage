const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");
const emptyMessage = document.querySelector("#emptyMessage");
const clearBtn = document.querySelector("#clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
    clearBtn.disabled = true;
  } else {
    emptyMessage.style.display = "none";
    clearBtn.disabled = false;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.style.border = "1px solid gray";
    li.style.borderRadius = "5px";
    li.style.padding = "7px";
    li.style.marginBottom = "5px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "10px";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, done: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

clearBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

renderTasks();
