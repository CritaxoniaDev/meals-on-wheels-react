<?php
namespace App\Http\Controllers;

use App\Models\Member;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $pendingExtensions = Member::with('user')
            ->where('pending_extension', true)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'pendingExtensions' => $pendingExtensions,
        ]);
    }

    public function approveExtension(Member $member)
    {
        $member->meal_plan_duration = 30;
        $member->pending_extension = false;
        $member->last_extension_date = now();
        $member->save();

        return redirect()->back()->with('success', 'Extension approved successfully.');
    }
}