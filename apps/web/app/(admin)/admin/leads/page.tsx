"use client";

import { useState } from "react";
import { MOCK_LEADS, Lead } from "@/lib/admin/leads";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal } from "lucide-react";

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLeads = leads.filter(lead =>
        lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.projectType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "new": return "default"; // blue-ish usually
            case "contacted": return "secondary";
            case "scheduled": return "outline"; // purple?
            case "won": return "default"; // green? needs custom style
            default: return "outline";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Leads</h1>
                    <p className="text-zinc-500">Manage and track all incoming leads.</p>
                </div>
                <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
                    Add Legacy Lead
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search leads..."
                        className="pl-9 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            {/* Leads Table Card */}
            <Card>
                <CardHeader>
                    <CardTitle>All Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Project Type</th>
                                    <th className="px-6 py-3">Budget</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Created</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="bg-white border-b hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-zinc-900">
                                            <div>{lead.customerName}</div>
                                            <div className="text-xs text-zinc-500">{lead.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600">
                                            {lead.projectType}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600">
                                            ${lead.estBudget.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={getStatusVariant(lead.status) as any}>
                                                {lead.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredLeads.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                                            No leads found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
