import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  state={
    todoItems:[],
    totalItems:0,
    displayType:"All"

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

  showTodoItems=(typeToDisplay)=>{
      this.setState(
        {
            displayType:typeToDisplay
        }
      );
  }

  render () {
    let todoItems=[];

    if(this.state.displayType==="All"){
      todoItems = this.state.todoItems;
    }

    return (
    <div style={{textAlign:"center", color: "blue", }}>
      <TodoForm onSubmit={this.addItem} />

      {todoItems.map(todoItem=>(
         <TodoItem
                key={todoItem.id}
                onComplete={()=>this.onComplete(todoItem.id)}
                deleteTodoItem={()=>this.deleteTodoItem(todoItem.id)}
                todoItem={todoItem}/>
      ))}
      <div >
      <button onClick={()=>this.showTodoItems("All")}>All</button>
      <button>Active</button>
      <button>Complete</button>
      </div>
      <div >
      Total Items are: {this.state.totalItems}
      </div>
    </div>
  );
  }
}

export default TodoList;
