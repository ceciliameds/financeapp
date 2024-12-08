import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="header">
      <div className="container">
        <div className="main-content">
          <div className="header-main">
            <h3 className="header-main-logo">FinanceApp</h3>
            <nav>
              <ul className="menu">
                <li className="menu-item">
                  <a href="#sobre" className="menu-item-link">
                    Sobre
                  </a>
                </li>
                <li className="menu-item">
                  <Link to="/login" className="menu-item-link">
                    Entrar
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
