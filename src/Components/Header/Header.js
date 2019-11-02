import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

export default function Header() {
  return (
    <div className="Header">
      <h1>Shelfie</h1>
      <div className="header_link_box">
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Inventory</Link>
      </div>
    </div>
  );
}
