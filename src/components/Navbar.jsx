import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>FinanceApp</h2>
      </div>
      <div className="navbar-links">
        <Link to="/login" className="navbar-login-button">
          Entrar
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
