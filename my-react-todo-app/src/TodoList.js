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
  const db = firebase.firestore();
var todoItems = [];
var ref = firebase.database().ref('Nasireact/');
ref.on('value',gotData,errData);

function gotData(data){
  console.log("Got data");
  todoItems = data.val();
  console.log(todoItems);
}

function errData(err){
  console.log(err)
}


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
    firebase.database().ref('Nasireact/').push(
      todoItem
    );

  }
  onComplete = (todoItem) =>{
    this.setState(
      {
        todoItems: this.state.todoItems.map(function(todo)
      {
        if(todo.id===todoItem.id)
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
    firebase.database().ref('Nasireact/').push(
    todoItem
    );
  }

  deleteTodoItem = (todoItem)=>{
    this.setState(
      {
        todoItems:this.state.todoItems.filter(function(todoItem){
          return todoItem.id!==todoItem.id;
        })
      }
    );
    firebase.database().ref('Nasireact/').push(
      todoItem
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

    // firebase.database().ref('Nasireact/'+this.state.uid).set({todoItems:todoItems});

    return (
    <div style={{textAlign:"center", color: "fuchsia", marginRight:500, marginLeft:500, border: "5px solid deepskyblue" }}>
      <TodoForm onSubmit={this.addItem} />

      {todoItems.map(todoItem=>(
         <TodoItem
                key={todoItem.id}
                onComplete={()=>this.onComplete(todoItem)}
                deleteTodoItem={()=>this.deleteTodoItem(todoItem)}
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
