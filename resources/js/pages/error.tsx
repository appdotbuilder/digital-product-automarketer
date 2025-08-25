import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    status: number;
    message?: string;
    [key: string]: unknown;
}

export default function Error({ status, message }: Props) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status] || `${status}: Error`;

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || 'An error occurred.';

    return (
        <>
            <Head title={title} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="text-6xl mb-6">
                        {status === 404 ? '🔍' : status === 500 ? '⚠️' : '🚫'}
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {title}
                    </h1>
                    
                    <p className="text-gray-600 mb-8">
                        {message || description}
                    </p>
                    
                    <div className="space-y-4">
                        <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                            <Link href={route('welcome')}>
                                🏠 Go Home
                            </Link>
                        </Button>
                        
                        {status === 500 && (
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/debug">
                                    🔧 Check System Status
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}