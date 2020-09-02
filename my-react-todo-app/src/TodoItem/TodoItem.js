import React from "react";

import "./TodoItem.css";

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
      <button className="complete-button" onClick={props.onComplete}>
        ✓
      </button>
      <button className="close-button" onClick={props.deleteTodoItem}>
        x
      </button>
    </div>
  );
}

export default TodoItem;
