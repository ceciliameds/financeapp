import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api/finance/subscriptions";

function Assinaturas() {
  const [assinaturas, setAssinaturas] = useState([]);
  const [form, setForm] = useState({ nome_assinatura: "", valor: "", vencimento: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Função para buscar o token atualizado do localStorage
  const getToken = () => localStorage.getItem("access_token");

  // Carregar assinaturas
  const fetchAssinaturas = async () => {
    setLoading(true);
    const token = getToken();

    if (!token) {
      setError("Token não encontrado. Por favor, faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAssinaturas(data);
      } else {
        setError("Erro ao carregar assinaturas.");
      }
    } catch (error) {
      setError("Erro ao buscar assinaturas.");
    } finally {
      setLoading(false);
    }
  };

  // Adicionar assinatura
  const handleAdd = async () => {
    setLoading(true);
    const token = getToken();

    if (!token) {
      setError("Token não encontrado. Por favor, faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_assinatura: form.nome_assinatura,
          valor: parseFloat(form.valor),
          vencimento: form.vencimento,
          banco_id: 1, // Ajuste conforme a sua lógica de bancos
          categoria_id: 6, // Ajuste conforme a sua lógica de categorias
        }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchAssinaturas(); // Recarrega a lista
        setForm({ nome_assinatura: "", valor: "", vencimento: "" });
      } else {
        setError(data.message || "Erro ao adicionar assinatura.");
      }
    } catch (error) {
      setError("Erro ao adicionar assinatura.");
    } finally {
      setLoading(false);
    }
  };

  // Deletar assinatura
  const handleDelete = async (id) => {
    setLoading(true);
    const token = getToken();

    if (!token) {
      setError("Token não encontrado. Por favor, faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchAssinaturas(); // Recarrega a lista
      } else {
        setError("Erro ao excluir assinatura.");
      }
    } catch (error) {
      setError("Erro ao excluir assinatura.");
    } finally {
      setLoading(false);
    }
  };

  // Carregar assinaturas ao montar o componente
  useEffect(() => {
    fetchAssinaturas();
  }, []);

  return (
    <div>
      <h2>Assinaturas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Carregando...</p>}

      <div>
        <input
          type="text"
          placeholder="Nome"
          value={form.nome_assinatura}
          onChange={(e) => setForm({ ...form, nome_assinatura: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={form.valor}
          onChange={(e) => setForm({ ...form, valor: e.target.value })}
        />
        <input
          type="date"
          placeholder="Vencimento"
          value={form.vencimento}
          onChange={(e) => setForm({ ...form, vencimento: e.target.value })}
        />
        <button onClick={handleAdd} disabled={loading}>
          {loading ? "Adicionando..." : "Adicionar Assinatura"}
        </button>
      </div>

      <ul>
        {assinaturas.length > 0 ? (
          assinaturas.map((a) => (
            <li key={a.id}>
              {a.nome_assinatura} - R$ {a.valor}/mês - Vencimento: {a.vencimento}
              <button onClick={() => handleDelete(a.id)} disabled={loading}>
                {loading ? "Cancelando..." : "Cancelar"}
              </button>
            </li>
          ))
        ) : (
          <p>Nenhuma assinatura encontrada.</p>
        )}
      </ul>
    </div>
  );
}

export default Assinaturas;
