<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name' => "Вопрос"]);
        Category::create(['name' => "Проблема"]);
        Category::create(['name' => "Предложение"]);
        Category::create(['name' => "Отзыв"]);
    }
}
