import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    type: 'software' | 'ebook';
}

interface Reseller {
    id: number;
    name: string;
    email: string;
    unique_code: string;
}

interface Props {
    reseller: Reseller;
    products: Product[];
    referrer_code: string;
    [key: string]: unknown;
}

export default function ResellerLanding({ reseller, products, referrer_code }: Props) {
    const registerUrl = route('members.create', { ref: referrer_code });

    return (
        <>
            <Head title={`${reseller.name}'s Digital Products Store`} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
                {/* Header with Reseller Branding */}
                <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600">
                    <div className="container mx-auto px-6 py-8">
                        <nav className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">📱</span>
                                </div>
                                <span className="text-2xl font-bold text-white">DigiMarket Pro</span>
                            </div>
                            <div className="text-white text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                                Partner Store
                            </div>
                        </nav>

                        <div className="text-center text-white">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Welcome to {reseller.name}'s Store</h1>
                            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                                Discover premium digital products with exclusive benefits through this partner link.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Special Offer Banner */}
                <section className="py-8 bg-yellow-50 border-b border-yellow-200">
                    <div className="container mx-auto px-6">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <span className="text-2xl">🎁</span>
                                <h2 className="text-xl font-bold text-yellow-800">Exclusive Partner Benefits</h2>
                                <span className="text-2xl">🎁</span>
                            </div>
                            <p className="text-yellow-700">
                                Register through this link to get priority support and exclusive updates from {reseller.name}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                🚀 Premium Digital Products
                            </h2>
                            <p className="text-xl text-gray-600">
                                Join thousands of satisfied customers who trust our automated platform for digital product delivery.
                            </p>
                        </div>

                        {/* Products Grid */}
                        {products.length > 0 && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                {products.map((product) => (
                                    <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
                                        <div className="text-4xl mb-4 text-center">
                                            {product.type === 'software' ? '💻' : '📚'}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{product.name}</h3>
                                        <p className="text-gray-600 mb-6 text-center line-clamp-3">{product.description}</p>
                                        <div className="text-center mb-6">
                                            <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                                <span>✓ Instant download</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                                <span>✓ Email & WhatsApp support</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                                <span>✓ Lifetime access</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Features Section */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {[
                                {
                                    icon: '📧',
                                    title: 'Email Automation',
                                    description: 'Get instant welcome emails and purchase confirmations'
                                },
                                {
                                    icon: '💬',
                                    title: 'WhatsApp Alerts',
                                    description: 'Receive notifications and support via WhatsApp'
                                },
                                {
                                    icon: '🔐',
                                    title: 'Secure Delivery',
                                    description: 'Protected download links and account access'
                                },
                                {
                                    icon: '🤝',
                                    title: 'Partner Support',
                                    description: `Direct support from ${reseller.name} and our team`
                                }
                            ].map((feature, index) => (
                                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-200">
                                    <div className="text-3xl mb-3">{feature.icon}</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Registration CTA */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center">
                            <div className="max-w-3xl mx-auto">
                                <div className="text-5xl mb-6">🎯</div>
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Ready to Get Started?
                                </h2>
                                <p className="text-blue-100 text-xl mb-8">
                                    Join our platform through {reseller.name}'s referral link and get access to all digital products with automated delivery.
                                </p>
                                
                                <div className="bg-white bg-opacity-10 rounded-2xl p-6 mb-8">
                                    <div className="flex items-center justify-center space-x-2 text-white mb-2">
                                        <span className="text-lg">🎁</span>
                                        <span className="font-medium">Referral Code:</span>
                                        <code className="bg-white bg-opacity-20 px-3 py-1 rounded font-mono text-lg">
                                            {referrer_code}
                                        </code>
                                    </div>
                                    <p className="text-blue-100 text-sm">
                                        This code connects you with {reseller.name} for personalized support
                                    </p>
                                </div>

                                <Button 
                                    asChild 
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-6 rounded-full font-bold shadow-lg"
                                >
                                    <Link href={registerUrl}>
                                        🚀 Register Now - Free to Join
                                    </Link>
                                </Button>
                                
                                <p className="text-blue-100 text-sm mt-4">
                                    No registration fees • Instant access • Automated notifications
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partner Info */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="text-4xl mb-4">👤</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                About Your Partner: {reseller.name}
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {reseller.name} is a trusted partner in our network, committed to helping you succeed with digital products. 
                                When you register through this link, you'll receive personalized support and updates.
                            </p>
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="grid md:grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl mb-2">📈</div>
                                        <h3 className="font-bold text-gray-900">Expert Guidance</h3>
                                        <p className="text-sm text-gray-600">Personalized recommendations</p>
                                    </div>
                                    <div>
                                        <div className="text-2xl mb-2">💬</div>
                                        <h3 className="font-bold text-gray-900">Direct Support</h3>
                                        <p className="text-sm text-gray-600">WhatsApp & email assistance</p>
                                    </div>
                                    <div>
                                        <div className="text-2xl mb-2">🎯</div>
                                        <h3 className="font-bold text-gray-900">Exclusive Updates</h3>
                                        <p className="text-sm text-gray-600">First to know about new products</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 py-8">
                    <div className="container mx-auto px-6">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">📱</span>
                                </div>
                                <span className="text-xl font-bold text-white">DigiMarket Pro</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">
                                Partner Store: {reseller.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                                © 2024 DigiMarket Pro. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}