@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Assinaturas</h1>

        <!-- Exibindo as assinaturas existentes -->
        <div class="row mb-4">
            <div class="col">
                <h3>Assinaturas Ativas</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Vencimento</th>
                            <th>Banco</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody id="subscriptions-list">
                        <!-- As assinaturas serão preenchidas via fetch -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Formulário para adicionar uma nova assinatura -->
        <div class="row">
            <div class="col">
                <h3>Adicionar Nova Assinatura</h3>
                <form id="add-subscription-form">
                    <div class="form-group">
                        <label for="nome_assinatura">Nome da Assinatura</label>
                        <input type="text" class="form-control" id="nome_assinatura" required>
                    </div>
                    <div class="form-group">
                        <label for="valor">Valor</label>
                        <input type="number" step="0.01" class="form-control" id="valor" required>
                    </div>
                    <div class="form-group">
                        <label for="vencimento">Vencimento</label>
                        <input type="date" class="form-control" id="vencimento" required>
                    </div>
                    <div class="form-group">
                        <label for="banco_id">Banco</label>
                        <select class="form-control" id="banco_id" required>
                            <option value="">Selecione um Banco</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="categoria_id">Categoria</label>
                        <select class="form-control" id="categoria_id" required>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Adicionar Assinatura</button>
                </form>
            </div>
        </div>
    </div>

    <script>
        // Função para recuperar o token JWT do localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login'; // Se o token não existir, redireciona para o login
        }

        // Função para carregar as assinaturas
        function loadSubscriptions() {
            fetch('https://7886-187-19-156-196.ngrok-free.app/api/finance/subscriptions', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const subscriptionsList = document.getElementById('subscriptions-list');
                    subscriptionsList.innerHTML = ''; // Limpa a lista antes de preencher

                    data.forEach((subscription, index) => {
                        const row = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${subscription.nome_assinatura}</td>
                            <td>${subscription.valor}</td>
                            <td>${subscription.vencimento}</td>
                            <td>${subscription.banco_id || 'N/A'}</td>
                            <td>${subscription.categoria_id || 'N/A'}</td>
                        </tr>
                    `;
                        subscriptionsList.innerHTML += row;
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar assinaturas:', error);
                    alert('Erro ao carregar as assinaturas');
                });
        }

        // Função para carregar os bancos no select
        function loadBanks() {
            fetch('https://7886-187-19-156-196.ngrok-free.app/api/finance/banks', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const selectElement = document.getElementById('banco_id');
                    // Limpar opções anteriores (caso haja)
                    selectElement.innerHTML = '<option value="">Selecione um Banco</option>';

                    data.forEach(bank => {
                        const option = document.createElement('option');
                        option.value = bank.id; // O valor enviado será o id do banco
                        option.textContent = bank.nome; // Exibe o nome do banco
                        selectElement.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar bancos:', error);
                    alert('Erro ao carregar bancos');
                });
        }

        // Função para carregar as categorias no select
        function loadCategories() {
            fetch('https://7886-187-19-156-196.ngrok-free.app/api/finance/categories', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const selectElement = document.getElementById('categoria_id');
                    // Limpar opções anteriores (caso haja)
                    selectElement.innerHTML = '<option value="">Selecione uma Categoria</option>';

                    data.forEach(category => {
                        const option = document.createElement('option');
                        option.value = category.id; // O valor enviado será o id da categoria
                        option.textContent = category.nome; // Exibe o nome da categoria
                        selectElement.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar categorias:', error);
                    alert('Erro ao carregar categorias');
                });
        }

        // Função para adicionar uma nova assinatura
        document.getElementById('add-subscription-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const data = {
                nome_assinatura: document.getElementById('nome_assinatura').value,
                valor: parseFloat(document.getElementById('valor').value),
                vencimento: document.getElementById('vencimento').value,
                banco_id: parseInt(document.getElementById('banco_id').value),
                categoria_id: parseInt(document.getElementById('categoria_id').value),
            };

            fetch('https://7886-187-19-156-196.ngrok-free.app/api/finance/subscriptions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Assinatura adicionada com sucesso!') {
                        alert('Assinatura adicionada com sucesso!');
                        loadSubscriptions(); // Recarrega a lista de assinaturas
                    } else {
                        alert('Erro ao adicionar assinatura: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Erro ao adicionar assinatura:', error);
                    alert('Erro ao adicionar assinatura');
                });
        });

        // Carregar assinaturas, bancos e categorias quando a página for carregada
        window.onload = function() {
            loadSubscriptions(); // Carrega as assinaturas
            loadBanks(); // Carrega os bancos para o select
            loadCategories(); // Carrega as categorias para o select
        };
    </script>
@endsection
