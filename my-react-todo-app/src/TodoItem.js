import React from 'react';

function TodoItem(props) {
  return <div style={{
              textAlign: "center",
              listStyle: "decimal",
              textDecoration: props.todoItem.complete ? "line-through":"",
              textDecorationColor: props.todoItem.complete ? "red":"",

          }}
          onClick={props.onComplete} 
          >
        <li >
          {props.todoItem.text}

        </li>
        </div>
}

export default TodoItem;
