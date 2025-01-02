import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import '/css/app.css';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const [isAlertVisible, setIsAlertVisible] = useState(status === 'verification-link-sent');

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
        setIsAlertVisible(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head title="Email Verification" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Verify your email
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Email Verification</CardTitle>
                        <CardDescription>
                            Thanks for signing up! Before getting started, please verify your email address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isAlertVisible && (
                            <Alert className="mb-4">
                                <CheckCircledIcon className="h-4 w-4" />
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>
                                    A new verification link has been sent to your email address.
                                </AlertDescription>
                            </Alert>
                        )}
                        <form onSubmit={submit}>
                            <Button className="w-full" disabled={processing}>
                                Resend Verification Email
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Log Out
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}