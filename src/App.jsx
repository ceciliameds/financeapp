import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Corrigindo a importação de Routes

import HomePage from "./components/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Importando o Register corretamente
// import Dashboard from "./pages/Dashboard";
import Visualizacao from "./pages/visualizacao";

function App() {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <Router>
      <div className="App">
        <Routes> {/* Definindo as rotas diretamente aqui */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Definindo a rota para Register */}
          <Route path="/visualizacao" element={<Visualizacao transactions={transactions} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
