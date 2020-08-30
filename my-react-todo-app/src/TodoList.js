import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

var firebase = require('firebase');
var uuid = require('uuid');
var firebaseConfig = {
    apiKey: "AIzaSyCclals1pb04yrMv5u1jxu0Qpj3yNJnu7A",
    authDomain: "my-react-todo-app-c1d36.firebaseapp.com",
    databaseURL: "https://my-react-todo-app-c1d36.firebaseio.com",
    projectId: "my-react-todo-app-c1d36",
    storageBucket: "my-react-todo-app-c1d36.appspot.com",
    messagingSenderId: "957049945928",
    appId: "1:957049945928:web:a605a411e357b0f816fd7d",
    measurementId: "G-J3VNC3SE2K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();



class TodoList extends React.Component {
  state={
    todoItems:[],
    displayType:"All",
    uid: uuid.v1()

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
    firebase.database().ref('Nasireact/'+this.state.uid).set({
      todoItems: this.state.todoItems
    });
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
    <div style={{textAlign:"center", color: "fuchsia", marginRight:500, marginLeft:500, border: "5px solid deepskyblue" }}>
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
      <button  style={{color: "purple"}} onClick={()=>this.showTodoItems("All")}>All</button>
      <button  style={{color: "orangered"}} onClick={()=>this.showTodoItems("Active")}>Active</button>
      <button  style={{color: "green"}} onClick={()=>this.showTodoItems("Complete")}>Complete</button>
      </div>
      <div >
      Total Items are: {totalItems}
      </div>
    </div>
  );
  }
}

export default TodoList;
