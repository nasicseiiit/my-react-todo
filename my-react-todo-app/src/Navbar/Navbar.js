import React from "react";
import "./Navbar.css";
import { Button } from "@material-ui/core";

const Navbar = () => {
  return (
    <nav>
      <div className="nav">
        <Button color="secondary" variant="outlined">
          <a href="/Todo">Todo</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
