"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { MOCK_PROJECTS, Project, ProjectLog } from "@/lib/admin/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, MapPin, Activity } from "lucide-react";
import { ProjectSchedule } from "@/components/admin/project-schedule";
import { RecentLogs } from "@/components/admin/recent-logs";
import { DailyLogDialog } from "@/components/admin/daily-log-dialog";
import { CreateChangeOrderDialog } from "@/components/admin/create-change-order-dialog";
import { ChangeOrderList } from "@/components/admin/change-order-list";
import { CreateInvoiceDialog } from "@/components/admin/create-invoice-dialog";
import { InvoiceList } from "@/components/admin/invoice-list";
import { ProjectMessages } from "@/components/admin/project-messages";
import { ProjectNotes } from "@/components/admin/project-notes";
import { NotificationsPopover } from "@/components/admin/notifications-popover";
import { CreateRFIDialog } from "@/components/admin/create-rfi-dialog";
import { RFIList } from "@/components/admin/rfi-list";
import { ChangeOrder, Invoice, Message, Notification, ProjectNote, RFI } from "@/lib/admin/projects";

export default function ProjectDashboardPage() {
    const params = useParams();
    const projectId = params.id as string;
    const [logOpen, setLogOpen] = useState(false);
    const [changeOrderOpen, setChangeOrderOpen] = useState(false);
    const [invoiceOpen, setInvoiceOpen] = useState(false);
    const [rfiOpen, setRfiOpen] = useState(false);

    // In a real app, fetch execution would go here.
    // For now, finding in mock or creating a dummy if not found (since we are "creating" it from leads)
    const initialProject = MOCK_PROJECTS.find(p => p.id === projectId) || {
        id: projectId,
        leadId: "unknown",
        customerName: "New Project",
        address: "123 New St (Mock)",
        projectType: "Custom Project",
        status: "planning",
        startDate: new Date().toISOString(),
        budget: 0,
        completionPercentage: 0,
        phases: []
    } as Project;

    const [project, setProject] = useState<Project>(initialProject);

    const handleSaveLog = (newLogEntry: Omit<ProjectLog, "id">) => {
        const newLog: ProjectLog = {
            id: `log-${Date.now()}`,
            ...newLogEntry
        };

        setProject({
            ...project,
            logs: [...(project.logs || []), newLog]
        });
    };

    const handleSaveChangeOrder = (newCO: Omit<ChangeOrder, "id" | "date" | "status" | "createdAt">) => {
        const co: ChangeOrder = {
            id: `co-${Date.now()}`,
            ...newCO,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        setProject({
            ...project,
            changeOrders: [...(project.changeOrders || []), co]
        });
    };

    const handleSaveInvoice = (newInv: Omit<Invoice, "id" | "status" | "createdAt">) => {
        const inv: Invoice = {
            id: `inv-${Date.now()}`,
            ...newInv,
            status: "draft",
            createdAt: new Date().toISOString()
        };

        const notif: Notification = {
            id: `notif-${Date.now()}`,
            title: "Invoice Drafted",
            message: `Draft invoice '${inv.title}' created for $${inv.amount.toLocaleString()}.`,
            type: "info",
            read: false,
            timestamp: new Date().toISOString()
        };

        setProject({
            ...project,
            invoices: [...(project.invoices || []), inv],
            notifications: [...(project.notifications || []), notif]
        });
    };

    const handleSendMessage = (content: string) => {
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            content,
            sender: "You",
            isAdmin: true,
            timestamp: new Date().toISOString()
        };

        setProject({
            ...project,
            messages: [...(project.messages || []), newMessage]
        });
    };

    const handleSaveNote = (content: string, isInternal: boolean) => {
        const newNote: ProjectNote = {
            id: `note-${Date.now()}`,
            content,
            author: "You",
            timestamp: new Date().toISOString(),
            isInternal
        };

        setProject({
            ...project,
            notes: [...(project.notes || []), newNote]
        });
    };

    const handleSaveRFI = (newRfi: Omit<RFI, "id" | "status" | "createdAt">) => {
        const rfi: RFI = {
            id: `rfi-${Date.now()}`,
            ...newRfi,
            status: "open",
            createdAt: new Date().toISOString()
        };

        setProject({
            ...project,
            rfis: [...(project.rfis || []), rfi]
        });
    };

    const handleSimulateAnswerRFI = (id: string) => {
        let notif: Notification | undefined;

        const updatedRFIs = (project.rfis || []).map(r => {
            if (r.id === id) {
                if (r.status === "open") {
                    notif = {
                        id: `notif-${Date.now()}`,
                        title: "RFI Answered",
                        message: `Client answered RFI: ${r.question}`,
                        type: "success",
                        read: false,
                        timestamp: new Date().toISOString()
                    };
                    return { ...r, status: "answered", answer: "Simulated client answer: We prefer the grey pavers." };
                } else if (r.status === "answered") {
                    return { ...r, status: "closed" };
                }
            }
            return r;
        });

        // @ts-ignore
        setProject({
            ...project,
            rfis: updatedRFIs,
            notifications: notif ? [...(project.notifications || []), notif] : project.notifications
        });
    };

    const handleMarkNotificationRead = (id: string) => {
        setProject({
            ...project,
            notifications: (project.notifications || []).map(n =>
                n.id === id ? { ...n, read: true } : n
            )
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-zinc-900">{project.projectType}</h1>
                        <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                            {project.status}
                        </Badge>
                        <NotificationsPopover
                            notifications={project.notifications}
                            onMarkAsRead={handleMarkNotificationRead}
                        />
                    </div>
                    <p className="text-zinc-500 mt-1">{project.customerName} • {project.address}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Edit Details</Button>
                    <Button variant="outline" onClick={() => setInvoiceOpen(true)}>Invoicing</Button>
                    <Button variant="outline" onClick={() => setRfiOpen(true)}>+ RFI</Button>
                    <Button variant="secondary" onClick={() => setChangeOrderOpen(true)}>+ Change Order</Button>
                    <Button onClick={() => setLogOpen(true)}>Daily Log</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                <div className="space-y-6 col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Budget</CardTitle>
                                <DollarSign className="h-4 w-4 text-zinc-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${project.budget.toLocaleString()}</div>
                                <p className="text-xs text-zinc-500">Total Approved</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Start Date</CardTitle>
                                <Calendar className="h-4 w-4 text-zinc-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{new Date(project.startDate).toLocaleDateString()}</div>
                                <p className="text-xs text-zinc-500">Scheduled Start</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Progress</CardTitle>
                                <Activity className="h-4 w-4 text-zinc-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{project.completionPercentage}%</div>
                                <div className="mt-2 h-2 w-full rounded-full bg-zinc-100">
                                    <div
                                        className="h-full rounded-full bg-zinc-900 transition-all"
                                        style={{ width: `${project.completionPercentage}%` }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Project Schedule */}
                    {project.phases && project.phases.length > 0 ? (
                        <ProjectSchedule project={project} />
                    ) : (
                        <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-12 text-center text-zinc-500">
                            <p>No schedule phases defined.</p>
                            <Button variant="link" className="mt-2 text-zinc-900">Apply Template</Button>
                        </div>
                    )}

                    {/* Change Orders */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-zinc-900">Change Orders</h2>
                        </div>
                        <ChangeOrderList changeOrders={project.changeOrders} />
                    </div>

                    {/* Invoicing */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-zinc-900">Invoices</h2>
                        </div>
                        <InvoiceList invoices={project.invoices} />
                    </div>

                    {/* RFIs */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-zinc-900">RFIs</h2>
                        </div>
                        <RFIList rfis={project.rfis} onSimulateAnswer={handleSimulateAnswerRFI} />
                    </div>
                </div>

                <div className="space-y-6 col-span-1">
                    <RecentLogs logs={project.logs} />
                    <ProjectNotes notes={project.notes} onSaveNote={handleSaveNote} />
                    <ProjectMessages messages={project.messages} onSendMessage={handleSendMessage} />
                </div>
            </div>

            <DailyLogDialog
                open={logOpen}
                onOpenChange={setLogOpen}
                onSave={handleSaveLog}
            />

            <CreateChangeOrderDialog
                open={changeOrderOpen}
                onOpenChange={setChangeOrderOpen}
                onSave={handleSaveChangeOrder}
            />

            <CreateInvoiceDialog
                open={invoiceOpen}
                onOpenChange={setInvoiceOpen}
                onSave={handleSaveInvoice}
            />

            <CreateRFIDialog
                open={rfiOpen}
                onOpenChange={setRfiOpen}
                onSave={handleSaveRFI}
            />
        </div>
    );
}
