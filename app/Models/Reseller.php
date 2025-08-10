<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Reseller
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $whatsapp_number
 * @property string $unique_code
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Member> $referrals
 * @property-read int|null $referrals_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller query()
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller whereUniqueCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller whereWhatsappNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reseller active()
 * @method static \Database\Factories\ResellerFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Reseller extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'whatsapp_number',
        'unique_code',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the members referred by this reseller.
     */
    public function referrals(): HasMany
    {
        return $this->hasMany(Member::class, 'referrer_code', 'unique_code');
    }

    /**
     * Scope a query to only include active resellers.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}