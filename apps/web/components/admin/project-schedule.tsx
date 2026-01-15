import { Project, ProjectPhase } from "@/lib/admin/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectScheduleProps {
    project: Project;
}

export function ProjectSchedule({ project }: ProjectScheduleProps) {
    const [phases, setPhases] = useState<ProjectPhase[]>(project.phases);
    const [editingPhase, setEditingPhase] = useState<ProjectPhase | null>(null);
    const [open, setOpen] = useState(false);

    // Editing State
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [status, setStatus] = useState<ProjectPhase["status"]>("not-started");

    const getStatusColor = (status: ProjectPhase["status"]) => {
        switch (status) {
            case "completed": return "bg-green-100 text-green-700 hover:bg-green-100";
            case "in-progress": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
            default: return "bg-zinc-100 text-zinc-700 hover:bg-zinc-100";
        }
    };

    const handleEditClick = (phase: ProjectPhase) => {
        setEditingPhase(phase);
        setStartDate(new Date(phase.startDate));
        setEndDate(new Date(phase.endDate));
        setStatus(phase.status);
        setOpen(true);
    };

    const handleSave = () => {
        if (!editingPhase || !startDate || !endDate) return;

        const updatedPhase: ProjectPhase = {
            ...editingPhase,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            status: status
        };

        setPhases(phases.map(p => p.id === editingPhase.id ? updatedPhase : p));
        setOpen(false);
        setEditingPhase(null);
    };

    return (
        <Card className="col-span-1 md:col-span-3 lg:col-span-4">
            <CardHeader>
                <CardTitle>Construction Schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {phases.map((phase) => (
                        <div key={phase.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4">
                            <div className="flex-1">
                                <h4 className="font-semibold text-zinc-900">{phase.name}</h4>
                                <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>{new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Badge className={cn("capitalize shadow-none", getStatusColor(phase.status))}>
                                    {phase.status.replace("-", " ")}
                                </Badge>

                                <Button variant="ghost" size="sm" onClick={() => handleEditClick(phase)}>Edit</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Phase: {editingPhase?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Status</Label>
                            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="not-started">Not Started</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Start Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="grid gap-2">
                                <Label>End Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
