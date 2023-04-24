window.addEventListener("DOMContentLoaded", () => {
  const addTodoButton = document.getElementById("addtodo");
  addTodoButton.addEventListener("click", () => {
    window.location.href='/todos/addtodo'
  });
});
