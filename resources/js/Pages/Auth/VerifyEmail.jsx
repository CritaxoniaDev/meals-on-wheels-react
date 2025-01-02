import { useState } from 'react';
import { Head, useForm, Link} from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Input } from "@/Components/ui/input";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function VerifyEmail({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        verification_code: '',
    });

    const [isAlertVisible, setIsAlertVisible] = useState(status === 'verification-link-sent');

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.verify-code'));
    };

    const resendCode = () => {
        post(route('verification.send'));
        setIsAlertVisible(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head title="Email Verification" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Verify your email
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center text-indigo-600">Enter Verification Code</CardTitle>
                        <CardDescription className="text-center">
                            We've sent a 6-digit verification code to your email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isAlertVisible && (
                            <Alert className="mb-4 bg-green-50 border-green-200">
                                <CheckCircledIcon className="h-4 w-4 text-green-600" />
                                <AlertTitle className="text-green-800">Success</AlertTitle>
                                <AlertDescription className="text-green-700">
                                    A new verification code has been sent to your email.
                                </AlertDescription>
                            </Alert>
                        )}
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <Input
                                    type="text"
                                    maxLength="6"
                                    className="text-center text-2xl tracking-widest"
                                    placeholder="000000"
                                    value={data.verification_code}
                                    onChange={e => setData('verification_code', e.target.value)}
                                />
                                {errors.verification_code && (
                                    <p className="mt-1 text-sm text-red-600">{errors.verification_code}</p>
                                )}
                            </div>

                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={processing}>
                                Verify Email
                            </Button>

                            <div className="text-center">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={resendCode}
                                    className="text-indigo-600 hover:text-indigo-500"
                                    disabled={processing}
                                >
                                    Resend Code
                                </Button>
                            </div>
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
