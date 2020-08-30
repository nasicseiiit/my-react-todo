import React from 'react';

function TodoItem(props) {
  return <div style={{display:"flex",
  justifyContent:"center"}}
          >
        <li style={{

                    textAlign: "center",
                    textDecoration: props.todoItem.complete ? "line-through":"",
                    textDecorationColor: props.todoItem.complete ? "red":"",

                }}

        onClick={props.onComplete}>
          {props.todoItem.text}
        </li>
        <button onClick={props.deleteTodoItem}>x
        </button >
        </div>
}

export default TodoItem;
