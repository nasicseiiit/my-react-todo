import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  state={
    todoItems:[],
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
    let totalItems;
    let counter=1;
    if(this.state.displayType==="All"){
      todoItems = this.state.todoItems;
      totalItems = todoItems.length;
    }

    else if(this.state.displayType==="Active"){
      todoItems = this.state.todoItems.filter(function(todoItem){
        return !todoItem.complete;
      })
      totalItems = todoItems.length;
    }

    else if(this.state.displayType==="Complete"){
      todoItems = this.state.todoItems.filter(function(todoItem){
        return todoItem.complete;
      })
      totalItems = todoItems.length;
    }



    return (
    <div style={{textAlign:"center", color: "blue", }}>
      <TodoForm onSubmit={this.addItem} />

      {todoItems.map(todoItem=>(
         <TodoItem
                key={todoItem.id}
                onComplete={()=>this.onComplete(todoItem.id)}
                deleteTodoItem={()=>this.deleteTodoItem(todoItem.id)}
                counter = {counter++}
                todoItem={todoItem}/>
      ))}
      <div >
      <button onClick={()=>this.showTodoItems("All")}>All</button>
      <button onClick={()=>this.showTodoItems("Active")}>Active</button>
      <button onClick={()=>this.showTodoItems("Complete")}>Complete</button>
      </div>
      <div >
      Total Items are: {totalItems}
      </div>
    </div>
  );
  }
}

export default TodoList;
