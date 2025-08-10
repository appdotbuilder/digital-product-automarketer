<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Product>
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['software', 'ebook']);
        
        return [
            'name' => $type === 'software' 
                ? $this->faker->randomElement(['ProAnalytics Suite', 'Marketing Automation Pro', 'CRM Master', 'E-commerce Builder'])
                : $this->faker->randomElement(['Digital Marketing Mastery', 'Passive Income Secrets', 'Social Media Success', 'Online Business Blueprint']),
            'description' => $this->faker->paragraph(3),
            'price' => $this->faker->randomFloat(2, 29.99, 299.99),
            'type' => $type,
            'download_link' => $this->faker->url(),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the product is software.
     */
    public function software(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'software',
            'name' => $this->faker->randomElement(['ProAnalytics Suite', 'Marketing Automation Pro', 'CRM Master', 'E-commerce Builder']),
        ]);
    }

    /**
     * Indicate that the product is an ebook.
     */
    public function ebook(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'ebook',
            'name' => $this->faker->randomElement(['Digital Marketing Mastery', 'Passive Income Secrets', 'Social Media Success', 'Online Business Blueprint']),
        ]);
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the product is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}