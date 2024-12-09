import React, { useState } from "react";
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
  const [exits, setExits] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [categories, setCategories] = useState([]);

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
      
    };
  };

  const calculateBankExpenses = () => {
    if (!bankDetails || !exits) return { labels: [], datasets: [] };

    const bankExpenseMap = {};
    exits.forEach((exit) => {
      const bankName =
        bankDetails.find((bank) => bank.id === exit.bancoId)?.nome || "Outros";
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
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#F7464A",
          ],
        },
      ],
    };
  };

  const categoryChartData = calculateCategoryExpenses();
  const bankChartData = calculateBankExpenses();

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard de Gastos</h2>

      <div className="crud-wrapper">
        <div className="crud-section">
          <Gastos
            exits={exits}
            setExits={setExits}
            categories={categories}
            bankDetails={bankDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
