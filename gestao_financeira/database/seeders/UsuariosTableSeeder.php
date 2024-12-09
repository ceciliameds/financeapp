<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class UsuariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Usuario::create([
            'login' => 'admin',
            'senha' => Hash::make('password'),
            'primeiro_nome' => 'Administrador',
            'segundo_nome' => 'Sistema',
        ]);

        Usuario::create([
            'login' => 'johndoe',
            'senha' => Hash::make('123456'),
            'primeiro_nome' => 'John',
            'segundo_nome' => 'Doe',
        ]);

        Usuario::create([
            'login' => 'janedoe',
            'senha' => Hash::make('123456'),
            'primeiro_nome' => 'Jane',
            'segundo_nome' => 'Doe',
        ]);
    }
}
