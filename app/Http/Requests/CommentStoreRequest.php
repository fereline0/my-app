<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'request_id' => 'required|exists:requests,id',
            'value' => 'required|string',
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
            'request_id.required' => 'Идентификатор обращения обязателен для заполнения.',
            'request_id.exists' => 'Указанное обращение не существует.',
            'value.required' => 'Комментарий обязателен для заполнения.',
            'value.string' => 'Комментарий должен быть строкой.',
        ];
    }
}
