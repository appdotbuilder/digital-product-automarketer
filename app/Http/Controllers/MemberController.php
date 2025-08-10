<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMemberRequest;
use App\Models\Member;
use App\Models\Product;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controller for managing member resources.
 */
class MemberController extends Controller
{
    /**
     * The notification service instance.
     */
    protected NotificationService $notificationService;

    /**
     * Create a new controller instance.
     */
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Display a listing of members.
     */
    public function index()
    {
        $members = Member::with('referrer')->latest()->paginate(15);
        
        return Inertia::render('members/index', [
            'members' => $members
        ]);
    }

    /**
     * Show the form for creating a new member.
     */
    public function create(Request $request)
    {
        $products = Product::active()->get();
        $referrerCode = $request->query('ref');
        
        return Inertia::render('members/create', [
            'products' => $products,
            'referrer_code' => $referrerCode,
        ]);
    }

    /**
     * Store a newly created member in storage.
     */
    public function store(StoreMemberRequest $request)
    {
        $member = Member::create($request->validated());

        // Send welcome notifications
        $this->notificationService->sendWelcomeNotifications($member);

        // Notify reseller if member was referred
        if ($member->referrer_code) {
            $this->notificationService->notifyResellerOfNewReferral($member);
        }

        return redirect()->route('members.show', $member)
            ->with('success', 'Registration successful! Check your email and WhatsApp for welcome messages.');
    }

    /**
     * Display the specified member.
     */
    public function show(Member $member)
    {
        $member->load('referrer');
        
        return Inertia::render('members/show', [
            'member' => $member
        ]);
    }
}