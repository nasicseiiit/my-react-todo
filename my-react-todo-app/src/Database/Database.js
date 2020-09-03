export const storeData = (todoItems) => {
  localStorage.setItem("todo-items", JSON.stringify(todoItems));
};

export const getData = (props) => {
  let todos = JSON.parse(localStorage.getItem("todo-items"));
  return todos;
};
