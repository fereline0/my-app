<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PermissionsSeeder::class);

        Status::create([
            'name' => "Открыто",
        ]);

        Status::create([
            'name' => "Закрыто",
        ]);

        Category::create([
            'name' => "Вопрос",
        ]);

        Category::create([
            'name' => "Проблема",
        ]);

        Category::create([
            'name' => "Предложение",
        ]);

        Category::create([
            'name' => "Отзыв",
        ]);
    }
}
