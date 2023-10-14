<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'count' => ['required', 'integer', 'min:5', 'max:100']
        ];
    }
}
