// src/tables/EntryTable.js
import React from "react";

const EntryTable = ({ entries, setEntries, entryValues, setEntryValues }) => {
  const handleAddEntry = () => {
    const newEntry = {
      id: entries.length + 1,
      fonte: entryValues.fonte,
      valor: parseFloat(entryValues.valor),
      data: entryValues.data,
    };
    setEntries([...entries, newEntry]);
    setEntryValues({ fonte: "", valor: "", data: "" });
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="entries-list">
      <h3>Entradas</h3>
      <table>
        <thead>
          <tr>
            <th>Fonte</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.fonte}</td>
              <td>${entry.valor}</td>
              <td>{entry.data}</td>
              <td>
                <button onClick={() => handleRemoveEntry(entry.id)}>Remover</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={entryValues.fonte}
                onChange={(e) => setEntryValues({ ...entryValues, fonte: e.target.value })}
                placeholder="Fonte"
              />
            </td>
            <td>
              <input
                type="number"
                value={entryValues.valor}
                onChange={(e) => setEntryValues({ ...entryValues, valor: e.target.value })}
                placeholder="Valor"
              />
            </td>
            <td>
              <input
                type="date"
                value={entryValues.data}
                onChange={(e) => setEntryValues({ ...entryValues, data: e.target.value })}
              />
            </td>
            <td>
              <button onClick={handleAddEntry}>Adicionar Entrada</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EntryTable;
