<!-- resources/views/auth/register.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Registrar Usuário</h1>
    <form id="register-form">
        <div class="mb-3">
            <label for="login" class="form-label">Login</label>
            <input type="text" class="form-control" id="login" name="login" required>
        </div>
        <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" name="senha" required>
        </div>
        <div class="mb-3">
            <label for="senha_confirmation" class="form-label">Confirmar Senha</label>
            <input type="password" class="form-control" id="senha_confirmation" name="senha_confirmation" required>
        </div>
        <div class="mb-3">
            <label for="primeiro_nome" class="form-label">Primeiro Nome</label>
            <input type="text" class="form-control" id="primeiro_nome" name="primeiro_nome" required>
        </div>
        <div class="mb-3">
            <label for="segundo_nome" class="form-label">Segundo Nome</label>
            <input type="text" class="form-control" id="segundo_nome" name="segundo_nome" required>
        </div>
        <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
</div>

<script>
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Usuário registrado com sucesso!');
                window.location.href = '/login'; // Redireciona para a página de login
            } else {
                alert('Erro: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Erro ao registrar:', error);
            alert('Erro ao registrar usuário');
        });
    });
</script>
@endsection
