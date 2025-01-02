import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Link } from '@inertiajs/react';
import { ArrowLeftIcon } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import '/css/app.css';

export default function EditMenu() {
    const { menu } = usePage().props;
    const [formData, setFormData] = useState({
        name: menu.name,
        description: menu.description,
        image: null
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('description', formData.description);
        if (formData.image) {
            submitData.append('image', formData.image);
        }
        submitData.append('_method', 'PUT');

        Inertia.post(route('partner.update-menu', menu.id), submitData, {
            preserveScroll: true,
            onSuccess: () => {
                setIsUpdating(false);
            },
            onError: () => {
                setIsUpdating(false);
            }
        });
    };

    return (
        <>
            <Head title={`Edit ${menu.name}`} />
            <div className="max-w-2xl mx-auto mt-10">
                <Link href={route('partner.dashboard')} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200">
                    <ArrowLeftIcon className="mr-2 h-5 w-5" />
                    Back to Dashboard
                </Link>
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Menu Item: {menu.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="image">Image</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={handleChange}
                                    />
                                </div>
                                {menu.image_path && (
                                    <div>
                                        <Label>Current Image</Label>
                                        <img src={`/storage/${menu.image_path}`} alt={menu.name} className="w-full h-32 object-cover rounded-md" />
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isUpdating}>
                                        {isUpdating ? 'Updating...' : 'Update Menu Item'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}