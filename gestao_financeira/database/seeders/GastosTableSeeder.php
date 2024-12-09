<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Gasto;

class GastosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Gasto::create([
            'usuario_id' => 1,
            'categoria_id' => 1,
            'nome' => 'Supermercado',
            'banco_id' => 3,
            'valor' => 250.00,
            'data' => '2024-01-05',
        ]);

        Gasto::create([
            'usuario_id' => 2,
            'categoria_id' => 2,
            'nome' => 'Curso de Inglês',
            'banco_id' => 4,
            'valor' => 500.00,
            'data' => '2024-01-08',
        ]);

        Gasto::create([
            'usuario_id' => 3,
            'categoria_id' => 4,
            'nome' => 'Cinema',
            'banco_id' => 5,
            'valor' => 50.00,
            'data' => '2024-01-12',
        ]);
    }
}
