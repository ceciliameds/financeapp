<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Categoria::create(['nome' => 'Alimentação']);
        Categoria::create(['nome' => 'Educação']);
        Categoria::create(['nome' => 'Transporte']);
        Categoria::create(['nome' => 'Lazer']);
        Categoria::create(['nome' => 'Saúde']);
        Categoria::create(['nome' => 'Assinaturas']);
    }
}
