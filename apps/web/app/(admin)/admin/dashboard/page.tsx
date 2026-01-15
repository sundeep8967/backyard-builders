"use client";

import { useState } from "react";
import { MOCK_LEADS, Lead, LeadStatus } from "@/lib/admin/leads";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Phone, Mail, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

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

                        {/* Drop Zone (Visual) */}
                        <div className="flex-1 space-y-3 rounded-lg bg-zinc-50 p-2 border border-zinc-200/50">
                            {getLeadsByStatus(col.id).map((lead) => (
                                <Card key={lead.id} className="cursor-move shadow-sm hover:shadow-md transition-shadow">
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
                                            {lead.customerName}
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

                                        <div className="mt-4 flex gap-2 border-t pt-3">
                                            <Button size="icon" variant="ghost" className="h-6 w-6 text-zinc-400 hover:text-green-600">
                                                <Phone className="h-3 w-3" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-6 w-6 text-zinc-400 hover:text-blue-600">
                                                <Mail className="h-3 w-3" />
                                            </Button>

                                            {/* Quick Move (Mock) */}
                                            {col.id === 'new' && (
                                                <Button
                                                    onClick={() => moveLead(lead.id, 'contacted')}
                                                    size="sm"
                                                    variant="outline"
                                                    className="ml-auto h-6 text-xs"
                                                >
                                                    Contacted -&gt;
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {getLeadsByStatus(col.id).length === 0 && (
                                <div className="flex h-32 items-center justify-center rounded border border-dashed border-zinc-200">
                                    <p className="text-xs text-zinc-400">No leads</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
