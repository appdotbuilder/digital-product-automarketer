<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WelcomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_page_loads(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->has('products')
        );
    }

    public function test_welcome_page_displays_active_products(): void
    {
        // Create active products
        Product::factory()->active()->create([
            'name' => 'Active Product 1',
            'price' => 99.99,
        ]);

        Product::factory()->active()->create([
            'name' => 'Active Product 2',
            'price' => 149.99,
        ]);

        // Create inactive product (should not appear)
        Product::factory()->inactive()->create([
            'name' => 'Inactive Product',
            'price' => 199.99,
        ]);

        $response = $this->get('/');

        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->has('products', 2)
        );
        
        // Check that both products are present (order doesn't matter)
        $response->assertInertia(fn ($page) => 
            $page->where('products', fn ($products) => 
                collect($products)->pluck('name')->contains('Active Product 1') &&
                collect($products)->pluck('name')->contains('Active Product 2')
            )
        );
    }

    public function test_welcome_page_handles_referrer_code(): void
    {
        $response = $this->get('/?ref=TEST123');

        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->where('referrer_code', 'TEST123')
        );
    }

    public function test_welcome_page_without_referrer_code(): void
    {
        $response = $this->get('/');

        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->where('referrer_code', null)
        );
    }

    public function test_welcome_page_works_without_products(): void
    {
        // No products in database
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->has('products', 0)
        );
    }
}