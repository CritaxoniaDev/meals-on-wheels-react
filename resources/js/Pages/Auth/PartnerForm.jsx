import React from 'react';
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export default function PartnerForm({ data, setData }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
                <Label htmlFor="restaurant_name" className="text-sm font-medium">Restaurant Name</Label>
                <Input
                    id="restaurant_name"
                    name="restaurant_name"
                    value={data.restaurant_name}
                    onChange={(e) => setData('restaurant_name', e.target.value)}
                    className="w-full"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="partnership_duration" className="text-sm font-medium">Partnership Duration</Label>
                <Input
                    id="partnership_duration"
                    name="partnership_duration"
                    value={data.partnership_duration}
                    onChange={(e) => setData('partnership_duration', e.target.value)}
                    className="w-full"
                    required
                />
            </div>
        </div>
    );
}