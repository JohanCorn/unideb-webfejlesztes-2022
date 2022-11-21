<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('registration', [AuthController::class, 'registration']);
    Route::post('login', [AuthController::class, 'login']);
    Route::delete('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::apiResource('publishers', PublisherController::class)->only('index', 'show');
Route::apiResource('books', BookController::class)->only('index', 'show');
Route::apiResource('authors', AuthorController::class)->only('index', 'show');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('publishers', PublisherController::class)->except('index', 'show');
    Route::apiResource('books', BookController::class)->except('index', 'show');
    Route::apiResource('authors', AuthorController::class)->except('index', 'show');
});
