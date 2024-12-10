import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import Gastos from "../components/crud/Gastos";
import Footer from "../components/Footer";
import "../styles/dashboard.css";
import "../styles/charts.css";
import "../styles/crud.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [exits, setExits] = useState([]); // Despesas
  const [bankDetails, setBankDetails] = useState([]); // Bancos
  const [categories, setCategories] = useState([]); // Categorias
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      setLoading(true);
      // Requisição para buscar as despesas
      const responseExits = await fetch("http://localhost:8000/api/expenses");
      if (!responseExits.ok) throw new Error("Erro ao buscar despesas.");
      const dataExits = await responseExits.json();
      setExits(dataExits);

      // Requisição para buscar as categorias (caso seja necessária uma consulta específica)
      const responseCategories = await fetch("http://localhost:8000/api/categories");
      if (!responseCategories.ok) throw new Error("Erro ao buscar categorias.");
      const dataCategories = await responseCategories.json();
      setCategories(dataCategories);

      // Requisição para buscar os bancos (caso seja necessária uma consulta específica)
      const responseBanks = await fetch("http://localhost:8000/api/banks");
      if (!responseBanks.ok) throw new Error("Erro ao buscar bancos.");
      const dataBanks = await responseBanks.json();
      setBankDetails(dataBanks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Carrega os dados ao montar o componente
  }, []);

  // Função para calcular despesas por categoria
  const calculateCategoryExpenses = () => {
    if (!categories || !exits) return { labels: [], datasets: [] };

    const categoryExpenseMap = {};
    exits.forEach((exit) => {
      const categoryName =
        categories.find((cat) => cat.id === exit.categoria)?.type || "Outros";
      if (!categoryExpenseMap[categoryName]) {
        categoryExpenseMap[categoryName] = 0;
      }
      categoryExpenseMap[categoryName] += exit.valor;
    });

    return {
      labels: Object.keys(categoryExpenseMap),
      datasets: [
        {
          label: "Gastos por Categoria",
          data: Object.values(categoryExpenseMap),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A"],
          borderColor: "#ffffff",
          borderWidth: 1,
        },
      ],
    };
  };

  // Função para calcular despesas por banco
  const calculateBankExpenses = () => {
    if (!bankDetails || !exits) return { labels: [], datasets: [] };

    const bankExpenseMap = {};
    exits.forEach((exit) => {
      const bankName =
        bankDetails.find((bank) => bank.id === exit.bancoId)?.name || "Outros";
      if (!bankExpenseMap[bankName]) {
        bankExpenseMap[bankName] = 0;
      }
      bankExpenseMap[bankName] += exit.valor;
    });

    return {
      labels: Object.keys(bankExpenseMap),
      datasets: [
        {
          data: Object.values(bankExpenseMap),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A"],
          borderColor: "#ffffff",
          borderWidth: 1,
        },
      ],
    };
  };

  const categoryChartData = calculateCategoryExpenses();
  const bankChartData = calculateBankExpenses();

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard de Gastos</h2>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="charts" style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "35%" }}>
          <h3 style={{ textAlign: "center" }}>Gastos por Categoria</h3>
          {categoryChartData.labels && categoryChartData.labels.length > 0 ? (
            <Pie data={categoryChartData} />
          ) : (
            <p>Nenhum dado disponível</p>
          )}
        </div>
        <div style={{ width: "35%" }}>
          <h3 style={{ textAlign: "center" }}>Gastos por Banco</h3>
          {bankChartData.labels && bankChartData.labels.length > 0 ? (
            <Pie data={bankChartData} />
          ) : (
            <p>Nenhum dado disponível</p>
          )}
        </div>
      </div>

      <div className="crud-wrapper">
        <div className="crud-section">
          <Gastos exits={exits} setExits={setExits} categories={categories} bankDetails={bankDetails} />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
