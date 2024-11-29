// AddTransaction.jsx
import React, { useState } from 'react';

const AddTransaction = ({ onAddTransaction }) => {
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('Saída');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransaction = { categoria, tipo, valor: parseFloat(valor), descricao };
    onAddTransaction(newTransaction);
    setCategoria('');
    setTipo('Saída');
    setValor('');
    setDescricao('');
  };

  return (
    <div className="add-transaction">
      <h3>Adicionar Transação</h3>
      <form onSubmit={handleAddTransaction}>
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Saída">Saída</option>
          <option value="Entrada">Entrada</option>
        </select>
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddTransaction;
