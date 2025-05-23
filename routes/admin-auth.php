<?php

use App\Http\Controllers\Admin\Auth\LoginController;

use App\Http\Controllers\Admin\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin') -> middleware('guest:admin')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [LoginController::class, 'create'])
        ->name('login');
    Route::post('login', [LoginController::class, 'store']);

});

Route::prefix('admin') -> middleware('auth:admin')->group(function () {

    Route::post('logout', [LoginController::class, 'destroy'])
        ->name('logout');
});
