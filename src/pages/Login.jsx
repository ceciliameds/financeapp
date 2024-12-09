import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import User from "../assets/icons/user.png";
import Lock from "../assets/icons/lock.png";
import Email from "../assets/icons/email.png";
import { Link } from "react-router-dom"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "user" && password === "password") {
      navigate("/dashboard");
    } else {
      alert("Login inválido");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="profile-icon">
          <img src={User} alt="User" />
        </div>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <img src={Email} alt="Email Icon" className="input-icon" />
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <img src={Lock} alt="Lock Icon" className="input-icon" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit">
            Entrar
          </button>
        </form>

        <div className="signup-link">
          <p>
            Não tem uma conta?{" "}
            <Link to="/register" className="link">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
