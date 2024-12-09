<!-- resources/views/auth/login.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Login</h1>
    <form id="login-form">
        <div class="mb-3">
            <label for="login" class="form-label">Login</label>
            <input type="text" class="form-control" id="login" name="login" required>
        </div>
        <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" name="senha" required>
        </div>
        <button type="submit" class="btn btn-primary">Entrar</button>
    </form>
</div>

<script>
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do form

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries()); // Converte os dados do formulário para um objeto

        // fetch('http://localhost:8000/api/login', {
        fetch('https://7886-187-19-156-196.ngrok-free.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(data) // Passa os dados do formulário no corpo da requisição
        })
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                // Armazena o token JWT no localStorage
                localStorage.setItem('token', data.access_token);
                
                // Redireciona para a página de assinaturas
                window.location.href = '/subscriptions';
            } else {
                // Exibe a mensagem de erro caso o login falhe
                alert('Erro: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login');
        });
    });
</script>

@endsection
