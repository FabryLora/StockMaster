<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation() {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_name' => "required|string|max:100",
            'discount' => "nullable|numeric|max:50",
            'amount_sold' => 'required|numeric|min:1',
            'final_price' => 'required|numeric|min:0|max:99999999.99',
            'user_id' => "exists:users,id",
            
        ];
    }
}
