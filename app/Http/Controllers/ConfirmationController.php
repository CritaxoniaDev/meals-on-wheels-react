<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ConfirmationController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->session()->get('user');
        $roleData = $request->session()->get('roleData');

        $user->sendEmailVerificationNotification();

        return Inertia::render('Confirmation', [
            'user' => $user,
            'roleData' => $roleData,
        ]);
    }
}