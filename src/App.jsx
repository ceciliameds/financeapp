import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./AddTransaction";

function App() {
  const [transactions, setTransactions] = useState([
    // {
    //   id: 1,
    //   categoria: "Alimentação",
    //   tipo: "Saída",
    //   valor: 300,
    //   descricao: "Compras de supermercado",
    // },
    // {
    //   id: 2,
    //   categoria: "Mercado",
    //   tipo: "Saída",
    //   valor: 500,
    //   descricao: "Compras no mercado",
    // },
    // {
    //   id: 3,
    //   categoria: "Transações",
    //   tipo: "Entrada",
    //   valor: 1000,
    //   descricao: "Pagamento recebido",
    // },
  ]);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard transactions={transactions} />}/>
          <Route path="/addtransaction" element={<AddTransaction onAddTransaction={handleAddTransaction} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
