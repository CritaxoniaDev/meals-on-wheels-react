import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { CalendarDays, User, Stethoscope, CreditCard, Clock, AlertTriangle, Calendar } from 'lucide-react';

export default function MemberProfile() {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Member Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <User className="mr-2" /> Care Giver
                    </h3>
                    <p className="mt-2">{user.member.care_giver_name} ({user.member.care_giver_relationship})</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Stethoscope className="mr-2" /> Medical Condition
                    </h3>
                    <p className="mt-2">{user.member.medical_condition}</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <CreditCard className="mr-2" /> Medical Card ID
                    </h3>
                    <p className="mt-2">{user.member.medical_card_id}</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Clock className="mr-2" /> Meal Plan Duration
                    </h3>
                    <p className="mt-2">{user.member.meal_plan_duration} days</p>
                </div>
                <div className="col-span-2 bg-red-100 dark:bg-red-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <AlertTriangle className="mr-2" /> Extension Status
                    </h3>
                    <Badge variant={user.member.pending_extension ? "warning" : "success"} className="mt-2">
                        {user.member.pending_extension ? "Extension Pending" : "No Pending Extension"}
                    </Badge>
                    {user.member.pending_extension && (
                        <p className="mt-2">Reason: {user.member.extension_reason}</p>
                    )}
                </div>
                <div className="col-span-2 bg-indigo-100 dark:bg-indigo-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Calendar className="mr-2" /> Last Extension Date
                    </h3>
                    <p className="mt-2">{user.member.last_extension_date}</p>
                </div>
            </CardContent>
        </Card>
    );
}