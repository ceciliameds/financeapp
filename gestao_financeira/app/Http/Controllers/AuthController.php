<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'login' => 'required|string|unique:usuarios',
                'senha' => 'required|string|min:6|confirmed',
                'primeiro_nome' => 'required|string',
                'segundo_nome' => 'required|string',
            ]);
    
            $usuario = Usuario::create([
                'login' => $request->login,
                'senha' => Hash::make($request->senha),
                'primeiro_nome' => $request->primeiro_nome,
                'segundo_nome' => $request->segundo_nome,
            ]);
    
            return response()->json(['message' => 'Usuário registrado com sucesso!'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro ao registrar o usuário.', 'details' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'senha' => 'required|string',
        ]);
    
        $credentials = $request->only('login', 'senha');
    
        if (!$token = JWTAuth::attempt(['login' => $credentials['login'], 'password' => $credentials['senha']])) {
            return response()->json(['error' => 'As credenciais fornecidas estão incorretas.'], 401);
        }
    
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
        ]);
    }

public function logout()
{
    try {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Logout realizado com sucesso!']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Falha ao realizar logout.', 'details' => $e->getMessage()], 500);
    }
}

}

