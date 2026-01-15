"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, FileText, Download, MoreHorizontal } from "lucide-react";
import { useState } from "react";

// Mock Data
interface Estimate {
    id: string;
    customerName: string;
    projectTitle: string;
    amount: number;
    status: "draft" | "sent" | "approved" | "rejected";
    lastUpdated: string;
}

const MOCK_ESTIMATES: Estimate[] = [
    {
        id: "EST-1023",
        customerName: "Alice Johnson",
        projectTitle: "Patio & Fire Pit",
        amount: 14500,
        status: "sent",
        lastUpdated: "2024-01-16",
    },
    {
        id: "EST-1024",
        customerName: "Bob Smith",
        projectTitle: "Outdoor Kitchen",
        amount: 28000,
        status: "draft",
        lastUpdated: "2024-01-15",
    },
    {
        id: "EST-1025",
        customerName: "Carol White",
        projectTitle: "Deck Replacement",
        amount: 12000,
        status: "approved",
        lastUpdated: "2024-01-14",
    },
    {
        id: "EST-1022",
        customerName: "David Brown",
        projectTitle: "Pool Landscaping",
        amount: 45000,
        status: "sent",
        lastUpdated: "2024-01-12",
    },
    {
        id: "EST-1021",
        customerName: "Eve Davis",
        projectTitle: "Pergola Installation",
        amount: 8500,
        status: "rejected",
        lastUpdated: "2024-01-10",
    },
];

export default function AdminEstimatesPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEstimates = MOCK_ESTIMATES.filter(est =>
        est.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "sent": return "secondary"; // Blue/Gray
            case "approved": return "default"; // Green usually
            case "rejected": return "destructive";
            default: return "outline";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Estimates</h1>
                    <p className="text-zinc-500">Create, review, and send project estimates.</p>
                </div>
                <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
                    Create New Estimate
                </Button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                        <FileText className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$59,500</div>
                        <p className="text-xs text-zinc-500">2 estimates sent</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved (Monthly)</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,000</div>
                        <p className="text-xs text-zinc-500">+1 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">33%</div>
                        <p className="text-xs text-zinc-500">Based on last 30 days</p>
                    </CardContent>
                </Card>
            </div>


            {/* Estimates List */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle>Recent Estimates</CardTitle>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="Search..."
                                className="pl-9 w-[200px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Estimate ID</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Project</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Last Updated</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEstimates.map((est) => (
                                    <tr key={est.id} className="bg-white border-b hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-zinc-500">
                                            {est.id}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-zinc-900">
                                            {est.customerName}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600">
                                            {est.projectTitle}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-zinc-900">
                                            ${est.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={getStatusVariant(est.status) as any}>
                                                {est.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500">
                                            {est.lastUpdated}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" title="Download PDF">
                                                <Download className="h-4 w-4 text-zinc-400 hover:text-zinc-600" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

import { CheckCircle, TrendingUp } from "lucide-react";
