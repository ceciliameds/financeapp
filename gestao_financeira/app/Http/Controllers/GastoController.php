<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;

class GastoController extends Controller
{
    /**
     * Listar todos os gastos do usuário autenticado.
     */
    public function index()
    {
        try {
            $gastos = Gasto::where('usuario_id', auth()->id())->get();
            return response()->json($gastos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar os gastos.', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Adicionar um novo gasto.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'nome' => 'required|string',
                'valor' => 'required|numeric',
                'data' => 'required|date',
                'banco_id' => 'nullable|exists:bancos,id',
                'categoria_id' => 'nullable|exists:categorias,id',
            ]);

            $gasto = Gasto::create([
                'usuario_id' => auth()->id(),
                'nome' => $request->nome,
                'valor' => $request->valor,
                'data' => $request->data,
                'banco_id' => $request->banco_id,
                'categoria_id' => $request->categoria_id,
            ]);

            return response()->json(['message' => 'Gasto adicionado com sucesso!', 'gasto' => $gasto], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Erro de validação.', 'details' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao adicionar o gasto.', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Excluir um gasto existente.
     */
    public function destroy($id)
    {
        try {
            $gasto = Gasto::where('usuario_id', auth()->id())->findOrFail($id);
            $gasto->delete();

            return response()->json(['message' => 'Gasto excluído com sucesso!'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Gasto não encontrado.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao excluir o gasto.', 'details' => $e->getMessage()], 500);
        }
    }
}
