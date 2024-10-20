<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    
    protected $fillable = ["product_name","discount","amount_sold","final_price", "user_id"];
}
