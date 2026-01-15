import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProjectLog } from "@/lib/admin/projects";

interface DailyLogDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (log: Omit<ProjectLog, "id">) => void;
}

export function DailyLogDialog({ open, onOpenChange, onSave }: DailyLogDialogProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [weather, setWeather] = useState("");
    const [hours, setHours] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = () => {
        if (!date || !weather || !hours || !notes) return;

        onSave({
            date: date.toISOString(),
            weather,
            hoursWorked: parseFloat(hours),
            notes,
            author: "Current User" // Mocked
        });

        // Reset and close
        setWeather("");
        setHours("");
        setNotes("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Daily Log Entry</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid gap-2">
                        <Label>Weather</Label>
                        <Select value={weather} onValueChange={setWeather}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select weather conditions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Sunny">Sunny</SelectItem>
                                <SelectItem value="Cloudy">Cloudy</SelectItem>
                                <SelectItem value="Rainy">Rainy</SelectItem>
                                <SelectItem value="Snowy">Snowy</SelectItem>
                                <SelectItem value="Extreme Heat">Extreme Heat</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Hours Worked (Total Crew)</Label>
                        <Input
                            type="number"
                            placeholder="e.g. 24"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Notes</Label>
                        <Textarea
                            placeholder="Describe work completed, delays, visitors..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit Log</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
