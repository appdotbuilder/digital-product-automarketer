import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthDigiMarketLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Branding/Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900"></div>
                
                {/* Curved Lines Overlay */}
                <div className="absolute inset-0">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none">
                        {/* Curved gradient paths */}
                        <path 
                            d="M0 200 C100 150, 200 250, 300 200 C350 175, 400 225, 400 200 L400 0 L0 0 Z" 
                            fill="url(#gradient1)" 
                            opacity="0.3"
                        />
                        <path 
                            d="M0 400 C150 300, 250 450, 400 350 L400 250 C350 275, 250 225, 150 275 C100 300, 50 250, 0 300 Z" 
                            fill="url(#gradient2)" 
                            opacity="0.2"
                        />
                        <path 
                            d="M0 600 C100 550, 200 650, 300 600 C350 575, 400 625, 400 600 L400 500 C300 525, 200 475, 100 525 C50 550, 25 500, 0 525 Z" 
                            fill="url(#gradient3)" 
                            opacity="0.4"
                        />
                        
                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="1"/>
                                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8"/>
                            </linearGradient>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity="1"/>
                                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6"/>
                            </linearGradient>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#93c5fd" stopOpacity="1"/>
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
                    {/* Logo */}
                    <div className="mb-8 flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" viewBox="0 0 40 42" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M17.2 5.63325L8.6 0.855469L0 5.63325V32.1434L16.2 41.1434L32.4 32.1434V23.699L40 19.4767V9.85547L31.4 5.07769L22.8 9.85547V18.2999L17.2 21.411V5.63325ZM38 18.2999L32.4 21.411V15.2545L38 12.1434V18.2999ZM36.9409 10.4439L31.4 13.5221L25.8591 10.4439L31.4 7.36561L36.9409 10.4439ZM24.8 18.2999V12.1434L30.4 15.2545V21.411L24.8 18.2999ZM23.8 20.0323L29.3409 23.1105L16.2 30.411L10.6591 27.3328L23.8 20.0323ZM7.6 27.9212L15.2 32.1434V38.2999L2 30.9666V7.92116L7.6 11.0323V27.9212ZM8.6 9.29991L3.05913 6.22165L8.6 3.14339L14.1409 6.22165L8.6 9.29991ZM30.4 24.8101L17.2 32.1434V38.2999L30.4 30.9666V24.8101ZM9.6 11.0323L15.2 7.92117V22.5221L9.6 25.6333V11.0323Z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold">DigiMarket Pro</h1>
                    </div>

                    {/* Tagline */}
                    <div className="text-center max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Welcome to the Future of Digital Commerce</h2>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            Streamline your digital marketplace operations with our comprehensive management platform. 
                            Built for resellers, designed for success.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="mt-12 grid grid-cols-1 gap-4 text-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                            <span className="text-blue-100">Advanced Analytics & Reporting</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                            <span className="text-blue-100">Automated Member Management</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                            <span className="text-blue-100">Comprehensive Product Catalog</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href={route('home')} className="inline-flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" viewBox="0 0 40 42" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M17.2 5.63325L8.6 0.855469L0 5.63325V32.1434L16.2 41.1434L32.4 32.1434V23.699L40 19.4767V9.85547L31.4 5.07769L22.8 9.85547V18.2999L17.2 21.411V5.63325ZM38 18.2999L32.4 21.411V15.2545L38 12.1434V18.2999ZM36.9409 10.4439L31.4 13.5221L25.8591 10.4439L31.4 7.36561L36.9409 10.4439ZM24.8 18.2999V12.1434L30.4 15.2545V21.411L24.8 18.2999ZM23.8 20.0323L29.3409 23.1105L16.2 30.411L10.6591 27.3328L23.8 20.0323ZM7.6 27.9212L15.2 32.1434V38.2999L2 30.9666V7.92116L7.6 11.0323V27.9212ZM8.6 9.29991L3.05913 6.22165L8.6 3.14339L14.1409 6.22165L8.6 9.29991ZM30.4 24.8101L17.2 32.1434V38.2999L30.4 30.9666V24.8101ZM9.6 11.0323L15.2 7.92117V22.5221L9.6 25.6333V11.0323Z"
                                    />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                DigiMarket Pro
                            </span>
                        </Link>
                    </div>

                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                        <p className="text-gray-600 text-lg">{description}</p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}