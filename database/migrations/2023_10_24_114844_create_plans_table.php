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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // PlanType::RECURRING (0) or PlanType::ONETIME (1)
            $table->string('name'); // Name of the plan
            $table->decimal('price', 8, 2); // Price of the plan
            $table->string('interval')->nullable();
            $table->decimal('capped_amount', 8, 2)->nullable(); // Store the amount of the charge, this helps if you are experimenting with pricing
            $table->string('terms')->nullable(); // Terms for the usage charges
            $table->integer('trial_days')->nullable(); // Nullable in case of 0 trial days
            $table->boolean('test')->default(false); // Is a test plan or not
            $table->boolean('on_install')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
