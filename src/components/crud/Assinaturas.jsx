import React, { useState } from "react";

function Assinaturas() {
  const [assinaturas, setAssinaturas] = useState([]);
  const [form, setForm] = useState({ nome: "", valor: "", vencimento: "" });

  const handleAdd = () => {
    setAssinaturas([...assinaturas, { ...form }]);
    setForm({ nome: "", valor: "", vencimento: "" });
  };

  return (
    <div className="assinaturas">
      <h2>Assinaturas</h2>
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
        type="number"
        placeholder="Vencimento (Dia)"
        value={form.vencimento}
        onChange={(e) => setForm({ ...form, vencimento: e.target.value })}
      />
      <button className="add-button" onClick={handleAdd}>Adicionar Assinatura</button>
      <ul>
        {assinaturas.map((a, index) => (
          <li key={index}>
            {a.nome} - R$ {a.valor}/mês - Dia {a.vencimento}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assinaturas;
