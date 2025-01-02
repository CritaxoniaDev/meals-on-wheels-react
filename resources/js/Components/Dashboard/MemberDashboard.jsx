import React, { useState, useEffect, useMemo } from 'react';
import { format, differenceInDays, startOfDay } from 'date-fns';
import { usePage, Link } from '@inertiajs/react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { CalendarIcon, ClockIcon, UtensilsIcon, MapPinIcon } from "lucide-react";

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

const getTodayDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export default function MemberDashboard() {
    const { auth, menus } = usePage().props;
    const [memberLat, memberLon] = auth.user.geolocation.split(',').map(Number);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mealPlan, setMealPlan] = useState(auth.user.meal_plan);

    const todaysSpecial = useMemo(() => {
        const today = startOfDay(new Date()).getTime();
        const randomIndex = Math.floor(Math.abs(Math.sin(today)) * menus.length);
        return menus[randomIndex];
    }, [menus]);

    useEffect(() => {
        const updateMealPlanDuration = async () => {
            const today = getTodayDate();
            const lastUpdateDate = localStorage.getItem('lastMealPlanUpdate');

            if (today !== lastUpdateDate && mealPlan.duration > 0) {
                const newDuration = mealPlan.duration - 1;
                try {
                    await axios.put(route('member.update-meal-plan-status'), { daysLeft: newDuration });
                    setMealPlan(prevPlan => ({ ...prevPlan, duration: newDuration }));
                    localStorage.setItem('lastMealPlanUpdate', today);
                } catch (error) {
                    console.error('Error updating meal plan duration:', error);
                }
            }
        };

        updateMealPlanDuration();
        const timer = setInterval(updateMealPlanDuration, 24 * 60 * 60 * 1000);

        return () => clearInterval(timer);
    }, [mealPlan.duration]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getMealType = (partnerGeolocation) => {
        const [partnerLat, partnerLon] = partnerGeolocation.split(',').map(Number);
        const distance = calculateDistance(memberLat, memberLon, partnerLat, partnerLon);
        return distance <= 10 ? "Hot Meal" : "Frozen Meal";
    };

    return (
        <div className="space-y-8 p-8 bg-gradient-to-br from-blue-50 to-green-50">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Welcome, {auth.user.name}!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Today's Date", icon: CalendarIcon, content: format(new Date(), 'EEEE, h:mm a'), subContent: `Today's Special: ${todaysSpecial ? todaysSpecial.name : 'Check back later'}`, color: 'bg-blue-500' },
                    { title: 'Meal Plan Status', icon: ClockIcon, content: `${mealPlan.duration} Days Left`, subContent: `Out of 30 days plan`, color: mealPlan.duration <= 10 ? 'bg-red-500' : 'bg-green-500' },
                    { title: 'Dietary Preferences', icon: UtensilsIcon, content: 'Low Sodium', subContent: 'Click to update', color: 'bg-purple-500' }
                ].map((item, index) => (
                    <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className={`${item.color} h-2`}></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-semibold text-gray-700">{item.title}</CardTitle>
                            <item.icon className="h-6 w-6 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-800">{item.content}</div>
                            <p className="text-sm text-gray-500 mt-2">{item.subContent}</p>
                            {item.title === 'Meal Plan Status' && mealPlan.duration <= 10 && (
                                <>
                                    <p className="text-sm text-red-500 mt-2 font-bold">Your meal plan is ending soon!</p>
                                    <Link href={route('member.extend-form')}>
                                        <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white">
                                            Request Extension
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">Delicious Meals Available</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menus.map((menu) => {
                            const [partnerLat, partnerLon] = menu.partner_geolocation.split(',').map(Number);
                            const distance = calculateDistance(memberLat, memberLon, partnerLat, partnerLon);
                            const isHotMeal = distance <= 10;
                            const mealTypeColor = isHotMeal ? 'bg-red-500' : 'bg-blue-500';

                            return (
                                <Card key={menu.id} className="overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="relative">
                                        <img src={`/storage/${menu.image_path}`} alt={menu.name} className="w-full h-64 object-cover" />
                                        <div className={`absolute top-0 right-0 ${mealTypeColor} text-white px-4 py-2 rounded-bl-lg font-semibold text-sm`}>
                                            {isHotMeal ? 'Hot Meal' : 'Frozen Meal'}
                                        </div>
                                    </div>
                                    <CardContent className="p-6 flex-grow">
                                        <h3 className="font-bold text-2xl mb-3 text-gray-800">{menu.name}</h3>
                                        <p className="text-sm text-gray-600 mb-4">{menu.description}</p>
                                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                            <span className="flex items-center">
                                                <UtensilsIcon className="mr-2 h-5 w-5" />
                                                {menu.category}
                                            </span>
                                            <span className="flex items-center">
                                                <MapPinIcon className="mr-2 h-5 w-5" />
                                                {distance.toFixed(1)} km away
                                            </span>
                                        </div>
                                    </CardContent>
                                    <div className="p-6 bg-gray-50">
                                        <Button
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                                            onClick={() => window.location.href = route('order.create', menu.id)}
                                        >
                                            Order Now
                                        </Button>
                                        <Link href={route('menu.show', menu.id)} className="mt-4 inline-block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                                            View Details
                                        </Link>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}