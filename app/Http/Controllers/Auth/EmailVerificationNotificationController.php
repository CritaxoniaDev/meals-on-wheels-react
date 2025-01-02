<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Notifications\CustomEmailVerification;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard'));
        }

        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Store the code in the database with expiration
        $request->user()->verificationCode()->create([
            'code' => $code,
            'expires_at' => now()->addHours(1),
        ]);

        $request->user()->notify(new CustomEmailVerification($code));

        return back()->with('status', 'verification-link-sent');
    }

    public function verifyCode(Request $request): RedirectResponse
    {
        $request->validate([
            'verification_code' => 'required|string|size:6'
        ]);

        $verificationCode = $request->user()->verificationCode()
            ->where('code', $request->verification_code)
            ->where('expires_at', '>', now())
            ->first();

        if (!$verificationCode) {
            return back()->withErrors(['verification_code' => 'Invalid or expired verification code.']);
        }

        $request->user()->markEmailAsVerified();
        $verificationCode->delete();

        return redirect()->intended(route('dashboard'));
    }
}
