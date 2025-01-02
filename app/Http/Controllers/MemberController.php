<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MemberController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard', [
            'canAccess' => [
                'memberDashboard' => true,
            ],
        ]);
    }

    public function show($id)
    {
        $menu = Menu::with('partner.user')->findOrFail($id);
        $user = Auth::user();

        return Inertia::render('Menu/Show', [
            'menu' => [
                'id' => $menu->id,
                'name' => $menu->name,
                'description' => $menu->description,
                'image_path' => $menu->image_path,
                'category' => $menu->category,
                'partner_geolocation' => $menu->partner->user->geolocation,
                'restaurant_name' => $menu->partner->restaurant_name,
            ],
            'auth' => [
                'user' => [
                    'geolocation' => $user->geolocation,
                ],
            ],
        ]);
    }

    public function showExtensionForm()
    {
        return Inertia::render('Member/ExtensionForm');
    }

    public function requestExtension(Request $request)
    {
        $request->validate([
            'reason' => 'required|string|max:255',
        ]);

        $member = Auth::user()->member;
        $member->pending_extension = true;
        $member->extension_reason = $request->reason;
        $member->save();

        return redirect()->route('member.dashboard')->with('success', 'Extension request submitted successfully.');
    }

    public function updateMealPlanStatus(Request $request)
    {
        $request->validate([
            'daysLeft' => 'required|integer|min:0',
        ]);

        $member = Auth::user()->member;
        $member->meal_plan_duration = $request->daysLeft;
        $member->save();

        return response()->json(['message' => 'Meal plan status updated successfully']);
    }
}
