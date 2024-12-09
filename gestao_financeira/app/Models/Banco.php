<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banco extends Model
{
    protected $table = 'bancos';

    protected $fillable = [
        'nome'
    ];

    // Relações
    public function assinaturas()
    {
        return $this->hasMany(Assinatura::class, 'banco_id');
    }

    public function gastos()
    {
        return $this->hasMany(Gasto::class, 'banco_id');
    }
}