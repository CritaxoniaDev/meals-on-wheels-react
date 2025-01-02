import { useState } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import '/css/app.css';

export default function Authenticated({ user, header, children }) {

    return (
        <div className="min-h-screen bg-gray-100">
            <Header user={user} />

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>

            <Footer />
        </div>
    );
}