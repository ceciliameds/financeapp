import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import User from "../assets/icons/user.png";
import Lock from "../assets/icons/lock.png";
import Email from "../assets/icons/email.png";
import { Link } from "react-router-dom";
import axios from "axios"; // Importando axios para requisições HTTP

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mostrar mensagens de erro
  const navigate = useNavigate();

  // Função para tratar o login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar a requisição de login para a API
      const response = await axios.post("http://localhost:8000/api/login", {
        login: username,
        senha: password,
      });

      // Se o login for bem-sucedido, armazenamos o token no localStorage
      if (response.data.access_token) {
        // Armazenar o token no localStorage
        localStorage.setItem("token", response.data.access_token);
        // Redireciona para o dashboard ou qualquer página interna
        navigate("/dashboard");
      }
    } catch (error) {
      // Se houver erro, mostramos a mensagem de erro
      if (error.response) {
        setErrorMessage(error.response.data.message || "Credenciais inválidas.");
      } else {
        setErrorMessage("Erro de conexão. Tente novamente.");
      }
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
              required // Torna o campo obrigatório
            />
          </div>
          <div className="input-group">
            <img src={Lock} alt="Lock Icon" className="input-icon" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Torna o campo obrigatório
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe erro, se houver */}

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