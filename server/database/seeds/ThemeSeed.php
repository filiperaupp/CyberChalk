<?php

use Illuminate\Database\Seeder;

class ThemeSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('themes')->insert(
            [
            'name' => 'Tema 1.1',
            'category_id' => '1',
            ]
        );

        DB::table('themes')->insert(
            [
            'name' => 'Tema 1.2',
            'category_id' => '1',
            ]
        );

        DB::table('themes')->insert(
            [
            'name' => 'Tema 2.1',
            'category_id' => '2',
            ]
        );
        
        DB::table('themes')->insert(
            [
            'name' => 'Tema 2.2',
            'category_id' => '2',
            ]
        );
    }
}
