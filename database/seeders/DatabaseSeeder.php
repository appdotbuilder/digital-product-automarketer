<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Member;
use App\Models\Product;
use App\Models\Reseller;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create sample products
        Product::factory()->active()->software()->create([
            'name' => 'ProAnalytics Suite',
            'description' => 'Complete business analytics software with automated reporting, data visualization, and performance tracking. Perfect for entrepreneurs and small businesses.',
            'price' => 149.99,
        ]);

        Product::factory()->active()->software()->create([
            'name' => 'Marketing Automation Pro',
            'description' => 'Powerful marketing automation platform with email campaigns, lead scoring, and customer journey mapping. Boost your conversions effortlessly.',
            'price' => 199.99,
        ]);

        Product::factory()->active()->ebook()->create([
            'name' => 'Digital Marketing Mastery',
            'description' => 'Comprehensive guide to modern digital marketing strategies, including social media, content marketing, SEO, and paid advertising techniques.',
            'price' => 49.99,
        ]);

        Product::factory()->active()->ebook()->create([
            'name' => 'Passive Income Blueprint',
            'description' => 'Step-by-step guide to building multiple passive income streams online. Learn affiliate marketing, course creation, and automated business models.',
            'price' => 39.99,
        ]);

        Product::factory()->active()->software()->create([
            'name' => 'CRM Master',
            'description' => 'Complete customer relationship management solution with contact management, sales pipeline, and automated follow-ups.',
            'price' => 99.99,
        ]);

        Product::factory()->active()->ebook()->create([
            'name' => 'Social Media Success',
            'description' => 'Master social media marketing across all platforms. Includes content strategies, growth hacking techniques, and monetization methods.',
            'price' => 29.99,
        ]);

        // Create sample resellers
        $reseller1 = Reseller::factory()->active()->create([
            'name' => 'Sarah Johnson',
            'email' => 'sarah@example.com',
            'whatsapp_number' => '+1234567890',
            'unique_code' => 'SARAH123',
        ]);

        $reseller2 = Reseller::factory()->active()->create([
            'name' => 'Mike Rodriguez',
            'email' => 'mike@example.com',
            'whatsapp_number' => '+1987654321',
            'unique_code' => 'MIKE456',
        ]);

        $reseller3 = Reseller::factory()->active()->create([
            'name' => 'Emily Chen',
            'email' => 'emily@example.com',
            'whatsapp_number' => '+1122334455',
            'unique_code' => 'EMILY789',
        ]);

        // Create sample members (some with referrers)
        Member::factory()->active()->create([
            'full_name' => 'John Smith',
            'email' => 'john@example.com',
            'whatsapp_number' => '+1555123456',
            'address' => '123 Main St, New York, NY 10001',
            'referrer_code' => $reseller1->unique_code,
        ]);

        Member::factory()->active()->create([
            'full_name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'whatsapp_number' => '+1555987654',
            'address' => '456 Oak Ave, Los Angeles, CA 90210',
        ]);

        Member::factory()->active()->create([
            'full_name' => 'Robert Wilson',
            'email' => 'robert@example.com',
            'whatsapp_number' => '+1555456789',
            'address' => '789 Pine St, Chicago, IL 60601',
            'referrer_code' => $reseller2->unique_code,
        ]);

        Member::factory()->active()->create([
            'full_name' => 'Lisa Brown',
            'email' => 'lisa@example.com',
            'whatsapp_number' => '+1555321654',
            'address' => '321 Elm St, Houston, TX 77001',
            'referrer_code' => $reseller1->unique_code,
        ]);

        Member::factory()->active()->create([
            'full_name' => 'David Taylor',
            'email' => 'david@example.com',
            'whatsapp_number' => '+1555789123',
            'address' => '654 Maple Dr, Miami, FL 33101',
        ]);

        // Create additional random data
        Member::factory(15)->active()->create();
        Member::factory(3)->withReferrer($reseller1->unique_code)->create();
        Member::factory(2)->withReferrer($reseller2->unique_code)->create();
        Member::factory(2)->withReferrer($reseller3->unique_code)->create();
        
        Reseller::factory(5)->active()->create();
        Product::factory(8)->active()->create();
    }
}