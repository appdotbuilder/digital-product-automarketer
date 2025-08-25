import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    type: 'software' | 'ebook';
    status: string;
}

interface Props {
    products: Product[];
    referrer_code?: string;
    [key: string]: unknown;
}

export default function Welcome({ products = [], referrer_code }: Props) {
    const registerUrl = referrer_code 
        ? route('members.create', { ref: referrer_code })
        : route('members.create');

    // Ensure products is always an array
    const safeProducts = Array.isArray(products) ? products : [];

    return (
        <>
            <Head title="Digital Products Marketing Platform" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
                {/* Header */}
                <header className="relative overflow-hidden">
                    <div className="container mx-auto px-6 py-8">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">📱</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">DigiMarket Pro</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href={route('login')} className="text-blue-600 hover:text-blue-700 font-medium">
                                    Login
                                </Link>
                                <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                    <Link href={registerUrl}>Get Started</Link>
                                </Button>
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20">
                    <div className="container mx-auto px-6 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                                🚀 Automated Marketing for{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Digital Products
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                                Sell software and e-books with automated email & WhatsApp marketing. 
                                Build your reseller network and grow your digital business effortlessly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button 
                                    asChild 
                                    size="lg" 
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 rounded-full"
                                >
                                    <Link href={registerUrl}>
                                        🎯 Join Now - It's Free
                                    </Link>
                                </Button>
                                <Button 
                                    asChild 
                                    variant="outline" 
                                    size="lg"
                                    className="border-blue-300 text-blue-700 hover:bg-blue-50 text-lg px-8 py-4 rounded-full"
                                >
                                    <Link href="#features">
                                        📖 Learn More
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                ✨ Everything You Need to Succeed
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Our platform handles all the technical details so you can focus on growing your business.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: '📝',
                                    title: 'Easy Registration',
                                    description: 'Simple member registration with automated account creation and instant notifications.'
                                },
                                {
                                    icon: '📧',
                                    title: 'Auto Email Marketing',
                                    description: 'Automated welcome emails, purchase confirmations, and marketing sequences.'
                                },
                                {
                                    icon: '💬',
                                    title: 'WhatsApp Integration',
                                    description: 'Instant WhatsApp notifications for registrations, purchases, and customer support.'
                                },
                                {
                                    icon: '🤝',
                                    title: 'Reseller Network',
                                    description: 'Duplicate landing pages for affiliates with unique tracking codes and notifications.'
                                },
                                {
                                    icon: '💰',
                                    title: 'Digital Products',
                                    description: 'Sell software and e-books with instant delivery and download management.'
                                },
                                {
                                    icon: '📊',
                                    title: 'Analytics Dashboard',
                                    description: 'Track sales, referrals, and performance with detailed analytics and reports.'
                                }
                            ].map((feature, index) => (
                                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products Preview */}
                {safeProducts.length > 0 && (
                    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    🛍️ Featured Digital Products
                                </h2>
                                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                    High-quality software and e-books ready for instant download.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {safeProducts.slice(0, 6).map((product) => (
                                    <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="text-3xl mb-4">
                                            {product.type === 'software' ? '💻' : '📚'}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                {product.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20 bg-gray-900">
                    <div className="container mx-auto px-6 text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-4xl font-bold text-white mb-6">
                                🎯 Ready to Start Your Digital Business?
                            </h2>
                            <p className="text-xl text-gray-300 mb-12">
                                Join thousands of entrepreneurs who are already making money with our automated marketing platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button 
                                    asChild 
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 rounded-full"
                                >
                                    <Link href={registerUrl}>
                                        🚀 Start Free Today
                                    </Link>
                                </Button>
                                <Button 
                                    asChild 
                                    variant="outline" 
                                    size="lg"
                                    className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4 rounded-full"
                                >
                                    <Link href={route('register')}>
                                        🤝 Become a Reseller
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-black py-12">
                    <div className="container mx-auto px-6">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">📱</span>
                                </div>
                                <span className="text-xl font-bold text-white">DigiMarket Pro</span>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Automated marketing platform for digital products with reseller network support.
                            </p>
                            <div className="text-gray-500">
                                © 2024 DigiMarket Pro. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}