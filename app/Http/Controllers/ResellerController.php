<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Product;
use App\Models\Reseller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resellers = Reseller::withCount('referrals')->latest()->paginate(15);
        
        return Inertia::render('resellers/index', [
            'resellers' => $resellers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('resellers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:resellers,email',
            'whatsapp_number' => 'required|string|max:20',
        ]);

        // Generate unique code
        $validated['unique_code'] = strtoupper(substr(hash('sha256', $validated['email'] . time()), 0, 8));

        $reseller = Reseller::create($validated);

        return Inertia::render('resellers/show', [
            'reseller' => $reseller,
            'referrals' => collect(),
            'stats' => [
                'total_referrals' => 0,
                'this_month' => 0,
                'this_week' => 0,
            ],
            'landing_url' => route('reseller.landing', $reseller->unique_code),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reseller $reseller)
    {
        $referrals = Member::where('referrer_code', $reseller->unique_code)
            ->latest()
            ->paginate(10);
        
        $stats = [
            'total_referrals' => $reseller->referrals()->count(),
            'this_month' => $reseller->referrals()->whereMonth('created_at', now()->month)->count(),
            'this_week' => $reseller->referrals()->where('created_at', '>=', now()->startOfWeek())->count(),
        ];
        
        return Inertia::render('resellers/show', [
            'reseller' => $reseller,
            'referrals' => $referrals,
            'stats' => $stats,
            'landing_url' => route('reseller.landing', $reseller->unique_code),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reseller $reseller)
    {
        return Inertia::render('resellers/edit', [
            'reseller' => $reseller
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reseller $reseller)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:resellers,email,' . $reseller->id,
            'whatsapp_number' => 'required|string|max:20',
        ]);

        $reseller->update($validated);

        return redirect()->route('resellers.show', $reseller)
            ->with('success', 'Reseller updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reseller $reseller)
    {
        $reseller->delete();

        return redirect()->route('resellers.index')
            ->with('success', 'Reseller deleted successfully.');
    }
}