"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    SAMPLE_PROJECTS,
    PROJECT_TYPES,
    Project,
    ProjectType,
} from "@/lib/sample-projects";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Check, ArrowRight } from "lucide-react";

export default function GalleryPage() {
    const [selectedType, setSelectedType] = useState<ProjectType | "all">("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects =
        selectedType === "all"
            ? SAMPLE_PROJECTS
            : SAMPLE_PROJECTS.filter((p) => p.type === selectedType);

    const getTypeLabel = (type: ProjectType) =>
        PROJECT_TYPES.find((t) => t.value === type)?.label || type;

    return (
        <main className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 lg:px-12">
                <Link href="/" className="text-xl font-bold text-white">
                    Backyard Builders
                </Link>
                <Link
                    href="/get-started"
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
                >
                    Get Started
                </Link>
            </header>

            {/* Hero */}
            <section className="px-6 py-12 text-center lg:px-12 lg:py-20">
                <h1 className="text-4xl font-bold text-white lg:text-5xl">
                    Our Work
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                    Browse our portfolio of completed outdoor living projects. Get
                    inspired and request a similar estimate for your property.
                </p>
            </section>

            {/* Filters */}
            <section className="sticky top-0 z-10 border-y border-zinc-800 bg-zinc-950/95 backdrop-blur px-6 py-4 lg:px-12">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedType("all")}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedType === "all"
                                ? "bg-white text-zinc-900"
                                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                            }`}
                    >
                        All Projects
                    </button>
                    {PROJECT_TYPES.map((type) => (
                        <button
                            key={type.value}
                            onClick={() => setSelectedType(type.value)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedType === type.value
                                    ? "bg-white text-zinc-900"
                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="px-6 py-12 lg:px-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-600 hover:shadow-xl"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                                <Badge className="absolute left-3 top-3 bg-white/90 text-zinc-900">
                                    {getTypeLabel(project.type)}
                                </Badge>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white group-hover:text-zinc-100">
                                    {project.title}
                                </h3>
                                <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                                    <MapPin className="h-4 w-4" />
                                    {project.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="py-16 text-center">
                        <p className="text-zinc-500">No projects found for this category.</p>
                    </div>
                )}
            </section>

            {/* Project Modal */}
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-900 text-white">
                    {selectedProject && (
                        <>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <DialogHeader>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-white/90 text-zinc-900">
                                        {getTypeLabel(selectedProject.type)}
                                    </Badge>
                                </div>
                                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {selectedProject.description}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                {/* Location & Date */}
                                <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {selectedProject.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Completed {selectedProject.completedDate}
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <h4 className="mb-2 text-sm font-medium text-zinc-300">
                                        Features
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                                            >
                                                <Check className="h-3 w-3 text-green-400" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <Button
                                    asChild
                                    className="w-full bg-white text-zinc-900 hover:bg-zinc-100"
                                >
                                    <Link href="/get-started">
                                        Get Similar Estimate
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </main>
    );
}
