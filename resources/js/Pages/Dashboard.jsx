import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import MemberDashboard from '@/Components/Dashboard/MemberDashboard';
import VolunteerDashboard from '@/Components/Dashboard/VolunteerDashboard';
import PartnerDashboard from '@/Components/Dashboard/PartnerDashboard';
import AdminDashboard from '@/Components/Dashboard/AdminDashboard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/Components/ui/toaster";

export default function Dashboard({ auth }) {
    const { canAccess } = usePage().props;

    const getDashboardInfo = () => {
        if (canAccess.memberDashboard) return { title: "Member Dashboard", color: "bg-blue-100" };
        if (canAccess.volunteerDashboard) return { title: "Volunteer Dashboard", color: "bg-green-100" };
        if (canAccess.partnerDashboard) return { title: "Partner Dashboard", color: "bg-yellow-100" };
        if (canAccess.adminDashboard) return { title: "Admin Dashboard", color: "bg-purple-100" };
        return { title: "Dashboard", color: "bg-gray-100" };
    };

    const DashboardComponent = () => {
        if (canAccess.memberDashboard) return <MemberDashboard />;
        if (canAccess.volunteerDashboard) return <VolunteerDashboard />;
        if (canAccess.partnerDashboard) return <PartnerDashboard />;
        if (canAccess.adminDashboard) return <AdminDashboard />;
        return <div>Access Denied</div>;
    };

    const { title, color } = getDashboardInfo();

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={title} />
            <div className={`py-12 ${color}`}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <CardHeader className="bg-gray-50 border-b border-gray-200">
                            <CardTitle className="text-2xl font-bold text-gray-800">{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <DashboardComponent />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Toaster />
        </AuthenticatedLayout>
    );
}