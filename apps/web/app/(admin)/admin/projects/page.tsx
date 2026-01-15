"use client";

import { SAMPLE_PROJECTS, Project } from "@/lib/sample-projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, CheckCircle, Clock } from "lucide-react";
import Image from "next/image";

export default function AdminProjectsPage() {
    // Determine active vs completed based on date (mock logic)
    // For this demo, let's pretend the first 3 are "Active" and the rest are "Completed"
    const activeProjects = SAMPLE_PROJECTS.slice(0, 3);
    const completedProjects = SAMPLE_PROJECTS.slice(3);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Projects</h1>
                    <p className="text-zinc-500">Oversee active construction and project history.</p>
                </div>
                <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
                    Create Project
                </Button>
            </div>

            {/* Active Projects */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <h2 className="text-lg font-semibold text-zinc-900">Active Construction</h2>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        {activeProjects.length} Active
                    </Badge>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {activeProjects.map((project) => (
                        <Card key={project.id} className="overflow-hidden group hover:border-zinc-400 transition-colors">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                    <Badge className="bg-amber-500 text-white hover:bg-amber-600">In Progress</Badge>
                                </div>
                            </div>
                            <CardContent className="p-5">
                                <h3 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-2 text-sm text-zinc-500">
                                    <MapPin className="h-4 w-4" />
                                    {project.location}
                                </div>
                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <span className="text-zinc-500">Type: <span className="text-zinc-900 font-medium capitalize">{project.type}</span></span>
                                    <Button variant="outline" size="sm">Manage</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Completed Projects */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h2 className="text-lg font-semibold text-zinc-900">Completed Projects</h2>
                </div>
                <div className="bg-white rounded-lg border shadow-sm">
                    <div className="p-4 border-b flex justify-between items-center bg-zinc-50/50">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                            <Input placeholder="Filter projects..." className="pl-9 h-9 bg-white" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Project Name</th>
                                    <th className="px-6 py-3">Location</th>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Completion Date</th>
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedProjects.map((project) => (
                                    <tr key={project.id} className="bg-white border-b hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-zinc-900">
                                            {project.title}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600">
                                            {project.location}
                                        </td>
                                        <td className="px-6 py-4 capitalize text-zinc-600">
                                            {project.type}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600">
                                            {project.completedDate}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-900">
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
