<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            [
                'name' => 'Открыто',
                'is_closed' => false,
            ],
            [
                'name' => 'Рассмотрено и скоро будет вынесен вердикт',
                'is_closed' => true,
            ],
            [
                'name' => 'Закрыто',
                'is_closed' => true,
            ],
        ];

        foreach ($statuses as $status) {
            Status::create($status);
        }
    }
}
