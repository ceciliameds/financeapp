<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\GastoController;

// Página de registro
Route::get('register', function () {
    return view('auth.register'); // View de registro
})->name('register');

// Página de login
Route::get('login', function () {
    return view('auth.login'); // View de login
})->name('login');

Route::get('teste', function () {
    echo "teste"; // View de login
});

// Página de assinaturas (após login)
Route::get('subscriptions', function () {
    return view('finance.subscriptions'); // View de assinaturas
})->name('subscriptions');

// Rota para a página principal (exemplo, pode ser qualquer outra)
Route::get('/', function () {
    return view('welcome'); // View de boas-vindas ou página inicial
});

// Outras rotas necessárias podem ir aqui

// Fallback (caso a rota não seja encontrada)
Route::fallback(function () {
    return response()->json(['error' => 'Página não encontrada'], 404);
});
