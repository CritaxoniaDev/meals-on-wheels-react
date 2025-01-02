import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import '/css/app.css';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { UtensilsIcon, MapPinIcon, ArrowLeftIcon, ClockIcon } from "lucide-react";

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export default function Show() {
    const { menu, auth } = usePage().props;
    const [memberLat, memberLon] = auth.user.geolocation.split(',').map(Number);
    const [partnerLat, partnerLon] = menu.partner_geolocation.split(',').map(Number);

    const distance = calculateDistance(memberLat, memberLon, partnerLat, partnerLon);
    const isHotMeal = distance <= 10;
    const mealType = isHotMeal ? "Hot Meal" : "Frozen Meal";
    const mealTypeColor = isHotMeal ? 'bg-red-500' : 'bg-blue-500';

    return (
        <>
            <Head title={`${menu.name} - Menu Details`} />
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
                <Link href={route('dashboard')} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200">
                    <ArrowLeftIcon className="mr-2 h-5 w-5" />
                    Back to Dashboard
                </Link>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-4xl mx-auto">
                    <div className="relative h-64 sm:h-80">
                        <img src={`/storage/${menu.image_path}`} alt={menu.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <CardTitle className="text-3xl sm:text-4xl font-bold text-white p-6">{menu.name}</CardTitle>
                        </div>
                        <div className={`absolute top-0 right-0 ${mealTypeColor} text-white px-4 py-2 rounded-bl-lg font-semibold text-sm`}>
                            {mealType}
                        </div>
                    </div>

                    <CardContent className="p-6">
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">{menu.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center bg-blue-50 p-3 rounded-lg shadow-sm">
                                <UtensilsIcon className="mr-3 h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="text-xs text-gray-500 mt-1">Meal Type</p>
                                    <p className="font-semibold text-gray-800">{mealType}</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-green-50 p-3 rounded-lg shadow-sm">
                                <MapPinIcon className="mr-3 h-5 w-5 text-green-600" />
                                <div>
                                    <p className="text-xs text-gray-500">Partner Restaurant</p>
                                    <p className="font-semibold text-gray-800">{menu.restaurant_name}</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-purple-50 p-3 rounded-lg shadow-sm">
                                <ClockIcon className="mr-3 h-5 w-5 text-purple-600" />
                                <div>
                                    <p className="text-xs text-gray-500">Distance</p>
                                    <p className="font-semibold text-gray-800">{distance.toFixed(1)} km away</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                            onClick={() => window.location.href = route('order.create', menu.id)}
                        >
                            Order Now
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}