import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Todo from "../Todo/Todo";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Route path="/Todo" component={Todo} />
      </div>
    </BrowserRouter>
  );
}

export default App;
