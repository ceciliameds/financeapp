import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação simples para login
    if (username === "user" && password === "password") {
      navigate("/dashboard");
    } else {
      alert("Login inválido");
    }
  };

  return (
    <div className="card">
      <div className="profile-icon">👤</div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <div className="card-options">
          <a href="#">Esqueceu sua senha?</a>
        </div> */}
        <button type="submit" className="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
