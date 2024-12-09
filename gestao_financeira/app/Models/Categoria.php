<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categorias';

    protected $fillable = [
        'nome'
    ];

    // Relações
    public function assinaturas()
    {
        return $this->hasMany(Assinatura::class, 'categoria_id');
    }

    public function gastos()
    {
        return $this->hasMany(Gasto::class, 'categoria_id');
    }
}
