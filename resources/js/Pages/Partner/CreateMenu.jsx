import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import '/css/app.css';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { PlusCircle, Utensils, Image as ImageIcon } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function CreateMenu({ auth, partnerId }) {
    const [showSafetyDialog, setShowSafetyDialog] = useState(false);
    const [safetyChecked, setSafetyChecked] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        image: null,
        partner_id: partnerId,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!safetyChecked) {
            setShowSafetyDialog(true);
            return;
        }
        submitForm();
    };

    const submitForm = () => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.image);
        formData.append('partner_id', data.partner_id);

        post(route('partner.store-menu'), formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Menu Item</h2>}
        >
            <Head title="Create Menu Item" />

            <div className="py-12 bg-gradient-to-br from-blue-100 to-green-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col justify-center">
                            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardHeader>
                                    <h3 className="text-3xl font-bold text-center text-gray-800">Create Your Culinary Masterpiece</h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 text-center mb-6">Bring your delicious creations to life with our easy-to-use menu item creator.</p>
                                    <div className="flex justify-center space-x-4 mb-6">
                                        <div className="text-center">
                                            <Utensils className="h-12 w-12 text-green-500 mx-auto" />
                                            <p className="mt-2 text-sm font-medium">Craft Your Dish</p>
                                        </div>
                                        <div className="text-center">
                                            <ImageIcon className="h-12 w-12 text-blue-500 mx-auto" />
                                            <p className="mt-2 text-sm font-medium">Add Mouthwatering Images</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardHeader>
                                    <h3 className="text-2xl font-bold text-center text-gray-800">Menu Item Details</h3>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-lg font-medium">Dish Name</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="w-full"
                                                    placeholder="e.g., Spicy Thai Curry"
                                                />
                                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="description" className="text-lg font-medium">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    className="w-full h-32"
                                                    placeholder="Describe the flavors, ingredients, and experience of your dish"
                                                />
                                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="image" className="text-lg font-medium">Dish Image</Label>
                                                <Input
                                                    id="image"
                                                    type="file"
                                                    onChange={(e) => setData('image', e.target.files[0])}
                                                    className="w-full"
                                                />
                                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button onClick={handleSubmit} disabled={processing} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition hover:scale-105">
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add to Menu
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={showSafetyDialog} onOpenChange={setShowSafetyDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Food Safety Standards</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p>Before creating your menu item, please confirm that you have reviewed and comply with all applicable food safety standards.</p>
                        <div className="flex items-center space-x-2 mt-4">
                            <Checkbox id="safety" checked={safetyChecked} onCheckedChange={setSafetyChecked} />
                            <label htmlFor="safety" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I confirm that this menu item complies with all food safety standards
                            </label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => {
                            if (safetyChecked) {
                                setShowSafetyDialog(false);
                                submitForm();
                            }
                        }} disabled={!safetyChecked}>
                            Confirm and Create Menu Item
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}