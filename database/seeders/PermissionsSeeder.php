<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    app()[PermissionRegistrar::class]->forgetCachedPermissions();

    $permissions = [
      'edit request',
      'delete request',
      'create status',
      'edit status',
      'delete status',
      'create category',
      'edit category',
      'delete category',
      'edit request status',
    ];

    foreach ($permissions as $permission) {
      Permission::create(['name' => $permission]);
    }

    $user = Role::create(['name' => 'user']);
    $admin = Role::create(['name' => 'admin']);

    $admin->givePermissionTo(Permission::all());
  }
}
