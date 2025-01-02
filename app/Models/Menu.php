<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = ['partner_id', 'name', 'description', 'image_path'];

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }
    
}