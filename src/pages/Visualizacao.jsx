import React, { useState } from "react";
import Gastos from "../components/crud/Gastos";
import Dashboard from "../pages/Dashboard";

function Visualizacao() {
  const [expenses, setExpenses] = useState([]);

  return (
    <div>
      <Dashboard expenses={expenses} />
      <Gastos onExpensesUpdate={setExpenses} />
    </div>
  );
}

export default Visualizacao;
