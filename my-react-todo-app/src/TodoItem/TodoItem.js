import React from "react";
import "./TodoItem.css";
import { Button, ListItem } from "@material-ui/core";


function TodoItem(props) {
  const listItemsStyle = props.todoItem.complete
    ? "completed"
    : "not-completed";
  return (
    <div className="TodoItem">
      {props.counter}
      <li className={listItemsStyle} onClick={props.onComplete}>
        {props.todoItem.text}
      </li>
      <Button color="primary" variant="outlined" onClick={props.onComplete}>
        ✓
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={props.deleteTodoItem}
      >
        x
      </Button>
    </div>
  );
}

export default TodoItem;
