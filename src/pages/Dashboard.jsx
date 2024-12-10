import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL_EXPENSES = "http://localhost:8000/api/expenses";
const API_URL_BANKS = "http://localhost:8000/api/finance/banks";
const API_URL_CATEGORIES = "http://localhost:8000/api/finance/categories";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [banks, setBanks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryChartData, setCategoryChartData] = useState({});
  const [bankChartData, setBankChartData] = useState({});

  // Função para coletar despesas
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
        generateChartData(data);
      } else {
        console.error("Erro ao buscar despesas.");
      }
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  // Função para coletar bancos
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

  // Função para coletar categorias
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

  // Função para gerar os dados para os gráficos
  const generateChartData = (expenses) => {
    const categoryDataMap = {};
    const bankDataMap = {};

    expenses.forEach((expense) => {
      const categoryName =
        categories.find((category) => category.id === expense.categoria_id)
          ?.nome || "Outros";
      const bankName =
        banks.find((bank) => bank.id === expense.banco_id)?.nome || "Outros";

      categoryDataMap[categoryName] =
        (categoryDataMap[categoryName] || 0) + parseFloat(expense.valor);

      bankDataMap[bankName] =
        (bankDataMap[bankName] || 0) + parseFloat(expense.valor);
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

  useEffect(() => {
    fetchBanks();
    fetchCategories();
    fetchExpenses();
  }, [categories, banks]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="charts-container">
        <div className="chart">
          <h3>Gastos por Categoria</h3>
          {categoryChartData.labels ? (
            <Pie data={categoryChartData} />
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
        <div className="chart">
          <h3>Gastos por Banco</h3>
          {bankChartData.labels ? (
            <Pie data={bankChartData} />
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
