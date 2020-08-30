import React from 'react';
import TodoForm from './TodoForm';

class TodoList extends React.Component {
  state={
    todoItems:[]
  }

  addItem = (todoItem)=>{
    this.setState(
      function()
      {
        if(todoItem!=="")
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
    </div>
  );
  }
}

export default TodoList;
