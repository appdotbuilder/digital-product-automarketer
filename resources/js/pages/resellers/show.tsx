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

export default function ShowReseller({ reseller, referrals, stats, landing_url }: Props) {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
        <>
            <Head title={`${reseller.name} - Reseller Dashboard`} />
            
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
                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-4">
                                    Reseller Dashboard
                                </span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button asChild variant="outline">
                                    <Link href={route('welcome')}>← Back to Home</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('login')}>Login</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Welcome Section */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                                <span className="text-3xl">👋</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome back, {reseller.name}!
                            </h1>
                            <p className="text-xl text-gray-600">
                                Track your referrals and earnings with real-time analytics.
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

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Referral Tools */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <span className="text-2xl mr-2">🛠️</span>
                                        Referral Tools
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
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                >
                                                    📋
                                                </Button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Your Landing Page
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
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    📋
                                                </Button>
                                            </div>
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="w-full mt-2"
                                            >
                                                <a href={landing_url} target="_blank" rel="noopener noreferrer">
                                                    👁️ Preview Landing Page
                                                </a>
                                            </Button>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Registration Link
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={route('members.create', { ref: reseller.unique_code })}
                                                    readOnly
                                                    className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm border-0"
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => copyToClipboard(route('members.create', { ref: reseller.unique_code }))}
                                                    className="bg-purple-600 hover:bg-purple-700"
                                                >
                                                    📋
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Info */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                        <span className="text-xl mr-2">👤</span>
                                        Account Info
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Name</p>
                                            <p className="text-gray-900">{reseller.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Email</p>
                                            <p className="text-gray-900">{reseller.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">WhatsApp</p>
                                            <p className="text-gray-900">{reseller.whatsapp_number}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Status</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Referrals */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                            <span className="text-2xl mr-2">📊</span>
                                            Recent Referrals
                                        </h2>
                                        <div className="text-sm text-gray-500">
                                            Showing {referrals.data.length} of {referrals.total} total
                                        </div>
                                    </div>

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
                                                        <p className="text-xs text-gray-500">
                                                            Registered: {new Date(member.created_at).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Active
                                                        </span>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            📱 {member.whatsapp_number}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Pagination info */}
                                            {referrals.total > referrals.per_page && (
                                                <div className="text-center pt-4">
                                                    <p className="text-sm text-gray-500">
                                                        Page {referrals.current_page} of {referrals.last_page}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="text-6xl mb-4">📈</div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
                                            <p className="text-gray-600 mb-6">
                                                Share your referral link to start earning commissions!
                                            </p>
                                            <Button
                                                onClick={() => copyToClipboard(landing_url)}
                                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                            >
                                                📋 Copy Landing Page Link
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}