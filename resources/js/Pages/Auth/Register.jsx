import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import GuestLayout from '@/Layouts/GuestLayout';
import MemberForm from '@/Pages/Auth/MemberForm';
import VolunteerForm from '@/Pages/Auth/VolunteerForm';
import PartnerForm from '@/Pages/Auth/PartnerForm';
import { UserIcon, HeartIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

function RoleCard({ title, description, icon, selected, onClick }) {
    return (
        <div
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${selected ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white border border-gray-200 hover:border-blue-300'}`}
            onClick={onClick}
        >
            <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${selected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`}>
                    {icon}
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>
            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                Register as {title}
            </Button>
        </div>
    );
}

export default function Register() {
    const [roleSelected, setRoleSelected] = useState(false);
    const [role, setRole] = useState('member');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        gender: '',
        age: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        address: '',
        geolocation: '',
        role: 'member',
        care_giver_name: '',
        care_giver_relationship: '',
        medical_condition: '',
        medical_card_id: '',
        meal_plan_duration: 30,
        is_vaccinated: false,
        volunteer_duration: '',
        available_days: [],
        restaurant_name: '',
        partnership_duration: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setData('geolocation', `${position.coords.latitude},${position.coords.longitude}`);
            });
        }
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setData('role', selectedRole);
        setRoleSelected(true);
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-4">
                    <Link
                        href="/"
                        className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
                <Card className="max-w-6xl mx-auto shadow-2xl">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-xl">
                        <CardTitle className="text-3xl font-bold">Join Our Community</CardTitle>
                        <p className="text-blue-100 mt-2">Make a difference today</p>
                    </CardHeader>
                    <CardContent className="p-8">
                        {!roleSelected ? (
                            <>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Choose Your Role</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <RoleCard
                                        title="Member"
                                        description="Receive meals and support"
                                        icon={<UserIcon className="w-8 h-8" />}
                                        selected={role === 'member'}
                                        onClick={() => handleRoleSelect('member')}
                                    />
                                    <RoleCard
                                        title="Volunteer"
                                        description="Help deliver meals and care"
                                        icon={<HeartIcon className="w-8 h-8" />}
                                        selected={role === 'volunteer'}
                                        onClick={() => handleRoleSelect('volunteer')}
                                    />
                                    <RoleCard
                                        title="Partner"
                                        description="Provide meals and resources"
                                        icon={<BuildingStorefrontIcon className="w-8 h-8" />}
                                        selected={role === 'partner'}
                                        onClick={() => handleRoleSelect('partner')}
                                    />
                                </div>
                            </>
                        ) : (
                            <form onSubmit={submit} className="flex flex-col md:flex-row gap-8">
                                <div className="w-full md:w-1/2 space-y-6">
                                    <h2 className="text-2xl font-semibold text-gray-800">User Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium">Gender</Label>
                                            <RadioGroup
                                                value={data.gender}
                                                onValueChange={(value) => setData('gender', value)}
                                                className="flex space-x-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="male" id="male" />
                                                    <Label htmlFor="male">Male</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="female" id="female" />
                                                    <Label htmlFor="female">Female</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        <div>
                                            <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                name="age"
                                                value={data.age}
                                                onChange={(e) => setData('age', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={data.password}
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="password_confirmation" className="text-sm font-medium">Confirm Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password_confirmation"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="password_confirmation"
                                                    value={data.password_confirmation}
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="phone_number" className="text-sm font-medium">Phone Number</Label>
                                            <Input
                                                id="phone_number"
                                                type="tel"
                                                name="phone_number"
                                                value={data.phone_number}
                                                onChange={(e) => setData('phone_number', e.target.value)}
                                                maxLength={11}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                                            <Textarea
                                                id="address"
                                                name="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="geolocation" className="text-sm font-medium">Geolocation</Label>
                                            <div className="flex space-x-2">
                                                <Input
                                                    id="geolocation"
                                                    name="geolocation"
                                                    value={data.geolocation}
                                                    onChange={(e) => setData('geolocation', e.target.value)}
                                                    required
                                                />
                                                <Button type="button" onClick={getLocation} variant="outline">
                                                    Get Location
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 space-y-6">
                                    <h2 className="text-2xl font-semibold text-gray-800">Role Information</h2>
                                    {role === 'member' && (
                                        <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
                                            <h3 className="text-xl font-semibold text-blue-800 mb-4">Member Information</h3>
                                            <MemberForm data={data} setData={setData} />
                                        </div>
                                    )}
                                    {role === 'volunteer' && (
                                        <div className="bg-green-50 p-6 rounded-lg shadow-inner">
                                            <h3 className="text-xl font-semibold text-green-800 mb-4">Volunteer Information</h3>
                                            <VolunteerForm data={data} setData={setData} />
                                        </div>
                                    )}
                                    {role === 'partner' && (
                                        <div className="bg-yellow-50 p-6 rounded-lg shadow-inner">
                                            <h3 className="text-xl font-semibold text-yellow-800 mb-4">Partner Information</h3>
                                            <PartnerForm data={data} setData={setData} />
                                        </div>
                                    )}
                                </div>
                            </form>
                        )}
                        <div className="flex items-center justify-between pt-6">
                            <Link
                                href={route('login')}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Already registered?
                            </Link>
                            {roleSelected && (
                                <Button
                                    onClick={submit}
                                    disabled={processing}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition duration-300"
                                >
                                    Register
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
