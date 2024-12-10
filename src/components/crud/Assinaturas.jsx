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

const API_URL_SUBSCRIPTIONS = "http://localhost:8000/api/finance/subscriptions";
const API_URL_BANKS = "http://localhost:8000/api/finance/banks";
const API_URL_CATEGORIES = "http://localhost:8000/api/finance/categories";

function Assinaturas() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banks, setBanks] = useState([]);
  const [form, setForm] = useState({
    nome_assinatura: "",
    valor: "",
    vencimento: "",
    banco_id: "",
    categoria_id: "",
  });

  const [categoryChartData, setCategoryChartData] = useState({});
  const [bankChartData, setBankChartData] = useState({});

  const getToken = () => localStorage.getItem("access_token");

  const fetchSubscriptions = async () => {
    const token = getToken();
    if (!token) {
      alert("Token não encontrado. Por favor, faça login.");
      return;
    }

    try {
      const response = await fetch(API_URL_SUBSCRIPTIONS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
        generateChartData(data);
      } else {
        alert("Erro ao carregar assinaturas.");
      }
    } catch (error) {
      console.error("Erro ao carregar assinaturas:", error);
    }
  };

  const fetchBanks = async () => {
    const token = getToken();
    if (!token) {
      alert("Token não encontrado. Por favor, faça login.");
      return;
    }

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
        alert("Erro ao carregar bancos.");
      }
    } catch (error) {
      console.error("Erro ao carregar bancos:", error);
    }
  };

  const fetchCategories = async () => {
    const token = getToken();
    if (!token) {
      alert("Token não encontrado. Por favor, faça login.");
      return;
    }

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
        alert("Erro ao carregar categorias.");
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const generateChartData = (data) => {
    const categoryDataMap = {};
    const bankDataMap = {};

    data.forEach((item) => {
      const categoryName =
        categories.find((category) => category.id === item.categoria_id)?.nome ||
        "Outros";
      const bankName =
        banks.find((bank) => bank.id === item.banco_id)?.nome || "Outros";

      categoryDataMap[categoryName] =
        (categoryDataMap[categoryName] || 0) + parseFloat(item.valor);
      bankDataMap[bankName] =
        (bankDataMap[bankName] || 0) + parseFloat(item.valor);
    });

    setCategoryChartData({
      labels: Object.keys(categoryDataMap),
      datasets: [
        {
          data: Object.values(categoryDataMap),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A"],
        },
      ],
    });

    setBankChartData({
      labels: Object.keys(bankDataMap),
      datasets: [
        {
          data: Object.values(bankDataMap),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A"],
        },
      ],
    });
  };

  const handleAddSubscription = async () => {
    const token = getToken();
    if (!token) {
      alert("Token não encontrado. Por favor, faça login.");
      return;
    }

    try {
      const response = await fetch(API_URL_SUBSCRIPTIONS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        fetchSubscriptions();
        setForm({
          nome_assinatura: "",
          valor: "",
          vencimento: "",
          banco_id: "",
          categoria_id: "",
        });
      } else {
        alert("Erro ao adicionar assinatura.");
      }
    } catch (error) {
      console.error("Erro ao adicionar assinatura:", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
    fetchBanks();
    fetchCategories();
  }, []);

  return (
    <div className="assinaturas">
      <div className="charts" style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "35%" }}>
          <h3>Assinaturas por Categoria</h3>
          {categoryChartData.labels ? (
            <Pie data={categoryChartData} />
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
        <div style={{ width: "35%" }}>
          <h3>Assinaturas por Banco</h3>
          {bankChartData.labels ? (
            <Pie data={bankChartData} />
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>

      <h2>Adicionar Assinatura</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nome da Assinatura"
          value={form.nome_assinatura}
          onChange={(e) =>
            setForm({ ...form, nome_assinatura: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={form.valor}
          onChange={(e) => setForm({ ...form, valor: e.target.value })}
        />
        <input
          type="date"
          value={form.vencimento}
          onChange={(e) => setForm({ ...form, vencimento: e.target.value })}
        />
        <select
          value={form.categoria_id}
          onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
        >
          <option value="">Selecione uma Categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
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
        <button onClick={handleAddSubscription}>Adicionar Assinatura</button>
      </div>

      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>
            {sub.nome_assinatura} - R$ {sub.valor} - Vencimento:{" "}
            {new Date(sub.vencimento).toLocaleDateString("pt-BR")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assinaturas;
