import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";

export default function VolunteerDashboard() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Welcome, Volunteer!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5 Meals</div>
                        <p className="text-xs text-muted-foreground">2 completed, 3 remaining</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
                        <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.5 km</div>
                        <p className="text-xs text-muted-foreground">Estimated for today</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Members Served</CardTitle>
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">50</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li className="flex justify-between items-center">
                            <span>John Doe - 123 Main St</span>
                            <Button variant="outline" size="sm">Start Navigation</Button>
                        </li>
                        <li className="flex justify-between items-center">
                            <span>Jane Smith - 456 Elm St</span>
                            <Button variant="outline" size="sm">Start Navigation</Button>
                        </li>
                        <li className="flex justify-between items-center">
                            <span>Bob Johnson - 789 Oak St</span>
                            <Button variant="outline" size="sm">Start Navigation</Button>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}