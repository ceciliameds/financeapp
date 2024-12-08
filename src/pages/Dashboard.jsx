import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { dataCategory, options } from "../charts"; // Importando os gráficos
import { EntryTable, ExitTable, SubscriptionTable, BankTable } from '../tables'; // Importação centralizada

import "../styles/dashboard.css";
import "../styles/charts.css";
import "../styles/tables.css";

const Dashboard = () => {
  const [entries, setEntries] = useState([/* dados iniciais de entradas */]);
  const [exits, setExits] = useState([/* dados iniciais de saídas */]);
  const [subscriptions, setSubscriptions] = useState([/* dados iniciais de assinaturas */]);
  const [bankDetails, setBankDetails] = useState([/* dados iniciais de bancos */]);
  const [entryValues, setEntryValues] = useState({ fonte: "", valor: "", data: "" });
  const [exitValues, setExitValues] = useState({ categoria: "", valor: "", data: "", bancoId: "" });
  const [subscriptionValues, setSubscriptionValues] = useState({ nome: "", valor: "", vencimento: "" });
  const [bankValues, setBankValues] = useState({ nome: "", saldo: "", entradas: "", saídas: "" });

  // Função para calcular os gastos por banco (somando entradas e saídas)
  const calculateBankExpenses = (bankDetails) => {
    const bankExpenseMap = {};

    // Soma as saídas e entradas por banco
    exits.forEach(exit => {
      const bankName = exit.bancoId; // bancoId é o identificador do banco
      const amount = exit.valor;

      if (!bankExpenseMap[bankName]) {
        bankExpenseMap[bankName] = 0;
      }

      bankExpenseMap[bankName] += amount;
    });

    // Adiciona os dados de entrada por banco
    entries.forEach(entry => {
      const bankName = entry.fonte; // Aqui, a entrada é associada ao campo "fonte" (nome do banco ou fonte de entrada)
      const amount = entry.valor;

      if (!bankExpenseMap[bankName]) {
        bankExpenseMap[bankName] = 0;
      }

      bankExpenseMap[bankName] += amount;
    });

    // Criação do gráfico com os gastos por banco
    const labels = Object.keys(bankExpenseMap);
    const data = Object.values(bankExpenseMap);

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A'], // Cores para os segmentos do gráfico
        hoverBackgroundColor: ['#FF7D9C', '#4C8DCC', '#FFDD6B', '#4FD4D4', '#FF7F84'],
      }]
    };
  };

  const bankChartData = calculateBankExpenses(bankDetails);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard de Gastos</h2>

      {/* Gráficos */}
      <div className="charts-wrapper">
        <div className="chart-box">
          <h3>Gastos Mensais por Categoria</h3>
          <Bar data={dataCategory} options={options} />
        </div>

        <div className="chart-box">
          <h3>Gastos por Banco</h3>
          <Pie data={bankChartData} options={options} />
        </div>
      </div>

      {/* Tabelas */}
      <div className="tables-wrapper">
        <EntryTable 
          entries={entries} 
          setEntries={setEntries} 
          entryValues={entryValues} 
          setEntryValues={setEntryValues} 
        />
        <ExitTable 
          exits={exits} 
          setExits={setExits} 
          exitValues={exitValues} 
          setExitValues={setExitValues} 
          bankDetails={bankDetails} 
        />
        <SubscriptionTable 
          subscriptions={subscriptions} 
          setSubscriptions={setSubscriptions} 
          subscriptionValues={subscriptionValues} 
          setSubscriptionValues={setSubscriptionValues} 
        />
        <BankTable 
          bankDetails={bankDetails} 
          setBankDetails={setBankDetails} 
          bankValues={bankValues} 
          setBankValues={setBankValues} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
