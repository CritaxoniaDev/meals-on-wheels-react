import React from 'react';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function OrderIndex() {
    const { orders, auth } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Your Orders</h2>}
        >
            <Head title="Your Orders" />
            <Card className="max-w-6xl mx-auto mt-10 mb-40 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Your Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of your recent orders</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Menu Name</TableHead>
                                <TableHead>Restaurant</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Ordered On</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders && orders.length > 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.menu.name}</TableCell>
                                        <TableCell>{order.menu.restaurant_name}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    order.status === 'complete' ? 'success' :
                                                        order.status === 'cancelled' ? 'destructive' :
                                                            order.status === 'pending' ? 'warning' :
                                                                'secondary'
                                                }
                                            >
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{format(new Date(order.created_at), 'PPP')}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">View Details</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No orders found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}