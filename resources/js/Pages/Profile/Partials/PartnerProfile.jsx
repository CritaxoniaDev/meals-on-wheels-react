import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Store, Clock, Menu, PlusCircle } from 'lucide-react';

export default function PartnerProfile() {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Partner Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Store className="mr-2" /> Restaurant Name
                    </h3>
                    <p className="mt-2">{user.partner.restaurant_name}</p>
                </div>
                <div className="col-span-2 bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Clock className="mr-2" /> Partnership Duration
                    </h3>
                    <p className="mt-2">{user.partner.partnership_duration} months</p>
                </div>
                <div className="col-span-2 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center mb-2">
                        <Menu className="mr-2" /> Menus
                    </h3>
                    <ul className="list-disc pl-5 mt-2">
                        {user.partner.menus.map((menu, index) => (
                            <li key={index}>{menu.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-2 flex justify-center">
                    <Button className="bg-purple-500 hover:bg-purple-600">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Menu
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}