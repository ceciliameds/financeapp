import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Delete from "../../assets/icons/delete.png";
import Edit from "../../assets/icons/edit.png";
import "../../styles/gastos.css";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  };

  useEffect(() => {
    const storedExits = JSON.parse(localStorage.getItem("exits")) || [];
    setExits(storedExits);
  }, []);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
  
    const monthlyExits = exits.filter((gasto) => {
      const gastoDate = new Date(gasto.data);
      return (
        gastoDate.getMonth() + 1 === currentMonth &&
        gastoDate.getFullYear() === currentYear
      );
    });
  
    const categoryTotals = {};
    monthlyExits.forEach((gasto) => {
      if (!categoryTotals[gasto.categoria]) {
        categoryTotals[gasto.categoria] = 0;
      }
      categoryTotals[gasto.categoria] += parseFloat(gasto.valor || 0);
    });
  
    const bankTotals = {};
    monthlyExits.forEach((gasto) => {
      if (!bankTotals[gasto.banco]) {
        bankTotals[gasto.banco] = 0;
      }
      bankTotals[gasto.banco] += parseFloat(gasto.valor || 0);
    });

    const categoryColors = generateColors(Object.keys(categoryTotals).length);
    const bankColors = generateColors(Object.keys(bankTotals).length);
  
    setCategoryChartData({
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: "Gastos por Categoria Mensal",
          data: Object.values(categoryTotals),
          backgroundColor: categoryColors,
          borderColor: "#ffffff",
          borderWidth: 1,
        },
      ],
    });
  
    setBankChartData({
      labels: Object.keys(bankTotals),
      datasets: [
        {
          label: "Gastos por Banco Mensal",
          data: Object.values(bankTotals),
          backgroundColor: bankColors,
          borderColor: "#ffffff",
          borderWidth: 1,
        },
      ],
    });
  }, [exits]);

  const handleAddExpense = () => {
    if (!form.categoria || !form.nome || !form.valor || !form.data || !form.banco) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    let updatedExits = [];
    if (isEditing) {
      updatedExits = [...exits];
      updatedExits[editIndex] = form;
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedExits = [...exits, { ...form }];
    }

    setExits(updatedExits);
    setForm({ categoria: "", nome: "", valor: "", data: "", banco: "" });

    localStorage.setItem("exits", JSON.stringify(updatedExits));
  };

  const handleDeleteExpense = (index) => {
    const updatedExits = exits.filter((_, i) => i !== index);
    setExits(updatedExits);

    localStorage.setItem("exits", JSON.stringify(updatedExits));
  };

  const handleEditExpense = (index) => {
    setForm(exits[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="gastos">
      <div className="charts" style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "35%" }}>
          <h3 style={{textAlign: "center"}}>Gastos por Categoria mensal</h3>
          {categoryChartData.labels ? (
            <Pie data={categoryChartData} />
          ) : (
            <p>Nenhum dado disponível</p>
          )}
        </div>
        <div style={{ width: "35%" }}>
          <h3 style={{textAlign: "center"}}>Gastos por Banco mensal</h3>
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
              <button
                className="edit-button"
                onClick={() => handleEditExpense(index)}
              >
                <img src={Edit} alt="Editar" />
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteExpense(index)}
              >
                <img src={Delete} alt="Deletar" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gastos;
