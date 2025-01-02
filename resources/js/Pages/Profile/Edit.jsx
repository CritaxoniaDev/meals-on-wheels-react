import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import DeleteUserForm from './Partials/DeleteUserForm';
import VolunteerProfile from './Partials/VolunteerProfile';
import MemberProfile from './Partials/MemberProfile';
import PartnerProfile from './Partials/PartnerProfile';
import AdminProfile from './Partials/AdminProfile';


export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const getRoleSpecificProfile = () => {
        switch (user.role) {
            case 'volunteer':
                return <VolunteerProfile />;
            case 'member':
                return <MemberProfile />;
            case 'partner':
                return <PartnerProfile />;
            case 'admin':
                return <AdminProfile />;
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile Dashboard</h2>}
        >
            <Head title="Profile Dashboard" />

            <div className="py-12 bg-gray-100 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 h-32"></div>
                            <div className="relative flex items-center space-x-4 pt-20">
                                <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800">
                                    <AvatarImage
                                        src={user.avatar ||
                                            `https://api.dicebear.com/6.x/avataaars/svg?seed=${user.name}&gender=${user.gender === 'female' ? 'female' : 'male'}`
                                        }
                                        alt={user.name}
                                    />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center">Your Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="profile" className="w-full">
                                <TabsList className="grid w-full grid-cols-4 mb-8">
                                    <TabsTrigger value="profile">Profile</TabsTrigger>
                                    <TabsTrigger value="role-specific">Role Profile</TabsTrigger>
                                    <TabsTrigger value="security">Security</TabsTrigger>
                                    <TabsTrigger value="delete">Delete Account</TabsTrigger>
                                </TabsList>
                                <TabsContent value="profile">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl mx-auto"
                                    />
                                </TabsContent>
                                <TabsContent value="role-specific">
                                    <div className="max-w-xl mx-auto">
                                        {getRoleSpecificProfile()}
                                    </div>
                                </TabsContent>
                                <TabsContent value="security">
                                    <Card className="max-w-xl mx-auto">
                                        <CardContent>
                                            {/* Add security settings component here */}
                                            <p className="text-center text-gray-500 dark:text-gray-400">Security settings coming soon...</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="delete">
                                    <DeleteUserForm className="max-w-xl mx-auto" />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}