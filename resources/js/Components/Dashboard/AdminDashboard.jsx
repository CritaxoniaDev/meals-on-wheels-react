import React from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    Users,
    Utensils,
    Truck,
    ClipboardList,
    Settings,
    Clock
} from 'lucide-react';

export default function AdminDashboard() {
    const { pendingExtensions = [] } = usePage().props;

    const approveExtension = (memberId) => {
        router.post(route('admin.approve-extension', memberId));
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    title="User Management"
                    icon={<Users className="h-6 w-6" />}
                    description="Manage users, roles, and permissions"
                />
                <DashboardCard
                    title="Meal Planning"
                    icon={<Utensils className="h-6 w-6" />}
                    description="Plan and organize meals for delivery"
                />
                <DashboardCard
                    title="Delivery Routes"
                    icon={<Truck className="h-6 w-6" />}
                    description="Optimize and manage delivery routes"
                />
                <DashboardCard
                    title="Reports"
                    icon={<ClipboardList className="h-6 w-6" />}
                    description="Generate and view system reports"
                />
                <DashboardCard
                    title="System Settings"
                    icon={<Settings className="h-6 w-6" />}
                    description="Configure system-wide settings"
                />
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center">
                        <Clock className="mr-2 h-6 w-6" />
                        Pending Meal Plan Extensions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {pendingExtensions.length === 0 ? (
                        <p className="text-gray-500">No pending extension requests.</p>
                    ) : (
                        pendingExtensions.map((extension) => (
                            <Card key={extension.id} className="mb-4">
                                <CardContent className="p-4">
                                    <p className="font-semibold">{extension.user.name}</p>
                                    <p className="text-sm text-gray-600 mt-1">{extension.extension_reason}</p>
                                    <Button
                                        onClick={() => approveExtension(extension.id)}
                                        className="mt-2"
                                    >
                                        Approve Extension
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function DashboardCard({ title, icon, description }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground">{description}</p>
                <Button className="mt-4 w-full">Manage</Button>
            </CardContent>
        </Card>
    );
}