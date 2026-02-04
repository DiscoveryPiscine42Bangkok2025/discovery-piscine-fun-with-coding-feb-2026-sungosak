const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("new");

loadTodos();

newBtn.addEventListener("click", () => {
  const text = prompt("Enter a new TO DO:");

  if (!text || text.trim() === "") {
    return;
  }

  addTodo(text);
  saveTodos();
});


function addTodo(text) {
  const div = document.createElement("div");
  div.textContent = text;

  div.addEventListener("click", () => {
    if (confirm("Do you want to remove this TO DO?")) {
      div.remove();
      saveTodos();
    }
  });

  
  ftList.prepend(div);
}


function saveTodos() {
  const todos = [];
  const items = ftList.querySelectorAll("div");

  items.forEach(item => {
    todos.push(item.textContent);
  });

  document.cookie =
    "todos=" + encodeURIComponent(JSON.stringify(todos)) +
    "; path=/";
}

function loadTodos() {
  const cookies = document.cookie.split("; ");

  for (let cookie of cookies) {
    if (cookie.startsWith("todos=")) {
      const value = cookie.split("=")[1];
      const todos = JSON.parse(decodeURIComponent(value));

      todos.forEach(todo => {
        addTodo(todo);
      });
    }
  }
}
