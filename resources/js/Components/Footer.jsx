import React from 'react';
import { usePage } from '@inertiajs/react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    const { url } = usePage();
    const isAuthPage = url.startsWith('/login') || url.startsWith('/register') || url.startsWith('/forgot-password') || url.startsWith('/reset-password');

    return (
        <>
            {!isAuthPage && (
                <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                            <div className="space-y-8 xl:col-span-1">
                                <img className="h-10" src="/images/logo.png" alt="Meals on Wheels" />
                                <p className="text-gray-400 text-base">
                                    Delivering hope and nourishment to those in need.
                                </p>
                                <div className="flex space-x-6">
                                    <a href="#" className="text-gray-400 hover:text-white">
                                        <span className="sr-only">Facebook</span>
                                        <Facebook className="h-6 w-6" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-white">
                                        <span className="sr-only">Twitter</span>
                                        <Twitter className="h-6 w-6" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-white">
                                        <span className="sr-only">Instagram</span>
                                        <Instagram className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
                                        <ul className="mt-4 space-y-4">
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Our Mission</a></li>
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">How It Works</a></li>
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Our Team</a></li>
                                        </ul>
                                    </div>
                                    <div className="mt-12 md:mt-0">
                                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Get Involved</h3>
                                        <ul className="mt-4 space-y-4">
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Volunteer</a></li>
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Donate</a></li>
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Partner With Us</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
                                        <ul className="mt-4 space-y-4">
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">FAQs</a></li>
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Nutrition Info</a></li>
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                                        </ul>
                                    </div>
                                    <div className="mt-12 md:mt-0">
                                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
                                        <ul className="mt-4 space-y-4">
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact Us</a></li>
                                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Support</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-gray-700 pt-8">
                            <p className="text-base text-gray-400 xl:text-center">
                                &copy; {new Date().getFullYear()} Meals on Wheels. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer >
            )}
        </>
    );
};

export default Footer;