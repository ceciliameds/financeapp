<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\GastoController;

// Autenticação
Route::post('register', [AuthController::class, 'register'])->name('auth.register');
Route::post('login', [AuthController::class, 'login'])->name('auth.login');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('auth.logout');

// FinanceController
Route::middleware('auth:api')->prefix('finance')->name('finance.')->group(function () {
    Route::get('banks', [FinanceController::class, 'getBanks'])->name('banks');
    Route::get('categories', [FinanceController::class, 'getCategories'])->name('categories');
    Route::get('subscriptions', [FinanceController::class, 'getSubscriptions'])->name('subscriptions.list');
    Route::post('subscriptions', [FinanceController::class, 'addSubscription'])->name('subscriptions.create');
});

// GastoController
Route::middleware('auth:api')->prefix('expenses')->name('expenses.')->group(function () {
    Route::get('/', [GastoController::class, 'index'])->name('list');
    Route::post('/', [GastoController::class, 'store'])->name('create');
    Route::delete('{id}', [GastoController::class, 'destroy'])->name('delete');
});

// Fallback 404
Route::fallback(function () {
    return response()->json(['error' => 'Rota não encontrada'], 404);
})->name('fallback');
