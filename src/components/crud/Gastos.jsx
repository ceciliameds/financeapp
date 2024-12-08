import React, { useState } from "react";
import Delete from "../../assets/icons/delete.png";
import Edit from "../../assets/icons/edit.png";

function Gastos() {
  const [exits, setExits] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, type: "Alimentação" },
    { id: 2, type: "Saúde" },
  ]);
  const [banks, setBanks] = useState([
    { id: 1, nome: "Nubank" },
    { id: 2, nome: "Santander" },
  ]);

  const [form, setForm] = useState({
    categoria: "",
    nome: "",
    banco: "",
    valor: "",
    data: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isBankModalOpen, setBankModalOpen] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [newBank, setNewBank] = useState("");

  const handleAddExpense = () => {
    if (
      !form.categoria ||
      !form.banco ||
      !form.nome ||
      !form.valor ||
      !form.data
    ) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    if (isEditing) {
      const updatedExits = [...exits];
      updatedExits[editIndex] = form;
      setExits(updatedExits);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setExits([...exits, { ...form }]);
    }
    setForm({ categoria: "", nome: "", banco: "", valor: "", data: "" });
  };

  const handleDeleteExpense = (index) => {
    const updatedExits = exits.filter((_, i) => i !== index);
    setExits(updatedExits);
  };

  const handleEditExpense = (index) => {
    setForm(exits[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Insira um nome válido para a categoria.");
      return;
    }
    setCategories([
      ...categories,
      { id: categories.length + 1, type: newCategory },
    ]);
    setNewCategory("");
    setCategoryModalOpen(false);
  };

  const handleAddBank = () => {
    if (!newBank.trim()) {
      alert("Insira um nome válido para o banco.");
      return;
    }
    setBanks([...banks, { id: banks.length + 1, nome: newBank }]);
    setNewBank("");
    setBankModalOpen(false);
  };

  return (
    <div className="gastos">
      <h2>Gastos</h2>
      <div className="form-group">
        {/* Select de Categoria */}
        <select
          value={form.categoria}
          onChange={(e) => {
            if (e.target.value === "add-category") {
              setCategoryModalOpen(true);
            } else {
              setForm({ ...form, categoria: e.target.value });
            }
          }}
        >
          <option value="">Selecione uma Categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.type}>
              {cat.type}
            </option>
          ))}
          <option
            value="add-category"
            style={{ color: "blue", fontWeight: "bold" }}
          >
            + Adicionar Nova Categoria
          </option>
        </select>

        {/* Select de Banco */}
        <select
          value={form.banco}
          onChange={(e) => {
            if (e.target.value === "add-bank") {
              setBankModalOpen(true);
            } else {
              setForm({ ...form, banco: e.target.value });
            }
          }}
        >
          <option value="">Selecione um Banco</option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.nome}>
              {bank.nome}
            </option>
          ))}
          <option
            value="add-bank"
            style={{ color: "blue", fontWeight: "bold" }}
          >
            + Adicionar Novo Banco
          </option>
        </select>

        {/* Outros Campos */}
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

      {/* Lista de Gastos */}
      <ul className="gastos-list">
        {exits.map((g, index) => (
          <li key={index} className="gasto-item">
            {g.nome} - {g.categoria} - R$ {g.valor} - {g.data} ({g.banco})
            <div className="action-buttons">
              <button className="edit-button" onClick={() => handleEditExpense(index)}>
                <img src={Edit} alt="Editar"/>
              </button>
              <button className="delete-button" onClick={() => handleDeleteExpense(index)}>
                <img src={Delete} alt="Deletar" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Categorias */}
      {isCategoryModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Adicionar Nova Categoria</h3>
            <input
              type="text"
              placeholder="Nova Categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button className="add-button" onClick={handleAddCategory}>Adicionar</button>
            <button className="close-button" onClick={() => setCategoryModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal de Bancos */}
      {isBankModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Adicionar Novo Banco</h3>
            <input
              type="text"
              placeholder="Novo Banco"
              value={newBank}
              onChange={(e) => setNewBank(e.target.value)}
            />
            <button className="add-button" onClick={handleAddBank}>Adicionar</button>
            <button className="close-button" onClick={() => setBankModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gastos;
