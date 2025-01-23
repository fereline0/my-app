<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                "name" => "Вопрос",
            ],
            [
                "name" => "Проблема",
            ],
            [
                "name" => "Предложение",
            ],
            [
                "name" => "Отзыв",
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
