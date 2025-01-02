<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'care_giver_name',
        'care_giver_relationship',
        'medical_condition',
        'medical_card_id',
        'meal_plan_duration',
        'pending_extension',
        'extension_reason',
        'last_extension_date',
    ];

    protected $casts = [
        'pending_extension' => 'boolean',
        'last_extension_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}