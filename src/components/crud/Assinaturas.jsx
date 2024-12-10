import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../../styles/gastos.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL = "http://localhost:8000/api/finance/subscriptions";

function Gastos() {
  const [exits, setExits] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, type: "Alimentação" },
    { id: 2, type: "Saúde" },
    { id: 3, type: "Lazer" },
    { id: 4, type: "Estudo" },
    { id: 5, type: "Transporte" },
    { id: 6, type: "Viagens" },
    { id: 7, type: "Moradia" },
    { id: 8, type: "Assinaturas" },
    { id: 9, type: "Outros" },
  ]);
  const [banks, setBanks] = useState([
    { id: 1, name: "Nubank" },
    { id: 2, name: "Banco do Brasil" },
    { id: 3, name: "Itaú" },
    { id: 4, name: "Santander" },
    { id: 5, name: "Bradesco" },
    { id: 6, name: "Caixa" },
    { id: 7, name: "Inter" },
    { id: 8, name: "Original" },
    { id: 9, name: "Next" },
    { id: 10, name: "Outros" },
  ]);
  const [form, setForm] = useState({
    categoria: "",
    nome: "",
    valor: "",
    data: "",
    banco: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [categoryChartData, setCategoryChartData] = useState({});
  const [bankChartData, setBankChartData] = useState({});

  // Função para buscar o token atualizado do localStorage
  const getToken = () => localStorage.getItem("access_token");

  const fetchExits = async () => {
    const token = getToken();

    if (!token) {
      alert("Token não encontrado. Por favor, faça login.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExits(data);
      } else {
        alert("Erro ao carregar os gastos.");
      }
    } catch (error) {
      alert("Erro ao carregar os gastos.");
    }
  };

  const handleAddExpense = async () => {
    const token = getToken();

    if (!token) {
      alert("Token não encontrado. Por favor, faça login.");
      return;
    }

    const expenseData = {
      categoria: form.categoria,
      nome: form.nome,
      valor: parseFloat(form.valor),
      data: form.data,
      banco: form.banco,
    };

    try {
      const response = await fetch(API_URL, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        fetchExits(); // Atualiza a lista de gastos
        setForm({
          categoria: "",
          nome: "",
          valor: "",
          data: "",
          banco: "",
        });
        setIsEditing(false);
        setEditIndex(null);
      } else {
        alert("Erro ao salvar o gasto.");
      }
    } catch (error) {
      alert("Erro ao salvar o gasto.");
    }
  };

  const handleDeleteExpense = async (index) => {
    const token = getToken();

    if (!token) {
      alert("Token não encontrado. Por favor, faça login.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${index}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchExits(); // Atualiza a lista de gastos
      } else {
        alert("Erro ao excluir o gasto.");
      }
    } catch (error) {
      alert("Erro ao excluir o gasto.");
    }
  };

  useEffect(() => {
    fetchExits();
  }, []);

  return (
    <div className="gastos">
      <div className="charts" style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "35%" }}>
          <h3 style={{ textAlign: "center" }}>Gastos por Categoria Mensal</h3>
          {categoryChartData.labels ? (
            <Pie data={categoryChartData} />
          ) : (
            <p>Nenhum dado disponível</p>
          )}
        </div>
        <div style={{ width: "35%" }}>
          <h3 style={{ textAlign: "center" }}>Gastos por Banco Mensal</h3>
          {bankChartData.labels ? (
            <Pie data={bankChartData} />
          ) : (
            <p>Nenhum dado disponível</p>
          )}
        </div>
      </div>

      <h2>Adicionar Gasto</h2>
      <div className="form-group">
        <select
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        >
          <option value="">Selecione uma Categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.type}>
              {cat.type}
            </option>
          ))}
        </select>
        <select
          value={form.banco}
          onChange={(e) => setForm({ ...form, banco: e.target.value })}
        >
          <option value="">Selecione um Banco</option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nome"
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
          {isEditing ? "Salvar Alterações" : "Adicionar Gasto"}
        </button>
      </div>

      <ul className="gastos-list">
        {exits.map((g, index) => (
          <li key={index} className="gasto-item">
            {g.nome} - {g.categoria} - {g.banco} - R$ {g.valor} -{" "}
            {new Date(g.data).toLocaleDateString("pt-BR")}
            <div className="action-buttons">
              <button className="edit-button" onClick={() => handleEditExpense(index)}>
                Editar
              </button>
              <button className="delete-button" onClick={() => handleDeleteExpense(index)}>
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gastos;
