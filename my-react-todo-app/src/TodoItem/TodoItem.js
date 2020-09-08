import React from "react";
import "./TodoItem.css";
import { Button, ListItem, ListItemText } from "@material-ui/core";

function TodoItem(props) {
  const listItemsStyle = props.todoItem.complete
    ? "completed"
    : "not-completed";
  return (
    <div className="TodoItem">
      <ListItem onClick={props.onComplete}>
        <ListItemText className={listItemsStyle}>
          {" "}
          {props.todoItem.text}{" "}
        </ListItemText>
      </ListItem>
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
