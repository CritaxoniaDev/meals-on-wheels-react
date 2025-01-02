import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const Confirmation = ({ user, roleData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registration Confirmation</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thank you for registering, <span className="font-medium text-indigo-600">{user.name}</span>!
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{user.role}</dd>
            </div>
          </div>

          {user.role === 'member' && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
              <dt className="text-sm font-medium text-gray-500 col-span-3 mb-2">Member Details</dt>
              <dt className="text-xs font-medium text-gray-500">Care Giver</dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">{roleData.care_giver_name}</dd>
              <dt className="text-xs font-medium text-gray-500">Medical Condition</dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">{roleData.medical_condition}</dd>
              <dt className="text-xs font-medium text-gray-500">Meal Plan Duration</dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">{roleData.meal_plan_duration} days</dd>
            </div>
          )}

          {user.role === 'volunteer' && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
              <dt className="text-sm font-medium text-gray-500 col-span-3 mb-2">Volunteer Details</dt>
              <dt className="text-xs font-medium text-gray-500">Vaccinated</dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">{roleData.is_vaccinated ? 'Yes' : 'No'}</dd>
              <dt className="text-xs font-medium text-gray-500">Duration</dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">{roleData.volunteer_duration}</dd>
              <dt className="text-xs font-medium text-gray-500">Available Days</dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">{JSON.parse(roleData.available_days).join(', ')}</dd>
            </div>
          )}

          {user.role === 'partner' && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
              <dt className="text-sm font-medium text-gray-500 col-span-3 mb-2">Partner Details</dt>
              <dt className="text-xs font-medium text-gray-500">Restaurant Name</dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">{roleData.restaurant_name}</dd>
              <dt className="text-xs font-medium text-gray-500">Partnership Duration</dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">{roleData.partnership_duration}</dd>
            </div>
          )}
        </div>

        <div>
          <Link
            href="/login"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Proceed to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;