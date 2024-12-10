import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import User from "../assets/icons/user.png";
import Lock from "../assets/icons/lock.png";
import Email from "../assets/icons/email.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  // Função chamada ao submeter o formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviando a requisição de login para a API
      const response = await axios.post("http://localhost:8000/api/login", {
        login: username,
        senha: password,
      });

      // Verificando se a resposta contém o access_token
      if (response.data.access_token) {
        // Armazenando o token no localStorage
        localStorage.setItem("access_token", response.data.access_token);
        
        // Verificando se o token foi armazenado corretamente
        console.log("Token armazenado:", response.data.access_token); 

        // Redirecionando o usuário para o Dashboard
        navigate("/visualizacao"); 
      }
    } catch (error) {
      // Tratando erros da API e outros erros
      if (error.response) {
        // Se a resposta da API contiver erro, exibe a mensagem do servidor
        setErrorMessage(error.response.data.message || "Credenciais inválidas.");
      } else {
        // Caso haja erro de conexão
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
              required 
            />
          </div>
          <div className="input-group">
            <img src={Lock} alt="Lock Icon" className="input-icon" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {/* Exibindo mensagens de erro */}
          {errorMessage && <p className="error-message">{errorMessage}</p>} 

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
