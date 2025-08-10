import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Reseller {
    id: number;
    name: string;
    unique_code: string;
}

interface Member {
    id: number;
    full_name: string;
    email: string;
    whatsapp_number: string;
    address: string;
    referrer_code: string | null;
    status: string;
    created_at: string;
    referrer?: Reseller;
}

interface Props {
    member: Member;
    [key: string]: unknown;
}

export default function ShowMember({ member }: Props) {
    return (
        <>
            <Head title={`Welcome ${member.full_name}!`} />
            
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
                            <div className="flex items-center space-x-4">
                                <Button asChild variant="outline">
                                    <Link href={route('welcome')}>← Back to Home</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('login')}>Login to Dashboard</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Success Message */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                <span className="text-4xl">🎉</span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Welcome, {member.full_name}!
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Your registration was successful! You should receive welcome messages on your email and WhatsApp shortly.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Account Information */}
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <span className="text-2xl">👤</span>
                                    <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                        <span className="text-lg mt-1">📧</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Email Address</p>
                                            <p className="text-gray-900">{member.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                        <span className="text-lg mt-1">📱</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">WhatsApp Number</p>
                                            <p className="text-gray-900">{member.whatsapp_number}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                        <span className="text-lg mt-1">🏠</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Address</p>
                                            <p className="text-gray-900 whitespace-pre-line">{member.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                        <span className="text-lg mt-1">📅</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Registration Date</p>
                                            <p className="text-gray-900">
                                                {new Date(member.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {member.referrer && (
                                        <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <span className="text-lg mt-1">🤝</span>
                                            <div>
                                                <p className="text-sm font-medium text-green-700">Referred By</p>
                                                <p className="text-green-900 font-medium">{member.referrer.name}</p>
                                                <p className="text-sm text-green-600">Referral Code: {member.referrer.unique_code}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <span className="text-lg">✅</span>
                                        <div>
                                            <p className="text-sm font-medium text-blue-700">Account Status</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {member.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div className="space-y-6">
                                {/* Notifications Info */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="text-2xl">🔔</span>
                                        <h3 className="text-xl font-bold text-gray-900">Check Your Messages</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <p className="text-gray-700">📧 Welcome email sent to <strong>{member.email}</strong></p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <p className="text-gray-700">💬 WhatsApp message sent to <strong>{member.whatsapp_number}</strong></p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            <p className="text-gray-700">🔐 Account credentials and access details included</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Steps */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="text-2xl">🎯</span>
                                        <h3 className="text-xl font-bold text-gray-900">What's Next?</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <span className="text-lg">1️⃣</span>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Check Your Email & WhatsApp</h4>
                                                <p className="text-sm text-gray-600">Find your welcome messages with account details and next steps.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <span className="text-lg">2️⃣</span>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Browse Our Products</h4>
                                                <p className="text-sm text-gray-600">Explore our digital products and make your first purchase.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <span className="text-lg">3️⃣</span>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Access Your Dashboard</h4>
                                                <p className="text-sm text-gray-600">Login to manage your account and track your purchases.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <span className="text-lg">4️⃣</span>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Get Support</h4>
                                                <p className="text-sm text-gray-600">Reply to any of our messages if you need assistance.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Call to Actions */}
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-center">
                                    <h3 className="text-xl font-bold text-white mb-4">🚀 Ready to Get Started?</h3>
                                    <div className="space-y-3">
                                        <Button 
                                            asChild 
                                            className="w-full bg-white text-blue-600 hover:bg-gray-100"
                                        >
                                            <Link href={route('welcome')}>Browse Products</Link>
                                        </Button>
                                        <Button 
                                            asChild 
                                            variant="outline"
                                            className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                                        >
                                            <Link href={route('login')}>Login to Dashboard</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}