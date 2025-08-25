<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\PublicResellerController;
use App\Http\Controllers\ResellerController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home page with products
Route::get('/', function () {
    try {
        $products = Product::active()->get();
    } catch (\Exception $e) {
        // Fallback to empty array if products table doesn't exist
        $products = collect([]);
    }
    
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

// Diagnostic route for debugging
Route::get('/debug', function () {
    $diagnostics = [];
    
    // Check database connection
    try {
        \DB::connection()->getPdo();
        $diagnostics['database_connection'] = 'OK';
    } catch (\Exception $e) {
        $diagnostics['database_connection'] = 'FAILED: ' . $e->getMessage();
    }
    
    // Check if tables exist
    $tables = ['products', 'members', 'resellers', 'users'];
    foreach ($tables as $table) {
        try {
            \DB::table($table)->count();
            $diagnostics["table_{$table}"] = 'EXISTS';
        } catch (\Exception $e) {
            $diagnostics["table_{$table}"] = 'MISSING: ' . $e->getMessage();
        }
    }
    
    // Check model queries
    try {
        $productCount = Product::count();
        $diagnostics['products_count'] = $productCount;
    } catch (\Exception $e) {
        $diagnostics['products_query'] = 'FAILED: ' . $e->getMessage();
    }
    
    return response()->json($diagnostics);
})->name('debug');

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';