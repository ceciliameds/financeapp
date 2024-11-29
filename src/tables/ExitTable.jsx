// src/tables/ExitTable.js
import React from "react";

const ExitTable = ({ exits, setExits, exitValues, setExitValues, bankDetails }) => {
  const handleAddExit = () => {
    const newExit = {
      id: exits.length + 1,
      categoria: exitValues.categoria,
      valor: parseFloat(exitValues.valor),
      data: exitValues.data,
      bancoId: parseInt(exitValues.bancoId),
    };
    setExits([...exits, newExit]);
    setExitValues({ categoria: "", valor: "", data: "", bancoId: "" });
  };

  const handleRemoveExit = (id) => {
    setExits(exits.filter((exit) => exit.id !== id));
  };

  return (
    <div className="exits-list">
      <h3>Saídas</h3>
      <table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Banco</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {exits.map((exit) => (
            <tr key={exit.id}>
              <td>{exit.categoria}</td>
              <td>${exit.valor}</td>
              <td>{exit.data}</td>
              <td>{bankDetails.find((bank) => bank.id === exit.bancoId)?.nome}</td>
              <td>
                <button onClick={() => handleRemoveExit(exit.id)}>Remover</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={exitValues.categoria}
                onChange={(e) => setExitValues({ ...exitValues, categoria: e.target.value })}
                placeholder="Categoria"
              />
            </td>
            <td>
              <input
                type="number"
                value={exitValues.valor}
                onChange={(e) => setExitValues({ ...exitValues, valor: e.target.value })}
                placeholder="Valor"
              />
            </td>
            <td>
              <input
                type="date"
                value={exitValues.data}
                onChange={(e) => setExitValues({ ...exitValues, data: e.target.value })}
              />
            </td>
            <td>
              <select
                value={exitValues.bancoId}
                onChange={(e) => setExitValues({ ...exitValues, bancoId: e.target.value })}
              >
                {bankDetails.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.nome}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button onClick={handleAddExit}>Adicionar Saída</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExitTable;
