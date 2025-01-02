<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('members', function (Blueprint $table) {
            $table->boolean('pending_extension')->default(false);
            $table->text('extension_reason')->nullable();
            $table->timestamp('last_extension_date')->nullable();
        });
    }

    public function down()
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn(['pending_extension', 'extension_reason', 'last_extension_date']);
        });
    }
};
