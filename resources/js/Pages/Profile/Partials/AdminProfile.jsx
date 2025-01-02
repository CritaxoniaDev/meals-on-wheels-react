import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { usePage } from '@inertiajs/react';
import { PieChart, Users, Utensils, FileText } from 'lucide-react';

export default function AdminProfile() {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card className="p-4 bg-blue-100 dark:bg-blue-900">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-blue-600 dark:text-blue-300 mr-2" />
                            <div>
                                <h3 className="text-lg font-semibold">Total Users</h3>
                                <p className="text-2xl font-bold">{/* Add total users count */}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 bg-green-100 dark:bg-green-900">
                        <div className="flex items-center">
                            <PieChart className="h-8 w-8 text-green-600 dark:text-green-300 mr-2" />
                            <div>
                                <h3 className="text-lg font-semibold">Total Members</h3>
                                <p className="text-2xl font-bold">{/* Add total members count */}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 bg-yellow-100 dark:bg-yellow-900">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-yellow-600 dark:text-yellow-300 mr-2" />
                            <div>
                                <h3 className="text-lg font-semibold">Total Volunteers</h3>
                                <p className="text-2xl font-bold">{/* Add total volunteers count */}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 bg-purple-100 dark:bg-purple-900">
                        <div className="flex items-center">
                            <Utensils className="h-8 w-8 text-purple-600 dark:text-purple-300 mr-2" />
                            <div>
                                <h3 className="text-lg font-semibold">Total Partners</h3>
                                <p className="text-2xl font-bold">{/* Add total partners count */}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="flex justify-center space-x-4">
                    <Button className="bg-blue-500 hover:bg-blue-600">
                        <Users className="mr-2 h-4 w-4" /> Manage Users
                    </Button>
                    <Button className="bg-green-500 hover:bg-green-600">
                        <Utensils className="mr-2 h-4 w-4" /> Manage Meals
                    </Button>
                    <Button className="bg-yellow-500 hover:bg-yellow-600">
                        <FileText className="mr-2 h-4 w-4" /> View Reports
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}