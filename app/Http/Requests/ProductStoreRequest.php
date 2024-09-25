<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
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
            'name' => "required|string|max:100",
            'type' => "nullable|string|max:50",
            'ustock' => 'required|string|max:20',
            'price' => 'required|numeric|min:0|max:99999999.99',
            'image' => "nullable|string",
            'user_id' => "exists:users,id",
            'description' => "nullable|string|max:500",
            'stock' => 'required|numeric|min:0'
        ];
    }
}
