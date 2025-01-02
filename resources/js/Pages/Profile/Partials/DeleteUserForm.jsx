import { useState } from 'react';
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";

export default function DeleteUserForm({ className = '' }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, delete: destroy, processing, reset, errors } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => setIsOpen(false),
            onFinish: () => reset(),
        });
    };

    return (
        <Card className={`p-6 ${className}`}>
            <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
            <p className="text-gray-600 mb-6">
                Once your account is deleted, all of its resources and data will be permanently deleted.
            </p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={deleteUser} className="space-y-4">
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button variant="destructive" type="submit" disabled={processing}>
                                Delete Account
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
}