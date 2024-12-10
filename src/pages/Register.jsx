import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Para realizar a requisição HTTP
import "../styles/register.css"; // Importando o CSS de registro

function Register() {
  const [login, setLogin] = useState(""); // E-mail
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    try {
      // Chamada à API para registrar o usuário
      const response = await axios.post("http://localhost:8000/api/register", {
        login: login,
        senha: password,
        senha_confirmation: confirmPassword,
        primeiro_nome: firstName,
        segundo_nome: secondName
      });

      if (response.data.message) {
        alert("Usuário registrado com sucesso!");
        navigate("/login"); // Redirecionar para o login após o sucesso
      }
    } catch (error) {
      // Tratar erros do servidor ou de validação
      if (error.response) {
        const errorData = error.response.data;
        // Mostrar erros detalhados do servidor, se existirem
        setErrorMessage(errorData.message || errorData.errors?.join(' ') || "Erro ao registrar usuário.");
      } else {
        setErrorMessage("Erro de conexão. Tente novamente.");
      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="card">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Primeiro Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Segundo Nome"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="E-mail"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="submit">
            Registrar
          </button>
        </form>

        <div className="signup-link">
          <p>
            Já tem uma conta?{" "}
            <Link to="/login" className="link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
