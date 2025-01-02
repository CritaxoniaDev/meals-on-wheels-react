<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PartnerController extends Controller
{
    public function createMenu()
    {
        $user = Auth::user();
        $partnerId = DB::table('partners')
            ->where('user_id', $user->id)
            ->value('id');

        return Inertia::render('Partner/CreateMenu', [
            'partnerId' => $partnerId,
        ]);
    }

    public function getMenuItems()
    {
        $user = Auth::user();
        $partnerId = DB::table('partners')->where('user_id', $user->id)->value('id');

        $menuItems = Menu::where('partner_id', $partnerId)->get();

        return Inertia::render('Dashboard', [
            'menus' => $menuItems
        ]);
    }

    public function storeMenu(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'partner_id' => 'required|exists:partners,id',
        ]);

        $imagePath = $request->file('image')->store('menu_images', 'public');

        $menu = Menu::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'image_path' => $imagePath, // Change 'image' to 'image_path'
            'partner_id' => $validated['partner_id'],
        ]);

        return redirect()->route('partner.dashboard')->with('success', 'Menu created successfully');
    }

    public function editMenu($id)
    {
        $menu = Menu::findOrFail($id);
        return Inertia::render('Partner/EditMenu', [
            'menu' => $menu
        ]);
    }

    public function updateMenu(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $menu->update($validated);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('menu_images', 'public');
            $menu->update(['image_path' => $imagePath]);
        }

        return redirect()->route('partner.dashboard')->with('success', 'Menu updated successfully');
    }

    public function deleteMenu($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();
        return redirect()->route('partner.dashboard')->with('success', 'Menu deleted successfully');
    }
}
