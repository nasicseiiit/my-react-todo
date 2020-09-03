import React from "react";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

class TodoList extends React.Component {
  state = {
    todoItems: [],
    completeItems: [],
    activeItems: [],
    displayType: "All",
  };

  addItem = (todoItem) => {
    if (todoItem.text !== "") {
      this.setState({
        todoItems: [todoItem, ...this.state.todoItems],
      }, () => { this.storeData(this.state.todoItems);
      }  );
    }
  };

  onComplete = (todoItem) => {
    this.setState({
      todoItems: this.state.todoItems.map(function (todo) {
        if (todo.id === todoItem.id)
          return { ...todo, complete: !todo.complete };

        return todo;
      }),
    });
  };

  deleteTodoItem = (todoItem) => {
    this.setState({
      todoItems: this.state.todoItems.filter(function (todo) {
        return todo.id !== todoItem.id;
      }),
    });
  };

  showAllItems = (typeToDisplay) => {
    this.setState({
      displayType: typeToDisplay,
      todoItems: this.state.todoItems,
    });
  };

  showActiveItems = (typeToDisplay) => {
    this.setState({
      displayType: typeToDisplay,
      activeItems: this.state.todoItems.filter(function (todoItem) {
        return !todoItem.complete;
      }),
    });
  };

  showCompleteItems = (typeToDisplay) => {
    this.setState({
      displayType: typeToDisplay,
      completeItems: this.state.todoItems.filter(function (todoItem) {
        return todoItem.complete;
      }),
    });
  };

  componentWillMount = () => {
    var todos = this.getData();
    this.storeData(todos);
  };
  storeData = (todoItems) => {
    localStorage.setItem("todo-items", JSON.stringify(todoItems));
  };
  getData = () => {
    let todos = JSON.parse(localStorage.getItem("todo-items"));
    if (todos !== null) {
      this.setState({
        todoItems: todos,
      });
    }
  };

  render() {
    let displayType = this.state.displayType;
    let todoItems =
      displayType === "Active"
        ? this.state.activeItems
        : displayType === "Complete"
        ? this.state.completeItems
        : this.state.todoItems;

    return (
      <div className="todo-list">

        <TodoForm onSubmit={this.addItem} />

        {todoItems.map((todoItem, idx) => (
          <TodoItem
            key={todoItem.id}
            onComplete={() => this.onComplete(todoItem)}
            deleteTodoItem={() => this.deleteTodoItem(todoItem)}
            counter={idx + 1}
            todoItem={todoItem}
          />
        ))}
        <div>
          <button
            className="all-button"
            onClick={() => this.showAllItems("All")}
          >
            All
          </button>
          <button
            className="active-button"
            onClick={() => this.showActiveItems("Active")}
          >
            Active
          </button>
          <button
            className="complete-button"
            onClick={() => this.showCompleteItems("Complete")}
          >
            Complete
          </button>
        </div>
        <div>Total Items are: {todoItems.length}</div>
      </div>
    );
  }
}

export default TodoList;
