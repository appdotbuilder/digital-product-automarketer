import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Member {
    id: number;
    full_name: string;
    email: string;
    whatsapp_number: string;
    created_at: string;
}

interface Reseller {
    id: number;
    name: string;
    email: string;
    whatsapp_number: string;
    unique_code: string;
    status: string;
}

interface Stats {
    total_referrals: number;
    this_month: number;
    this_week: number;
}

interface Props {
    reseller: Reseller;
    referrals: {
        data: Member[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    stats: Stats;
    landing_url: string;
    [key: string]: unknown;
}

export default function ResellerDashboard({ reseller, referrals, stats, landing_url }: Props) {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <Head title={`${reseller.name} - Reseller Dashboard`} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">📱</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">DigiMarket Pro</span>
                            </div>
                            <Button asChild>
                                <Link href={route('welcome')}>← Back to Home</Link>
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome back, {reseller.name}!
                            </h1>
                            <p className="text-xl text-gray-600">
                                Track your referrals and earnings.
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">👥</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.total_referrals}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">📅</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">This Month</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.this_month}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">⚡</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">This Week</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.this_week}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Referral Tools */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    🛠️ Referral Tools
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Your Unique Code
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <code className="flex-1 bg-gray-100 px-3 py-2 rounded-lg font-mono text-lg text-center">
                                                {reseller.unique_code}
                                            </code>
                                            <Button
                                                size="sm"
                                                onClick={() => copyToClipboard(reseller.unique_code)}
                                            >
                                                📋
                                            </Button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Landing Page
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={landing_url}
                                                readOnly
                                                className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm border-0"
                                            />
                                            <Button
                                                size="sm"
                                                onClick={() => copyToClipboard(landing_url)}
                                            >
                                                📋
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Referrals */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    📊 Recent Referrals
                                </h2>

                                {referrals.data.length > 0 ? (
                                    <div className="space-y-4">
                                        {referrals.data.map((member) => (
                                            <div key={member.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-lg">👤</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">{member.full_name}</h3>
                                                    <p className="text-sm text-gray-600">{member.email}</p>
                                                </div>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">📈</div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
                                        <p className="text-gray-600">
                                            Share your referral link to start earning!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}