<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
{
    
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_name' => $this->product_name,
            'discount' => $this->discount,
            'amount_sold' => $this->amount_sold,
            'final_price' => $this->final_price,
            'created_at' => $this->created_at
        ];
    }
}
