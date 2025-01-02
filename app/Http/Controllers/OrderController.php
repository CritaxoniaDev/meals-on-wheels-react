<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function create(Menu $menu)
    {
        $menu->load('partner.user:id,geolocation');
        $user = Auth::user()->load('member:id,user_id,medical_condition');

        return Inertia::render('Order/Confirmation', [
            'menu' => array_merge($menu->toArray(), [
                'partner_geolocation' => $menu->partner->user->geolocation,
                'restaurant_name' => $menu->partner->restaurant_name,
            ]),
            'auth' => [
                'user' => array_merge($user->toArray(), [
                    'geolocation' => $user->geolocation,
                ]),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $order = Order::create([
            'user_id' => Auth::id(),
            'menu_id' => $request->menu_id,
        ]);

        return redirect()->route('orders.index');
    }

    public function index()
{
    $orders = Order::with(['menu.partner'])
        ->where('user_id', Auth::id())
        ->get()
        ->map(function ($order) {
            return [
                'id' => $order->id,
                'menu' => [
                    'name' => $order->menu->name,
                    'restaurant_name' => $order->menu->partner->restaurant_name,
                ],
                'status' => $order->status,
                'created_at' => $order->created_at,
            ];
        });

    return Inertia::render('Order/Index', [
        'orders' => $orders
    ]);
}
}
