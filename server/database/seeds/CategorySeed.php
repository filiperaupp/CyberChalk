<?php

use Illuminate\Database\Seeder;

class CategorySeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert(
            [
            'name' => 'Categoria 1',
            'session' => '1',
            ]
        );
        DB::table('categories')->insert(
            [
            'name' => 'Categoria 2',
            'session' => '2',
            ]
        );

        DB::table('categories')->insert(
            [
            'name' => 'Categoria 3',
            'session' => '1',
            ]
        );
    }
}
