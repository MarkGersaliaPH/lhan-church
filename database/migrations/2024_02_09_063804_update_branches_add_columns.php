<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            //
            $table->string('name')->after('is_main');
            $table->string('mobile_no')->after('is_main')->nullable();
            $table->string('tel_no')->nullable()->after('is_main');
            $table->string('email')->nullable()->after('is_main');
            $table->string('services')->nullable()->after('is_main');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            //
            $table->dropColumn('name','mobile_no','tel_no','email','services');
        });
    }
};
