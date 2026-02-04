$(document).ready(function () {
  loadTodos();

  $("#new").click(function () {
    const text = prompt("Enter a new TO DO:");

    if (!text || text.trim() === "") {
      return;
    }

    addTodo(text);
    saveTodos();
  });
});

function addTodo(text) {
  const div = $("<div></div>").text(text);

  div.click(function () {
    if (confirm("Do you want to remove this TO DO?")) {
      $(this).remove();
      saveTodos();
    }
  });


  $("#ft_list").prepend(div);
}

function saveTodos() {
  const todos = [];

  $("#ft_list div").each(function () {
    todos.push($(this).text());
  });

  document.cookie =
    "todos=" + encodeURIComponent(JSON.stringify(todos)) +
    "; path=/";
}

function loadTodos() {
  const cookies = document.cookie.split("; ");

  cookies.forEach(function (cookie) {
    if (cookie.startsWith("todos=")) {
      const value = cookie.split("=")[1];
      const todos = JSON.parse(decodeURIComponent(value));

      todos.forEach(function (todo) {
        addTodo(todo);
      });
    }
  });
}
