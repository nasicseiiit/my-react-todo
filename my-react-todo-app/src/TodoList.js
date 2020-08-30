import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

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
  onComplete = (todoId) =>{
    this.setState(
      {
        todoItems: this.state.todoItems.map(function(todo)
      {
        if(todo.id===todoId)
        {
          return {...todo,complete:!todo.complete};
        }
        else {
          {
            return todo;
          }
        }
      })
      }
    );
  }

  deleteTodoItem = (todoId)=>{
    this.setState(
      {
        todoItems:this.state.todoItems.filter(function(todoItem){
          return todoItem.id!==todoId;
        })
      }
    );
  }

  render () {
    return (
    <div >
      <TodoForm onSubmit={this.addItem} />

      {this.state.todoItems.map(todoItem=>(
         <TodoItem
                key={todoItem.id}
                onComplete={()=>this.onComplete(todoItem.id)}
                deleteTodoItem={()=>this.deleteTodoItem(todoItem.id)}
                todoItem={todoItem}/>
      ))}
      <div style={{textAlign:"center", color: "blue"}}>
      Total Items are: {this.state.totalItems}
      </div>
    </div>
  );
  }
}

export default TodoList;
