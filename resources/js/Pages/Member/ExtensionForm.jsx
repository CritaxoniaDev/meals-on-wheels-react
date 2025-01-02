import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function ExtensionForm() {
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('member.request-extension'), { reason });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Request Meal Plan Extension</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="reason" className="block mb-2">Reason for Extension</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="4"
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit Extension Request
                </button>
            </form>
        </div>
    );
}