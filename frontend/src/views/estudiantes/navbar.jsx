import React from 'react';
import './assets/css/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>QuimiCraft</h1>
      <ul className="nav-links">
        <li>Home</li>
        <li>Categories</li>
        <li>About</li>
        <li>Contact Us</li>
        <li>Blogs</li>
      </ul>
      <button className="get-started">Get Started</button>
    </nav>
  );
}

export default Navbar;
