import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
                        <CardDescription className="text-gray-600">
                            Enter your email address and we'll send you a password reset link.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status && (
                            <Alert className="mb-4">
                                <AlertDescription className="text-sm font-medium text-green-600">
                                    {status}
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={processing}
                            >
                                Send Reset Link
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}