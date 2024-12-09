<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Assinatura;

class AssinaturasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Assinatura::create([
            'usuario_id' => 1,
            'nome_assinatura' => 'Netflix',
            'valor' => 39.90,
            'vencimento' => '2024-01-01',
            'banco_id' => 5,
            'categoria_id' => 6,
        ]);

        Assinatura::create([
            'usuario_id' => 2,
            'nome_assinatura' => 'Spotify',
            'valor' => 19.90,
            'vencimento' => '2024-01-10',
            'banco_id' => 4,
            'categoria_id' => 6,
        ]);

        Assinatura::create([
            'usuario_id' => 3,
            'nome_assinatura' => 'Amazon Prime',
            'valor' => 14.90,
            'vencimento' => '2024-01-20',
            'banco_id' => 5,
            'categoria_id' => 6,
        ]);
    }
}
