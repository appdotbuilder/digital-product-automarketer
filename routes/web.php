<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\PublicResellerController;
use App\Http\Controllers\ResellerController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home page with products
Route::get('/', function () {
    $products = Product::active()->get();
    
    return Inertia::render('welcome', [
        'products' => $products,
        'referrer_code' => request()->query('ref'),
    ]);
})->name('welcome');

// Dashboard (requires authentication)
Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Member registration routes
Route::controller(MemberController::class)->group(function () {
    Route::get('/register-member', 'create')->name('members.create');
    Route::post('/register-member', 'store')->name('members.store');
    Route::get('/members/{member}', 'show')->name('members.show');
});

// Members management (authenticated users only)
Route::resource('members', MemberController::class)
    ->except(['create', 'store', 'show'])
    ->middleware(['auth']);

// Public reseller routes
Route::controller(PublicResellerController::class)->group(function () {
    Route::get('/partner/{code}', 'index')->name('reseller.landing');
    Route::post('/resellers', 'store')->name('resellers.store');
    Route::get('/resellers/{code}/dashboard', 'show')->name('reseller.show');
});

// Reseller management (authenticated users only)
Route::resource('resellers', ResellerController::class)
    ->except(['show', 'store'])
    ->middleware(['auth']);

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';