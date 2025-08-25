<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Product;
use App\Models\Reseller;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controller for public reseller pages (landing page and dashboard).
 */
class PublicResellerController extends Controller
{
    /**
     * Display reseller landing page.
     */
    public function index($code)
    {
        $reseller = Reseller::active()->where('unique_code', $code)->firstOrFail();
        $products = Product::active()->get();
        
        return Inertia::render('resellers/landing', [
            'reseller' => $reseller,
            'products' => $products,
            'referrer_code' => $code,
        ]);
    }

    /**
     * Store a new reseller registration.
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
        $validated['status'] = 'active'; // Set default status

        $reseller = Reseller::create($validated);

        return redirect()->route('reseller.show', $reseller->unique_code)
            ->with('success', 'Reseller account created successfully!');
    }

    /**
     * Show reseller dashboard by code.
     */
    public function show($code)
    {
        $reseller = Reseller::active()->where('unique_code', $code)->firstOrFail();
        $referrals = Member::where('referrer_code', $code)
            ->latest()
            ->paginate(10);
        
        $stats = [
            'total_referrals' => $reseller->referrals()->count(),
            'this_month' => $reseller->referrals()->whereMonth('created_at', now()->month)->count(),
            'this_week' => $reseller->referrals()->where('created_at', '>=', now()->startOfWeek())->count(),
        ];
        
        return Inertia::render('resellers/dashboard', [
            'reseller' => $reseller,
            'referrals' => $referrals,
            'stats' => $stats,
            'landing_url' => route('reseller.landing', $code),
        ]);
    }
}