import React, { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useToast } from "@/Components/ui/use-toast"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    ShoppingBagIcon,
    TruckIcon,
    DollarSignIcon,
    PlusIcon,
    EditIcon,
    TrashIcon
} from "lucide-react";
import { Link } from '@inertiajs/react';

export default function PartnerDashboard() {
    const { auth, menus, flash } = usePage().props;
    const [showWelcome, setShowWelcome] = useState(true);
    const [localMenus, setLocalMenus] = useState(menus);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const { toast } = useToast()

    useEffect(() => {
        if (flash.success) {
            toast({
                title: "Success",
                description: flash.success,
            })
        }
    }, [flash.success])

    useEffect(() => {
        const timer = setTimeout(() => setShowWelcome(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = (id) => {
        setMenuToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        Inertia.delete(route('partner.delete-menu', menuToDelete), {
            preserveScroll: true,
            onSuccess: () => {
                setLocalMenus(localMenus.filter(menu => menu.id !== menuToDelete));
                setIsDeleteDialogOpen(false);
                toast({
                    title: "Success",
                    description: "Menu item deleted successfully",
                });
            },
        });
    };

    return (
        <div className="space-y-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <AnimatePresence>
                {showWelcome && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-2xl"
                    >
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <h3 className="text-2xl font-bold">Welcome back, {auth.partnerInfo?.restaurantName || 'Partner'}!</h3>
                        </div>
                        <p className="mt-3 text-lg">Ready to create some delicious meals today?</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-extrabold text-gray-800">
                    {auth.partnerInfo?.restaurantName || 'Partner'} Dashboard
                </h2>
                <Link href={route('partner.create-menu')}>
                    <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                        <PlusIcon className="mr-2 h-5 w-5" /> Add New Menu Item
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Meals Provided", icon: ShoppingBagIcon, value: "1,234", subtext: "This month", color: "bg-blue-500" },
                    { title: "Deliveries Made", icon: TruckIcon, value: "98%", subtext: "On-time delivery rate", color: "bg-green-500" },
                    { title: "Revenue", icon: DollarSignIcon, value: "$15,670", subtext: "This month", color: "bg-purple-500" }
                ].map((item, index) => (
                    <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className={`${item.color} h-2`}></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-semibold text-gray-700">{item.title}</CardTitle>
                            <item.icon className="h-6 w-6 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-800">{item.value}</div>
                            <p className="text-sm text-gray-500 mt-2">{item.subtext}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">Your Menu Items</CardTitle>
                </CardHeader>
                <CardContent>
                    {localMenus && localMenus.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {localMenus.map((menu) => (
                                <Card key={menu.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                                    <img src={`/storage/${menu.image_path}`} alt={menu.name} className="w-full h-64 object-cover" />
                                    <CardContent className="p-6 flex-grow flex flex-col">
                                        <h3 className="font-bold text-2xl mb-3 text-gray-800">{menu.name}</h3>
                                        <p className="text-sm text-gray-600 mb-4 flex-grow">{menu.description}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <Link href={route('partner.edit-menu', menu.id)}>
                                                <Button variant="outline" size="sm">
                                                    <EditIcon className="mr-2 h-4 w-4" /> Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(menu.id)}
                                            >
                                                <TrashIcon className="mr-2 h-4 w-4" /> Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 text-lg">No menu items available. Start by adding a new menu item!</p>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the menu item.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}