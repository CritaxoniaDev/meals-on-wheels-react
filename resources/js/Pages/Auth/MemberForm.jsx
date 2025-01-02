import React from 'react';
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

export default function MemberForm({ data, setData }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
                <Label htmlFor="care_giver_name" className="text-sm font-medium">Care Giver Name</Label>
                <Input
                    id="care_giver_name"
                    name="care_giver_name"
                    value={data.care_giver_name}
                    onChange={(e) => setData('care_giver_name', e.target.value)}
                    className="w-full"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="care_giver_relationship" className="text-sm font-medium">Care Giver Relationship</Label>
                <Input
                    id="care_giver_relationship"
                    name="care_giver_relationship"
                    value={data.care_giver_relationship}
                    onChange={(e) => setData('care_giver_relationship', e.target.value)}
                    className="w-full"
                    required
                />
            </div>
            <div className="space-y-2 md:col-span-2">
                <Label htmlFor="medical_condition" className="text-sm font-medium">Medical Condition</Label>
                <Textarea
                    id="medical_condition"
                    name="medical_condition"
                    value={data.medical_condition}
                    onChange={(e) => setData('medical_condition', e.target.value)}
                    className="w-full"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="medical_card_id" className="text-sm font-medium">Medical Card ID</Label>
                <Input
                    id="medical_card_id"
                    type="number"
                    name="medical_card_id"
                    value={data.medical_card_id}
                    onChange={(e) => setData('medical_card_id', e.target.value)}
                    className="w-full"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="meal_plan_duration" className="text-sm font-medium">Meal Plan Duration</Label>
                <Input
                    id="meal_plan_duration"
                    type="number"
                    name="meal_plan_duration"
                    value={data.meal_plan_duration}
                    className="w-full"
                    readOnly
                />
            </div>
        </div>
    );
}