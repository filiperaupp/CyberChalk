<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContentSolicitationToThemesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('content_solicitation_to_themes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('content_solicitation_id')->unsigned();
            $table->foreign('content_solicitation_id')->references('id')->on('content_solicitations');
            $table->integer('theme_id')->unsigned();
            $table->foreign('theme_id')->references('id')->on('themes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('content_solicitation_to_themes');
    }
}
