import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    type: 'software' | 'ebook';
}

interface Props {
    products: Product[];
    referrer_code?: string;
    [key: string]: unknown;
}

interface MemberFormData {
    full_name: string;
    address: string;
    whatsapp_number: string;
    email: string;
    referrer_code?: string;
    [key: string]: string | undefined;
}

export default function CreateMember({ products, referrer_code }: Props) {
    const { data, setData, post, processing, errors } = useForm<MemberFormData>({
        full_name: '',
        address: '',
        whatsapp_number: '',
        email: '',
        referrer_code: referrer_code || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('members.store'));
    };

    return (
        <>
            <Head title="Join Our Digital Products Platform" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">📱</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">DigiMarket Pro</span>
                            </div>
                            <Button 
                                asChild 
                                variant="outline"
                                className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            >
                                <a href={route('welcome')}>← Back to Home</a>
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                🎯 Join Our Digital Community
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Get instant access to premium digital products with automated delivery and support.
                            </p>
                            {referrer_code && (
                                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                                    <p className="text-green-800 font-medium">
                                        🎉 You're registering through a referral! Special benefits await.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Registration Form */}
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        📝 Registration Form
                                    </h2>
                                    <p className="text-gray-600">
                                        Fill out your details to get started. You'll receive instant notifications via email and WhatsApp.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="full_name" className="text-sm font-medium text-gray-700 mb-2 block">
                                            👤 Full Name *
                                        </Label>
                                        <Input
                                            id="full_name"
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                        {errors.full_name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                                            📧 Email Address *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="whatsapp_number" className="text-sm font-medium text-gray-700 mb-2 block">
                                            📱 WhatsApp Number *
                                        </Label>
                                        <Input
                                            id="whatsapp_number"
                                            type="tel"
                                            value={data.whatsapp_number}
                                            onChange={(e) => setData('whatsapp_number', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="+1234567890"
                                            required
                                        />
                                        {errors.whatsapp_number && (
                                            <p className="text-red-500 text-sm mt-1">{errors.whatsapp_number}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
                                            🏠 Address *
                                        </Label>
                                        <Textarea
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Your complete address"
                                            rows={3}
                                            required
                                        />
                                        {errors.address && (
                                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                        )}
                                    </div>

                                    {referrer_code && (
                                        <input type="hidden" name="referrer_code" value={referrer_code} />
                                    )}

                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg py-3 rounded-lg font-medium"
                                    >
                                        {processing ? (
                                            <>🔄 Processing...</>
                                        ) : (
                                            <>🚀 Complete Registration</>
                                        )}
                                    </Button>

                                    <p className="text-sm text-gray-500 text-center">
                                        By registering, you agree to receive automated emails and WhatsApp messages with account information and product updates.
                                    </p>
                                </form>
                            </div>

                            {/* Benefits & Products Preview */}
                            <div className="space-y-8">
                                {/* What You Get */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        ✨ What You Get After Registration
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            '📧 Instant welcome email with account details',
                                            '💬 WhatsApp confirmation and support access',
                                            '🛍️ Access to premium digital products',
                                            '📱 Automated purchase notifications',
                                            '🎯 Exclusive member-only offers',
                                            '🔐 Secure download links for all products'
                                        ].map((benefit, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Products Preview */}
                                {products.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            🛍️ Available Products
                                        </h3>
                                        <div className="space-y-4">
                                            {products.slice(0, 3).map((product) => (
                                                <div key={product.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                                    <div className="text-2xl">
                                                        {product.type === 'software' ? '💻' : '📚'}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                            {product.description}
                                                        </p>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <span className="text-lg font-bold text-blue-600">${product.price}</span>
                                                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                                                                {product.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {products.length > 3 && (
                                            <p className="text-sm text-gray-500 text-center mt-4">
                                                +{products.length - 3} more products available after registration
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Security Notice */}
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-green-600">🔒</span>
                                        <h4 className="font-medium text-green-800">Secure & Private</h4>
                                    </div>
                                    <p className="text-sm text-green-700">
                                        Your information is encrypted and secure. We never share your data with third parties.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}