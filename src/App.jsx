import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [transactions, setTransactions] = useState([
 
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
