import React from 'react';

function TodoItem(props) {
  return <div
    style={{display:"flex",
  justifyContent:"center" , padding:5,marginLeft:30,marginRight:30,marginTop:15, borderRadius:10, border: "1px solid lightsalmon",  cursor:"pointer", backgroundColor:"paleturquoise"}}
          >
            {props.counter}
        <li style={{

                    textAlign: "center",
                    textDecoration: props.todoItem.complete ? "line-through":"",
                    textDecorationColor: props.todoItem.complete ? "red":""

                }}

        onClick={props.onComplete}>
          {props.todoItem.text}
        </li>
        <button style={{color: "green"}} onClick={props.onComplete}>✓</button >
        <button style={{color: "red"}} onClick={props.deleteTodoItem}>x</button >

        </div>
}

export default TodoItem;
