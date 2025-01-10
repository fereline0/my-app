<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'value' => 'required|string|max:255',
        ];
    }

    /**
     * Get the validation error messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'value.required' => 'Комментарий обязателен для заполнения.',
            'value.string' => 'Комментарий должен быть строкой.',
            'value.max' => 'Комментарий не должен превышать 255 символов.',
        ];
    }
}
