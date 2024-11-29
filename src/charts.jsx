// src/charts.js

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Registra as escalas e elementos que você usará no gráfico
ChartJS.register(
  CategoryScale,     // Para gráficos com escala de categoria (como eixo X de barras)
  LinearScale,       // Para gráficos com escala linear (como eixo Y)
  BarElement,        // Para gráficos de barras
  ArcElement,        // Para gráficos de pizza (pie chart)
  Title,             // Para o título do gráfico
  Tooltip,           // Para o tooltip
  Legend             // Para a legenda
);

export const dataCategory = {
    labels: ["Alimentação", "Mercado", "Saúde", "Transações", "Transporte"],
    datasets: [
      {
        label: "Gastos mensais por categoria",
        data: [300, 500, 150, 200, 100], // valores fictícios para os gastos
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  
  export const updateBankChartData = (bankDetails) => {
    const bankNames = bankDetails.map((bank) => bank.nome);
    const bankSaldo = bankNames.map((bankName) => {
      return bankDetails.find((bank) => bank.nome === bankName).saldo;
    });
    const bankEntradas = bankNames.map((bankName) => {
      return bankDetails.find((bank) => bank.nome === bankName).entradas;
    });
    const bankSaidas = bankNames.map((bankName) => {
      return bankDetails.find((bank) => bank.nome === bankName).saidas;
    });
  
    return {
      labels: bankNames,
      datasets: [
        {
          label: "Saldo",
          data: bankSaldo,
          backgroundColor: "rgba(0, 255, 0, 0.5)", // Verde para o saldo
          borderColor: "rgba(0, 255, 0, 1)",
          borderWidth: 1,
        },
        {
          label: "Entradas",
          data: bankEntradas,
          backgroundColor: "rgba(255, 255, 0, 0.5)", // Amarelo para as entradas
          borderColor: "rgba(255, 255, 0, 1)",
          borderWidth: 1,
        },
        {
          label: "Saídas",
          data: bankSaidas,
          backgroundColor: "rgba(255, 99, 132, 0.5)", // Vermelho para as saídas
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  };
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw}`,
        },
      },
    },
  };
  