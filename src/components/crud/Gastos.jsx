import React, { useState, useEffect } from "react";
import "../../styles/crud.css";

const API_URL_EXPENSES = "http://localhost:8000/api/expenses";
const API_URL_BANKS = "http://localhost:8000/api/finance/banks";
const API_URL_CATEGORIES = "http://localhost:8000/api/finance/categories";

function Gastos({ onExpensesUpdate }) {
  const [expenses, setExpenses] = useState([]);
  const [banks, setBanks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoria_id: "",
    nome: "",
    valor: "",
    data: "",
    banco_id: "",
  });

  const fetchExpenses = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(API_URL_EXPENSES, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
        if (onExpensesUpdate) onExpensesUpdate(data); // Atualiza o Dashboard com dados completos
      } else {
        console.error("Erro ao buscar gastos.");
      }
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    }
  };

  const fetchBanks = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(API_URL_BANKS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBanks(data);
      } else {
        console.error("Erro ao buscar bancos.");
      }
    } catch (error) {
      console.error("Erro ao buscar bancos:", error);
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(API_URL_CATEGORIES, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Erro ao buscar categorias.");
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const handleAddExpense = async () => {
    const token = localStorage.getItem("access_token");
    const payload = { ...form };

    try {
      const response = await fetch(API_URL_EXPENSES, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchExpenses(); // Atualiza a lista de gastos
        setForm({
          categoria_id: "",
          nome: "",
          valor: "",
          data: "",
          banco_id: "",
        });
      } else {
        console.error("Erro ao adicionar gasto.");
      }
    } catch (error) {
      console.error("Erro ao adicionar gasto:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${API_URL_EXPENSES}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchExpenses(); // Atualiza a lista de gastos
      } else {
        console.error("Erro ao excluir gasto.");
      }
    } catch (error) {
      console.error("Erro ao excluir gasto:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchBanks();
    fetchCategories();
  }, []);

  return (
    <div className="gastos">
      <h2>Adicionar Gasto</h2>
      <div className="form-group">
        <select
          value={form.categoria_id}
          onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
        >
          <option value="">Selecione uma Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nome}
            </option>
          ))}
        </select>

        <select
          value={form.banco_id}
          onChange={(e) => setForm({ ...form, banco_id: e.target.value })}
        >
          <option value="">Selecione um Banco</option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.nome}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Nome do Gasto"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={form.valor}
          onChange={(e) => setForm({ ...form, valor: e.target.value })}
        />
        <input
          type="date"
          value={form.data}
          onChange={(e) => setForm({ ...form, data: e.target.value })}
        />
        <button className="add-button" onClick={handleAddExpense}>
          Adicionar Gasto
        </button>
      </div>

      <h2>Gastos Cadastrados</h2>
      <div className="gastos-list">
        {expenses.map((expense) => (
          <div key={expense.id} className="gasto-item">
            <div>
              <strong>Nome:</strong> {expense.nome} <br />
              <strong>Categoria:</strong>{" "}
              {categories.find((cat) => cat.id === expense.categoria_id)?.nome || "N/A"}{" "}
              <br />
              <strong>Banco:</strong>{" "}
              {banks.find((bank) => bank.id === expense.banco_id)?.nome || "N/A"} <br />
              <strong>Valor:</strong> R$ {expense.valor} <br />
              <strong>Data:</strong>{" "}
              {new Date(expense.data).toLocaleDateString("pt-BR")}
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteExpense(expense.id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gastos;
