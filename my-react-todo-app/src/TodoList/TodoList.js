import React from "react";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";
import { storeData, getData } from "../Database/Database";
import { Button }  from "@material-ui/core";
import "./TodoList.css";

class TodoList extends React.Component {
  state = {
    todoItems: [],
    completeItems: [],
    activeItems: [],
    displayType: "All",
  };

  componentDidMount = () => {
    let todos = getData();
    this.setTodoItems(todos);
  };

  setTodoItems = (todos) => {
    if (todos !== null) {
      this.setState({
        todoItems: todos,
      });
    }
  };

  addItem = (todoItem) => {
    if (todoItem.text !== "") {
      this.setState(
        {
          todoItems: [todoItem, ...this.state.todoItems],
        },
        () => {
          storeData(this.state.todoItems);
        }
      );
    }
  };

  onComplete = (todoItem) => {
    this.setState({
      todoItems: this.state.todoItems.map(function (todo) {
        if (todo.id === todoItem.id)
          return { ...todo, complete: !todo.complete };

        return todo;
      }),
    },() => {
      storeData(this.state.todoItems);
    }
  );
  };

  deleteTodoItem = (todoItem) => {
    this.setState({
      todoItems: this.state.todoItems.filter(function (todo) {
        return todo.id !== todoItem.id;
      }),
    },() => {
      storeData(this.state.todoItems);}
  );
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
          <Button
            color= "primary"
            variant= "outlined"
            onClick={() => this.showAllItems("All")}
          >
            All
          </Button>
          <Button
            color= "secondary"
            variant= "outlined"
            onClick={() => this.showActiveItems("Active")}
          >
            Active
          </Button>
          <Button
            color= "primary"
            variant= "outlined"
            onClick={() => this.showCompleteItems("Complete")}
          >
            Complete
          </Button>
        </div>
        <div>Total Items are: {todoItems.length}</div>
      </div>
    );
  }
}

export default TodoList;
