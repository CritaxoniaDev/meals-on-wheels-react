import { useState, useRef } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Input } from "@/Components/ui/input";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function VerifyEmail({ status }) {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const { data, setData, post, processing, errors } = useForm({
        verification_code: '',
    });
    const [isAlertVisible, setIsAlertVisible] = useState(status === 'verification-link-sent');

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
        setData('verification_code', newOtpValues.join(''));

        if (value && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.verify-code'));
    };

    const resendCode = () => {
        post(route('verification.send'));
        setIsAlertVisible(true);
    };

    return (
        <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-blue-50 to-emerald-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head title="Email Verification" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-4xl font-bold text-gray-900 tracking-tight">
                    Verify your email
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Please check your inbox for verification code
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/50">
                    <CardHeader className="space-y-3">
                        <CardTitle className="text-2xl text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent font-bold">
                            Enter Verification Code
                        </CardTitle>
                        <CardDescription className="text-center text-gray-500">
                            We've sent a 6-digit verification code to your email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isAlertVisible && (
                            <Alert className="mb-6 border-0 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm">
                                <CheckCircledIcon className="h-5 w-5 text-emerald-500" />
                                <AlertTitle className="text-emerald-700 font-medium">Success</AlertTitle>
                                <AlertDescription className="text-emerald-600">
                                    A new verification code has been sent to your email.
                                </AlertDescription>
                            </Alert>
                        )}
                        
                        <form onSubmit={submit} className="space-y-8">
                            <div className="flex justify-center gap-3">
                                {otpValues.map((value, index) => (
                                    <Input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength="1"
                                        value={value}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-14 text-center text-2xl font-bold bg-white/80 border-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
                                    />
                                ))}
                            </div>
                            
                            {errors.verification_code && (
                                <p className="mt-2 text-sm text-red-500 text-center">
                                    {errors.verification_code}
                                </p>
                            )}

                            <div className="space-y-4">
                                <Button 
                                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl" 
                                    disabled={processing}
                                >
                                    Verify Email
                                </Button>

                                <div className="text-center">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={resendCode}
                                        className="text-indigo-600 hover:text-indigo-500 hover:bg-indigo-50 transition-colors duration-300"
                                        disabled={processing}
                                    >
                                        Resend Code
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-300"
                        >
                            Log Out
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
