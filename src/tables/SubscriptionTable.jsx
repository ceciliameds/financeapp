// src/tables/SubscriptionTable.js
import React from "react";

const SubscriptionTable = ({ subscriptions, setSubscriptions, subscriptionValues, setSubscriptionValues }) => {
  const handleAddSubscription = () => {
    const newSubscription = {
      id: subscriptions.length + 1,
      nome: subscriptionValues.nome,
      valor: parseFloat(subscriptionValues.valor),
      vencimento: subscriptionValues.vencimento,
    };
    setSubscriptions([...subscriptions, newSubscription]);
    setSubscriptionValues({ nome: "", valor: "", vencimento: "" });
  };

  const handleRemoveSubscription = (id) => {
    setSubscriptions(subscriptions.filter((subscription) => subscription.id !== id));
  };

  return (
    <div className="subscriptions-list">
      <h3>Assinaturas</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id}>
              <td>{subscription.nome}</td>
              <td>${subscription.valor}</td>
              <td>{subscription.vencimento}</td>
              <td>
                <button onClick={() => handleRemoveSubscription(subscription.id)}>Remover</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={subscriptionValues.nome}
                onChange={(e) => setSubscriptionValues({ ...subscriptionValues, nome: e.target.value })}
                placeholder="Nome"
              />
            </td>
            <td>
              <input
                type="number"
                value={subscriptionValues.valor}
                onChange={(e) => setSubscriptionValues({ ...subscriptionValues, valor: e.target.value })}
                placeholder="Valor"
              />
            </td>
            <td>
              <input
                type="date"
                value={subscriptionValues.vencimento}
                onChange={(e) => setSubscriptionValues({ ...subscriptionValues, vencimento: e.target.value })}
              />
            </td>
            <td>
              <button onClick={handleAddSubscription}>Adicionar Assinatura</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionTable;
