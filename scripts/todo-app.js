"use strict";

// creating an array of todos objects
let todos = getSavedTodos();

// creating an obj containing user searched string
const filters = {
  searchText: "",
  hideCompleted: false,
};

// calling renderTodos myself to display all todos on first run cz searchText is ''
renderTodos(todos, filters);

// tracking changes in searchTodo text bar and managing the event
document
  .querySelector("#searchTodoInput")
  .addEventListener("input", (event) => {
    filters.searchText = event.target.value;
    renderTodos(todos, filters);
  });

// tracking form submission event and changing its default behavior
// it is the addTodo button
document.querySelector("#todo-form").addEventListener("submit", (event) => {
  const text = event.target.elements.todoText.value.trim();
  event.preventDefault();

  if (text.length>0) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    event.target.elements.todoText.value = "";
  }
});

// event handler for hideCompleted checkbox
document.querySelector("#todo-checkbox").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
