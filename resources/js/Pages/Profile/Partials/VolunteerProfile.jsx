import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Syringe, Clock, Calendar } from 'lucide-react';

export default function VolunteerProfile() {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Volunteer Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Syringe className="mr-2" /> Vaccination Status
                    </h3>
                    <Badge variant={user.volunteer.is_vaccinated ? "success" : "destructive"} className="mt-2">
                        {user.volunteer.is_vaccinated ? "Vaccinated" : "Not Vaccinated"}
                    </Badge>
                </div>
                <div className="col-span-2 bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Clock className="mr-2" /> Volunteer Duration
                    </h3>
                    <p className="mt-2">{user.volunteer.volunteer_duration} months</p>
                </div>
                <div className="col-span-2 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Calendar className="mr-2" /> Available Days
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user.volunteer.available_days.map((day, index) => (
                            <Badge key={index} variant="outline">{day}</Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}