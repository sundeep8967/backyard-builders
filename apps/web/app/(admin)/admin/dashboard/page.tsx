"use client";

import { useState } from "react";
import { MOCK_LEADS, Lead, LeadStatus, SiteConditions } from "@/lib/admin/leads";
import { LeadDetailDialog } from "@/components/admin/lead-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Phone, Mail, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DndContext, useDraggable, useDroppable, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// --- Subcomponents ---

function KanbanColumn({ id, leads, children }: { id: string, leads: Lead[], children: React.ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    // Style for visual feedback when dragging over
    const style = {
        backgroundColor: isOver ? 'rgba(0, 0, 0, 0.05)' : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex-1 space-y-3 rounded-lg bg-zinc-50 p-2 border border-zinc-200/50 transition-colors"
        >
            {children}
            {leads.length === 0 && (
                <div className="flex h-32 items-center justify-center rounded border border-dashed border-zinc-200">
                    <p className="text-xs text-zinc-400">No leads</p>
                </div>
            )}
        </div>
    );
}

function DraggableLeadCard({ lead, openDetail, openSchedule, colId, moveLead }: { lead: Lead, openDetail: any, openSchedule: any, colId: string, moveLead: any }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: lead.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Card className="cursor-move shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-xs font-normal">
                            {lead.projectType}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                    <CardTitle className="text-sm font-bold text-zinc-900 mt-2">
                        {/* Stop propagation on button so we don't drag when clicking name */}
                        <button
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => openDetail(lead)}
                            className="hover:underline hover:text-blue-600 text-left"
                        >
                            {lead.customerName}
                        </button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                        <DollarSign className="h-3 w-3" />
                        ~${lead.estBudget.toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                    </p>

                    {lead.scheduledDate && (
                        <div className="mt-2 rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                            Visit: {format(new Date(lead.scheduledDate), "MMM d, h:mm a")}
                        </div>
                    )}

                    <div className="mt-4 flex gap-2 border-t pt-3">
                        {/* Stop propagation for action buttons */}
                        <Button onPointerDown={(e) => e.stopPropagation()} size="icon" variant="ghost" className="h-6 w-6 text-zinc-400 hover:text-green-600">
                            <Phone className="h-3 w-3" />
                        </Button>
                        <Button onPointerDown={(e) => e.stopPropagation()} size="icon" variant="ghost" className="h-6 w-6 text-zinc-400 hover:text-blue-600">
                            <Mail className="h-3 w-3" />
                        </Button>

                        {/* Quick Move (Mock) */}
                        {colId === 'new' && (
                            <Button
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => moveLead(lead.id, 'contacted')}
                                size="sm"
                                variant="outline"
                                className="ml-auto h-6 text-xs"
                            >
                                Contacted -&gt;
                            </Button>
                        )}

                        {/* Schedule Action */}
                        {colId === 'contacted' && (
                            <Button
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => openSchedule(lead.id)}
                                size="sm"
                                variant="outline"
                                className="ml-auto h-6 text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
                            >
                                Schedule Visit
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


const COLUMNS: { id: LeadStatus; label: string; color: string }[] = [
    { id: "new", label: "New Leads", color: "bg-blue-500/10 text-blue-700" },
    { id: "contacted", label: "Contacted", color: "bg-yellow-500/10 text-yellow-700" },
    { id: "scheduled", label: "Site Visit", color: "bg-purple-500/10 text-purple-700" },
    { id: "proposal", label: "Proposal Sent", color: "bg-orange-500/10 text-orange-700" },
    { id: "won", label: "Won / Sold", color: "bg-green-500/10 text-green-700" },
];

export default function AdminDashboardPage() {
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

    const getLeadsByStatus = (status: LeadStatus) => {
        return leads.filter((lead) => lead.status === status);
    };

    const moveLead = (leadId: string, newStatus: LeadStatus) => {
        setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    }

    // Scheduling Logic
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [date, setDate] = useState<Date | undefined>(new Date());

    const openSchedule = (leadId: string) => {
        setSelectedLeadId(leadId);
        setScheduleOpen(true);
    };

    const confirmSchedule = () => {
        if (!selectedLeadId || !date) return;

        setLeads(leads.map(l =>
            l.id === selectedLeadId
                ? { ...l, status: "scheduled", scheduledDate: date.toISOString(), lastContact: `Scheduled for ${format(date, "MM/dd")}` }
                : l
        ));
        setScheduleOpen(false);
        setSelectedLeadId(null);
    };

    // Lead Detail / Site Conditions
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const openDetail = (lead: Lead) => {
        setSelectedLead(lead);
        setDetailOpen(true);
    };

    const handleSaveConditions = (leadId: string, conditions: SiteConditions) => {
        setLeads(leads.map(l =>
            l.id === leadId ? { ...l, siteConditions: conditions } : l
        ));
    }

    // Drag and Drop Logic
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const leadId = active.id as string;
        const newStatus = over.id as LeadStatus;

        // If dropped in same column, do nothing
        const currentLead = leads.find(l => l.id === leadId);
        if (currentLead?.status === newStatus) return;

        setLeads(leads.map(l =>
            l.id === leadId ? { ...l, status: newStatus } : l
        ));
    };

    return (
        <div className="h-full">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Advisor Dashboard</h1>
                    <p className="text-zinc-500">Manage your sales pipeline and tasks</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Export Report</Button>
                    <Button className="bg-zinc-900 text-white hover:bg-zinc-800">New Lead</Button>
                </div>
            </div>


            {/* Kanban Board */}
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <div className="flex h-[calc(100vh-180px)] overflow-x-auto pb-4 gap-6">
                    {COLUMNS.map((col) => (
                        <div key={col.id} className="w-80 flex-shrink-0 flex flex-col">
                            {/* Column Header */}
                            <div className={`mb-3 flex items-center justify-between rounded-lg px-4 py-3 ${col.color}`}>
                                <span className="font-semibold">{col.label}</span>
                                <span className="rounded-full bg-white/50 px-2 py-0.5 text-xs font-bold">
                                    {getLeadsByStatus(col.id).length}
                                </span>
                            </div>

                            {/* Drop Zone */}
                            <KanbanColumn
                                id={col.id}
                                leads={getLeadsByStatus(col.id)}
                            >
                                {getLeadsByStatus(col.id).map((lead) => (
                                    <DraggableLeadCard
                                        key={lead.id}
                                        lead={lead}
                                        openDetail={openDetail}
                                        openSchedule={openSchedule}
                                        colId={col.id}
                                        moveLead={moveLead}
                                    />
                                ))}
                            </KanbanColumn>
                        </div>
                    ))}
                </div>
            </DndContext>

            {/* Schedule Dialog */}
            <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Schedule Site Visit</DialogTitle>
                        <DialogDescription>
                            Select a date and time for the site visit with the customer.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <div className="flex justify-center">
                            <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setScheduleOpen(false)}>Cancel</Button>
                        <Button onClick={confirmSchedule} disabled={!date}>Confirm Schedule</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <LeadDetailDialog
                lead={selectedLead}
                open={detailOpen}
                onOpenChange={setDetailOpen}
                onSave={handleSaveConditions}
            />
        </div>
    );
}
