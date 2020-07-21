"use strict";

// fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// remove todo by id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// toggle the completed value for a given todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

// render application todos based on filters
// start of renderTodos() to render todos
const renderTodos = (todos, filters) => {
  const todoElement = document.querySelector("#toDos");
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompleteMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompleteMatch;
  });

  //finding incomplete todos
  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);

  // clearing the div completely
  todoElement.innerHTML = "";

  todoElement.appendChild(generateSummaryDOM(pendingTodos));

  //if todos match the search query show them otherwise not
  if (filteredTodos.length > 0) {
    // rendering filtered todos on the screen
    filteredTodos.forEach((todo) => {
      todoElement.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageElement = document.createElement("p");
    messageElement.classList.add("empty-message");
    messageElement.textContent = "No to-dos to show";
    todoElement.appendChild(messageElement);
  }
};
// end of renderTodos() to render todos

// get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  //   creating different elements
  // creating the div containing all the elements
  const todoElement = document.createElement("label");
  const containerElement = document.createElement("div");
  //   creating checkbox
  const checkboxElement = document.createElement("input");
  //   creating span/para for todo's text
  const todoText = document.createElement("span");
  //   creating button
  const removeButton = document.createElement("button");

  //   setup todo checkbox
  checkboxElement.setAttribute("type", "checkbox");
  // check the checkbox if todo.completed is true otherwise not
  checkboxElement.checked = todo.completed;
  // setup todo checkbox continues
  containerElement.appendChild(checkboxElement);
  checkboxElement.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  //   setup todoText
  todoText.textContent = todo.text;
  containerElement.appendChild(todoText);

  // setup container
  todoElement.classList.add("list-item");
  containerElement.classList.add("list-item__container");
  todoElement.appendChild(containerElement);

  //   setup the remove button
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoElement.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoElement;
};

// get the DOM element for list summary
const generateSummaryDOM = (pendingTodos) => {
  // creating and appending summary
  const summary = document.createElement("h2");
  const plural = pendingTodos.length === 1 ? "" : "s";
  summary.classList.add("list-title");

  summary.textContent = `You have ${pendingTodos.length} todo${plural} left`;

  return summary;
};
