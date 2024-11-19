<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// })->middleware(['verify.shopify'])->name('home');

Route::group(['middleware' => ['verify.shopify']], function () {
    Route::get('/', function () {
        return view('app');
    });
    Route::get('/create-product', function () {
        return view('app');
    });
    Route::post('/store-product', [ProductController::class, 'createProduct']);
});
