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

interface ProjectScheduleProps {
    project: Project;
}

export function ProjectSchedule({ project }: ProjectScheduleProps) {
    // Determine status color
    const getStatusColor = (status: ProjectPhase["status"]) => {
        switch (status) {
            case "completed": return "bg-green-100 text-green-700 hover:bg-green-100";
            case "in-progress": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
            default: return "bg-zinc-100 text-zinc-700 hover:bg-zinc-100";
        }
    };

    return (
        <Card className="col-span-1 md:col-span-3 lg:col-span-4">
            <CardHeader>
                <CardTitle>Construction Schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {project.phases.map((phase) => (
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

                                {/* Mock Edit Action */}
                                <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
