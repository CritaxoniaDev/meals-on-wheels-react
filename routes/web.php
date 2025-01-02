<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ConfirmationController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\PartnerController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/register', [RegisteredUserController::class, 'create'])
    ->middleware('guest')
    ->name('register');

Route::get('/confirmation', [ConfirmationController::class, 'show'])
    ->name('confirmation')
    ->middleware('guest');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile/member', [ProfileController::class, 'memberProfile'])->name('profile.member');
    Route::get('/profile/volunteer', [ProfileController::class, 'volunteerProfile'])->name('profile.volunteer');
    Route::get('/profile/partner', [ProfileController::class, 'partnerProfile'])->name('profile.partner');
    Route::get('/profile/admin', [ProfileController::class, 'adminProfile'])->name('profile.admin');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Email Verification Routes
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Member Menu Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/member/dashboard', [MemberController::class, 'dashboard'])->name('member.dashboard');
    Route::get('/menu/{id}', [MemberController::class, 'show'])->name('menu.show');
    Route::put('/member/update-meal-plan-status', [MemberController::class, 'updateMealPlanStatus'])->name('member.update-meal-plan-status');
    Route::get('/member/extend-meal-plan', [MemberController::class, 'showExtensionForm'])->name('member.extend-form');
    Route::post('/member/extend-meal-plan', [MemberController::class, 'requestExtension'])->name('member.request-extension');
});

// Admin Menu Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/approve-extension/{member}', [AdminController::class, 'approveExtension'])->name('admin.approve-extension');
});

// Partner Menu Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/partner/create-menu', [PartnerController::class, 'createMenu'])->name('partner.create-menu');
    Route::post('/partner/store-menu', [PartnerController::class, 'storeMenu'])->name('partner.store-menu');
    Route::get('/partner/edit-menu/{id}', [PartnerController::class, 'editMenu'])->name('partner.edit-menu');
    Route::put('/partner/update-menu/{id}', [PartnerController::class, 'updateMenu'])->name('partner.update-menu');
    Route::delete('/partner/delete-menu/{id}', [PartnerController::class, 'deleteMenu'])->name('partner.delete-menu');
});

// Order Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/order/{menu}', [OrderController::class, 'create'])->name('order.create');
    Route::post('/order', [OrderController::class, 'store'])->name('order.store');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
});

Route::get('/partner/dashboard', [PartnerController::class, 'getMenuItems'])
    ->middleware(['auth', 'verified'])
    ->name('partner.dashboard');

require __DIR__ . '/auth.php';
