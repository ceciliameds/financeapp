<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Assinatura;
use App\Models\Gasto;
use App\Models\Banco;
use App\Models\Categoria;

class FinanceController extends Controller
{
    public function getBanks()
    {
        try {
            $bancos = Banco::all();
            return response()->json($bancos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar os bancos.', 'details' => $e->getMessage()], 500);
        }
    }

    public function getCategories()
    {
        try {
            $categorias = Categoria::all();
            return response()->json($categorias, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar as categorias.', 'details' => $e->getMessage()], 500);
        }
    }

    public function getSubscriptions(Request $request)
    {
        try {
            $assinaturas = Assinatura::where('usuario_id', auth()->id())->get();
            return response()->json($assinaturas, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar as assinaturas.', 'details' => $e->getMessage()], 500);
        }
    }

    public function getExpenses(Request $request)
    {
        try {
            $gastos = Gasto::where('usuario_id', auth()->id())->get();
            return response()->json($gastos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar os gastos.', 'details' => $e->getMessage()], 500);
        }
    }

    public function addSubscription(Request $request)
    {
        try {
            $request->validate([
                'nome_assinatura' => 'required|string',
                'valor' => 'required|numeric',
                'vencimento' => 'required|date',
                'banco_id' => 'nullable|exists:bancos,id',
                'categoria_id' => 'nullable|exists:categorias,id',
            ]);

            Assinatura::create([
                'usuario_id' => auth()->id(),
                'nome_assinatura' => $request->nome_assinatura,
                'valor' => $request->valor,
                'vencimento' => $request->vencimento,
                'banco_id' => $request->banco_id,
                'categoria_id' => $request->categoria_id,
            ]);

            return response()->json(['message' => 'Assinatura adicionada com sucesso!'], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Erro de validação.', 'details' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao adicionar a assinatura.', 'details' => $e->getMessage()], 500);
        }
    }
}
