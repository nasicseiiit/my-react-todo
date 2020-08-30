import React from 'react';
import TodoForm from './TodoForm';

class TodoList extends React.Component {
  render () {
    return (
    <div>
      <TodoForm onSubmit={this.addItem}/>
    </div>
  );
  }
}

export default TodoList;
