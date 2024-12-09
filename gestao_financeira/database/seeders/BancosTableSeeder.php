<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Banco;

class BancosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Banco::create(['nome' => 'Banco do Brasil']);
        Banco::create(['nome' => 'Caixa Econômica Federal']);
        Banco::create(['nome' => 'Itaú']);
        Banco::create(['nome' => 'Bradesco']);
        Banco::create(['nome' => 'Nubank']);
    }
}
