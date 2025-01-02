import React from 'react';
import { Head } from '@inertiajs/react';
import '/css/app.css';
import MainPage from '@/Components/MainPage';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-100">
                <GuestLayout>
                <MainPage />
                </GuestLayout>
            </div>
        </>
    );
}