<?php

namespace Tests\Feature;

use App\Models\Member;
use App\Models\Product;
use App\Models\Reseller;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResellerTest extends TestCase
{
    use RefreshDatabase;

    public function test_reseller_landing_page_loads(): void
    {
        $reseller = Reseller::factory()->active()->create([
            'name' => 'Test Reseller',
            'unique_code' => 'TEST123',
        ]);

        Product::factory()->active()->create([
            'name' => 'Test Product',
            'price' => 99.99,
        ]);

        $response = $this->get('/partner/TEST123');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('resellers/landing')
                ->has('reseller')
                ->where('reseller.name', 'Test Reseller')
                ->where('reseller.unique_code', 'TEST123')
                ->has('products')
                ->where('referrer_code', 'TEST123')
        );
    }

    public function test_reseller_landing_page_404_for_invalid_code(): void
    {
        $response = $this->get('/partner/INVALID');

        $response->assertStatus(404);
    }

    public function test_reseller_landing_page_404_for_inactive_reseller(): void
    {
        Reseller::factory()->inactive()->create([
            'unique_code' => 'INACTIVE',
        ]);

        $response = $this->get('/partner/INACTIVE');

        $response->assertStatus(404);
    }

    public function test_reseller_can_be_created(): void
    {
        $resellerData = [
            'name' => 'New Reseller',
            'email' => 'newreseller@example.com',
            'whatsapp_number' => '+1234567890',
        ];

        $response = $this->post('/resellers', $resellerData);

        $this->assertDatabaseHas('resellers', [
            'name' => 'New Reseller',
            'email' => 'newreseller@example.com',
            'whatsapp_number' => '+1234567890',
            'status' => 'active',
        ]);

        $reseller = Reseller::where('email', 'newreseller@example.com')->first();
        $this->assertNotNull($reseller->unique_code);
        $this->assertEquals(8, strlen($reseller->unique_code));

        $reseller = Reseller::where('email', 'newreseller@example.com')->first();
        $response->assertRedirect(route('reseller.show', $reseller->unique_code));
    }

    public function test_reseller_dashboard_loads(): void
    {
        $reseller = Reseller::factory()->active()->create([
            'name' => 'Dashboard Test',
            'unique_code' => 'DASH123',
        ]);

        // Create some referrals
        Member::factory()->count(3)->create([
            'referrer_code' => 'DASH123',
        ]);

        $response = $this->get('/resellers/DASH123/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('resellers/dashboard')
                ->has('reseller')
                ->where('reseller.name', 'Dashboard Test')
                ->has('referrals')
                ->has('stats')
                ->where('stats.total_referrals', 3)
                ->has('landing_url')
        );
    }

    public function test_reseller_dashboard_404_for_invalid_code(): void
    {
        $response = $this->get('/resellers/INVALID/dashboard');

        $response->assertStatus(404);
    }

    public function test_reseller_dashboard_stats_calculation(): void
    {
        $reseller = Reseller::factory()->active()->create([
            'unique_code' => 'STATS123',
        ]);

        // Create referrals at specific dates to avoid timing issues
        
        // 1 old referral (different month/year)
        Member::factory()->create([
            'referrer_code' => 'STATS123',
            'created_at' => '2023-12-15 10:00:00',
        ]);

        // 2 this month but not this week (before this week started)
        Member::factory()->create([
            'referrer_code' => 'STATS123', 
            'created_at' => now()->startOfMonth()->addDays(2)->format('Y-m-d H:i:s'),
        ]);

        Member::factory()->create([
            'referrer_code' => 'STATS123',
            'created_at' => now()->startOfWeek()->subDay()->format('Y-m-d H:i:s'), // Day before this week
        ]);

        // 1 this week (and this month)
        Member::factory()->create([
            'referrer_code' => 'STATS123',
            'created_at' => now()->startOfWeek()->addDay()->format('Y-m-d H:i:s'),
        ]);

        $response = $this->get('/resellers/STATS123/dashboard');

        $response->assertInertia(fn ($page) => 
            $page->where('stats.total_referrals', 4)
                ->where('stats.this_month', 3)
                ->where('stats.this_week', 1)
        );
    }

    public function test_reseller_registration_requires_all_fields(): void
    {
        $response = $this->post('/resellers', []);

        $response->assertSessionHasErrors([
            'name',
            'email',
            'whatsapp_number',
        ]);
    }

    public function test_reseller_registration_requires_unique_email(): void
    {
        Reseller::factory()->create(['email' => 'existing@example.com']);

        $resellerData = [
            'name' => 'Test Reseller',
            'email' => 'existing@example.com',
            'whatsapp_number' => '+1234567890',
        ];

        $response = $this->post('/resellers', $resellerData);

        $response->assertSessionHasErrors(['email']);
    }
}