<?php

namespace Tests\Feature;

use App\Models\Member;
use App\Models\Reseller;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MemberRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_member_registration_page_loads(): void
    {
        $response = $this->get('/register-member');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('members/create')
        );
    }

    public function test_member_can_register_without_referrer(): void
    {
        $memberData = [
            'full_name' => 'John Doe',
            'email' => 'john@example.com',
            'whatsapp_number' => '+1234567890',
            'address' => '123 Main St, City, State 12345',
        ];

        $response = $this->post('/register-member', $memberData);

        $this->assertDatabaseHas('members', [
            'full_name' => 'John Doe',
            'email' => 'john@example.com',
            'whatsapp_number' => '+1234567890',
            'referrer_code' => null,
            'status' => 'active',
        ]);

        $member = Member::where('email', 'john@example.com')->first();
        $response->assertRedirect(route('members.show', $member));
    }

    public function test_member_can_register_with_referrer(): void
    {
        $reseller = Reseller::factory()->active()->create([
            'unique_code' => 'TEST123',
        ]);

        $memberData = [
            'full_name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'whatsapp_number' => '+1987654321',
            'address' => '456 Oak Ave, City, State 67890',
            'referrer_code' => 'TEST123',
        ];

        $response = $this->post('/register-member', $memberData);

        $this->assertDatabaseHas('members', [
            'full_name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'referrer_code' => 'TEST123',
            'status' => 'active',
        ]);

        $member = Member::where('email', 'jane@example.com')->first();
        $response->assertRedirect(route('members.show', $member));
    }

    public function test_member_registration_requires_all_fields(): void
    {
        $response = $this->post('/register-member', []);

        $response->assertSessionHasErrors([
            'full_name',
            'email',
            'whatsapp_number',
            'address',
        ]);
    }

    public function test_member_registration_requires_unique_email(): void
    {
        Member::factory()->create(['email' => 'existing@example.com']);

        $memberData = [
            'full_name' => 'Test User',
            'email' => 'existing@example.com',
            'whatsapp_number' => '+1234567890',
            'address' => '123 Test St',
        ];

        $response = $this->post('/register-member', $memberData);

        $response->assertSessionHasErrors(['email']);
    }

    public function test_member_registration_validates_referrer_code(): void
    {
        $memberData = [
            'full_name' => 'Test User',
            'email' => 'test@example.com',
            'whatsapp_number' => '+1234567890',
            'address' => '123 Test St',
            'referrer_code' => 'INVALID',
        ];

        $response = $this->post('/register-member', $memberData);

        $response->assertSessionHasErrors(['referrer_code']);
    }

    public function test_member_show_page_displays_member_info(): void
    {
        $member = Member::factory()->active()->create([
            'full_name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $response = $this->get(route('members.show', $member));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('members/show')
                ->has('member')
                ->where('member.full_name', 'Test User')
                ->where('member.email', 'test@example.com')
        );
    }

    public function test_member_registration_with_referrer_from_query_param(): void
    {
        $reseller = Reseller::factory()->active()->create([
            'unique_code' => 'QUERY123',
        ]);

        $response = $this->get('/register-member?ref=QUERY123');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('members/create')
                ->where('referrer_code', 'QUERY123')
        );
    }
}