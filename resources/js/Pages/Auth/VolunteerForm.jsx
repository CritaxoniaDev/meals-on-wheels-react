import React from 'react';
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Checkbox } from "@/Components/ui/checkbox";

export default function VolunteerForm({ data, setData }) {
    return (
        <div className="space-y-6 mt-6">
            <div className="space-y-2">
                <Label className="text-sm font-medium">Vaccination Status</Label>
                <RadioGroup
                    value={data.is_vaccinated}
                    onValueChange={(value) => setData('is_vaccinated', value)}
                    className="flex space-x-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="vaccinated" />
                        <Label htmlFor="vaccinated">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="not_vaccinated" />
                        <Label htmlFor="not_vaccinated">No</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
                <Label htmlFor="volunteer_duration" className="text-sm font-medium">Volunteer Duration</Label>
                <Input
                    id="volunteer_duration"
                    name="volunteer_duration"
                    value={data.volunteer_duration}
                    onChange={(e) => setData('volunteer_duration', e.target.value)}
                    className="w-full"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-medium">Available Days</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                            <Checkbox
                                id={day.toLowerCase()}
                                checked={data.available_days.includes(day)}
                                onCheckedChange={(checked) => {
                                    const updatedDays = checked
                                        ? [...data.available_days, day]
                                        : data.available_days.filter((d) => d !== day);
                                    setData('available_days', updatedDays);
                                }}
                            />
                            <Label htmlFor={day.toLowerCase()} className="text-sm">{day}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

