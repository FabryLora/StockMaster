<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class ProductResource extends JsonResource
{
    
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'type' => $this->type,
            'ustock' => $this->ustock,
            'price' => $this->price,
            'description' => $this->description,
            'stock' => $this->stock
        ];

    }
}
