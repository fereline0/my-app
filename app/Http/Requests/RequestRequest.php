<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'value' => 'required|string',
            'category_id' => [
                'required',
                'exists:categories,id',
            ],
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
            'title.required' => 'Название обращения обязательно для его создания и должно быть заполнено.',
            'title.string' => 'Название обращения должно быть строкой.',
            'title.max' => 'Название обращения не должно превышать 255 символов.',
            'value.required' => 'Значение обязательно для указания и должно быть заполнено.',
            'value.string' => 'Значение должно быть строкой.',
            'category_id.required' => 'Категория обязательна для выбора и должна быть указана.',
            'category_id.exists' => 'Выбранная категория не существует.',
        ];
    }
}
