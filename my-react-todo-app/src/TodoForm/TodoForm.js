import React from "react";
import "./TodoForm.css";
import shortid from "shortid";

class TodoForm extends React.Component {
  state = {
    text: "",
  };

  handleChange = (event) => {
    var text = event.target.value;
    this.setState(function () {
      return { text: text };
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      text: this.state.text,
      id: shortid.generate(),
      complete: false,
    });

    this.setState({
      text: "",
    });
  };

  render() {
    return (
      <div className="TodoForm">
        <form onSubmit={this.onFormSubmit}>
          <h2> Welcome to Todo App </h2>
          <input
            className="InputLabel"
            placeholder="Add todo"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          ></input>
          <button className="add-button" onClick={this.onFormSubmit}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default TodoForm;
