import { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "/images/login-pic.jpg",
        "/images/login-pic2.jpg",
        "/images/login-pic3.jpg",
        "/images/login-pic4.jpg"
    ];
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 lg:p-10">
                    <div className="mx-auto w-full max-w-[450px] space-y-8">
                        <div className="flex justify-between items-center">
                            <Link href="/" className="text-sm text-primary hover:underline flex items-center">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </div>
                        <div className="space-y-2 text-center">
                            <h1 className="text-4xl font-extrabold text-gray-900">Welcome Back</h1>
                            <p className="text-muted-foreground text-lg">Enter your credentials to access your account.</p>
                        </div>
                        <Card className="p-6 shadow-lg">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="name@example.com"
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-primary hover:underline"
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked)}
                                    />
                                    <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
                                </div>
                                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300" disabled={processing}>
                                    Sign In
                                </Button>
                            </form>
                        </Card>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link href={route('register')} className="text-primary hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-primary p-6 lg:p-10">
                    <div className="mx-auto grid max-w-[500px] gap-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-extrabold text-primary-foreground">Meals on Wheels</h2>
                            <p className="text-xl text-primary-foreground/90">
                                Nourishing Communities, Delivering Hope. Our platform connects volunteers, partners, and members to make a difference.
                            </p>
                        </div>
                        <div className="relative w-[500px] h-[300px] rounded-lg overflow-hidden shadow-2xl">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Illustration ${index + 1}`}
                                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
