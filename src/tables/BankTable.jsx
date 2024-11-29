// src/tables/BankTable.js
import React from "react";

const BankTable = ({ bankDetails, setBankDetails, bankValues, setBankValues }) => {
  const handleAddBank = () => {
    const newBank = {
      id: bankDetails.length + 1,
      nome: bankValues.nome,
      saldo: parseFloat(bankValues.saldo),
      entradas: parseFloat(bankValues.entradas),
      saidas: parseFloat(bankValues.saidas),
    };
    setBankDetails([...bankDetails, newBank]);
    setBankValues({ nome: "", saldo: "", entradas: "", saidas: "" });
  };

  const handleRemoveBank = (id) => {
    setBankDetails(bankDetails.filter((bank) => bank.id !== id));
  };

  return (
    <div className="banks-list">
      <h3>Bancos</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Saldo</th>
            <th>Entradas</th>
            <th>Saidas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {bankDetails.map((bank) => (
            <tr key={bank.id}>
              <td>{bank.nome}</td>
              <td>${bank.saldo}</td>
              <td>${bank.entradas}</td>
              <td>${bank.saidas}</td>
              <td>
                <button onClick={() => handleRemoveBank(bank.id)}>Remover</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={bankValues.nome}
                onChange={(e) => setBankValues({ ...bankValues, nome: e.target.value })}
                placeholder="Nome do Banco"
              />
            </td>
            <td>
              <input
                type="number"
                value={bankValues.saldo}
                onChange={(e) => setBankValues({ ...bankValues, saldo: e.target.value })}
                placeholder="Saldo"
              />
            </td>
            <td>
              <input
                type="number"
                value={bankValues.entradas}
                onChange={(e) => setBankValues({ ...bankValues, entradas: e.target.value })}
                placeholder="Entradas"
              />
            </td>
            <td>
              <input
                type="number"
                value={bankValues.saidas}
                onChange={(e) => setBankValues({ ...bankValues, saidas: e.target.value })}
                placeholder="Saidas"
              />
            </td>
            <td>
              <button onClick={handleAddBank}>Adicionar Banco</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BankTable;
