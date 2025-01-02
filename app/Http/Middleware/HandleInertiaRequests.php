<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use App\Models\Member;
use Inertia\Middleware;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();


        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'geolocation' => $user->geolocation,
                    'phone_number' => $user->phone_number,
                    'address' => $user->address,
                    'meal_plan' => $user->role === 'member' ? [
                        'duration' => $user->member->meal_plan_duration,
                        'start_date' => $user->member->created_at->format('Y-m-d'),
                    ] : null,
                    'member' => $user->role === 'member' ? [
                        'care_giver_name' => $user->member->care_giver_name,
                        'care_giver_relationship' => $user->member->care_giver_relationship,
                        'medical_condition' => $user->member->medical_condition,
                        'medical_card_id' => $user->member->medical_card_id,
                        'pending_extension' => $user->member->pending_extension,
                        'extension_reason' => $user->member->extension_reason,
                        'last_extension_date' => $user->member->last_extension_date,
                    ] : null,
                    'volunteer' => $user->role === 'volunteer' ? [
                        'is_vaccinated' => $user->volunteer->is_vaccinated,
                        'volunteer_duration' => $user->volunteer->volunteer_duration,
                        'available_days' => $user->volunteer->available_days,
                    ] : null,
                    'partner' => $user->role === 'partner' ? [
                        'restaurant_name' => $user->partner->restaurant_name,
                        'partnership_duration' => $user->partner->partnership_duration,
                        'menus' => $user->partner->menus,
                    ] : null,
                ] : null,
                'partnerInfo' => $user && $user->role === 'partner'
                    ? [
                        'restaurantName' => $user->partner->restaurant_name,
                    ]
                    : null,
            ],
            'menus' => function () use ($request, $user) {
                if ($user && $user->role === 'partner') {
                    return $request->session()->get('menus') ??
                        Menu::where('partner_id', $user->partner->id)->get();
                } elseif ($user && $user->role === 'member') {
                    $menus = Menu::with(['partner.user' => function ($query) {
                        $query->select('id', 'geolocation');
                    }])->get();

                    return $menus->map(function ($menu) {
                        $menu->partner_geolocation = $menu->partner->user->geolocation;
                        $menu->restaurant_name = $menu->partner->restaurant_name;
                        unset($menu->partner->user);
                        return $menu;
                    });
                }
                return [];
            },
            'canAccess' => [
                'partnerDashboard' => $user && $user->role === 'partner',
                'memberDashboard' => $user && $user->role === 'member',
                'volunteerDashboard' => $user && $user->role === 'volunteer',
                'adminDashboard' => $user && $user->role === 'admin',
            ],
            'pendingExtensions' => function () use ($user) {
                if ($user && $user->role === 'admin') {
                    return Member::with('user')
                        ->where('pending_extension', true)
                        ->get();
                }
                return [];
            },
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'orders' => function () use ($user) {
                if ($user) {
                    return Order::with('menu')
                        ->where('user_id', $user->id)
                        ->get()
                        ->map(function ($order) {
                            return [
                                'id' => $order->id,
                                'menu' => [
                                    'name' => $order->menu->name,
                                ],
                                'status' => $order->status,
                                'created_at' => $order->created_at,
                            ];
                        });
                }
                return [];
            },
        ];
    }
}
