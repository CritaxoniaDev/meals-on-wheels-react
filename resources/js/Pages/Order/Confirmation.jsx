import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { UtensilsIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Head } from '@inertiajs/react';

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

export default function OrderConfirmation() {
    const { menu, auth } = usePage().props;
    const user = auth.user;
    const [memberLat, memberLon] = auth.user.geolocation.split(',').map(Number);
    const [partnerLat, partnerLon] = menu.partner_geolocation.split(',').map(Number);

    const distance = calculateDistance(memberLat, memberLon, partnerLat, partnerLon);
    const isHotMeal = distance <= 10;
    const mealType = isHotMeal ? "Hot Meal" : "Frozen Meal";
    const mealTypeColor = isHotMeal ? 'bg-red-500' : 'bg-blue-500';

    const { post, processing } = useForm({
        menu_id: menu.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('order.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = route('orders.index');
            },
        });
    };

    return (
        <>
            <Head title={`${menu.name} - Order Confirmation`} />
            <Card className="max-w-5xl mx-auto mt-10 shadow-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-10">
                    <CardTitle className="text-5xl font-extrabold text-center tracking-tight">Order Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="flex-1">
                            <div className="relative group">
                                <img src={`/storage/${menu.image_path}`} alt={menu.name} className="w-full h-96 object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">{menu.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-8">
                            <h3 className="text-4xl font-bold text-gray-800 border-b border-gray-200 pb-4">{menu.name}</h3>
                            <p className="text-gray-600 text-xl italic leading-relaxed">{menu.description}</p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-md">
                                    <UtensilsIcon className={`${isHotMeal ? 'text-red-500' : 'text-blue-500'} w-8 h-8`} />
                                    <div>
                                        <span className="text-gray-500 text-sm">Meal Type</span>
                                        <p className="font-semibold text-lg">{mealType}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-md">
                                    <MapPinIcon className="text-green-500 w-8 h-8" />
                                    <div>
                                        <span className="text-gray-500 text-sm">Distance</span>
                                        <p className="font-semibold text-lg">{distance.toFixed(1)} km</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-md">
                                <div className="flex items-center space-x-3">
                                    <MapPinIcon className="text-blue-500 w-8 h-8" />
                                    <div>
                                        <span className="text-gray-500 text-sm">Restaurant</span>
                                        <p className="font-semibold text-lg">{menu.partner ? menu.partner.restaurant_name : 'Restaurant name not available'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-12" />

                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="flex items-center space-x-8">
                            <Avatar className="h-24 w-24 ring-4 ring-green-400 ring-offset-4">
                                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-green-400 to-blue-500 text-white">
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="text-3xl font-semibold text-gray-800">{user.name}</h4>
                                <p className="text-gray-500 text-xl">{user.email}</p>
                                {user.member && (
                                    <p className="text-gray-600 mt-2 text-lg">
                                        Medical Condition: <span className="font-medium text-blue-600">{user.member.medical_condition}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-gray-100 p-10">
                    <form onSubmit={handleSubmit} className="w-full">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-6 rounded-2xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                            Confirm Order
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </>
    );
}