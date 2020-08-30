import React from 'react';
import TodoForm from './TodoForm';
import './TodoList.css';



class TodoList extends React.Component {
  state={
    todoItems:[]
  }

  addItem = (todoItem)=>{
    this.setState(
      function()
      {
        if(todoItem.text!=="")
        {
        return {todoItems:[todoItem,...this.state.todoItems]};
        }
      }
    );

  }

  render () {
    return (
    <div>
      <TodoForm onSubmit={this.addItem}/>
      <div className="listItems">
      {this.state.todoItems.map(function(todoItem){
        return <li key={todoItem.id}>{todoItem.text}</li>
      })
      }
      </div>
    </div>
  );
  }
}

export default TodoList;
