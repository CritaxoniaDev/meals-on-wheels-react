<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Member;
use App\Models\Volunteer;
use App\Models\Partner;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Providers\RouteServiceProvider;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'gender' => 'required|in:male,female',
            'age' => 'required|integer|min:18',
            'phone_number' => 'required|string|max:11',
            'address' => 'required|string',
            'geolocation' => 'required|string',
            'role' => 'required|in:member,volunteer,partner',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'age' => $request->age,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'geolocation' => $request->geolocation,
            'role' => $request->role,
        ]);

        if ($request->role === 'member') {
            $request->validate([
                'care_giver_name' => 'required|string|max:255',
                'care_giver_relationship' => 'required|string|max:255',
                'medical_condition' => 'required|string',
                'medical_card_id' => 'required|string|max:255',
                'meal_plan_duration' => 'required|integer',
            ]);

            $roleData = Member::create([
                'user_id' => $user->id,
                'care_giver_name' => $request->care_giver_name,
                'care_giver_relationship' => $request->care_giver_relationship,
                'medical_condition' => $request->medical_condition,
                'medical_card_id' => $request->medical_card_id,
                'meal_plan_duration' => $request->meal_plan_duration,
            ]);
        } elseif ($request->role === 'volunteer') {
            $request->validate([
                'is_vaccinated' => 'required|boolean',
                'volunteer_duration' => 'required|string',
                'available_days' => 'required|array',
            ]);

            $roleData = Volunteer::create([
                'user_id' => $user->id,
                'is_vaccinated' => $request->is_vaccinated,
                'volunteer_duration' => $request->volunteer_duration,
                'available_days' => json_encode($request->available_days),
            ]);
        } elseif ($request->role === 'partner') {
            $request->validate([
                'restaurant_name' => 'required|string|max:255',
                'partnership_duration' => 'required|string',
            ]);

            $roleData = Partner::create([
                'user_id' => $user->id,
                'restaurant_name' => $request->restaurant_name,
                'partnership_duration' => $request->partnership_duration,
            ]);
        }

        event(new Registered($user));

        $request->session()->put('user', $user);
        $request->session()->put('roleData', $roleData);

        return redirect()->route('confirmation');
    }
}
