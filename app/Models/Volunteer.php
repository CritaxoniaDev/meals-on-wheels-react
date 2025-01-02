<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Volunteer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'is_vaccinated',
        'volunteer_duration',
        'available_days',
    ];

    protected $casts = [
        'is_vaccinated' => 'boolean',
        'available_days' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}