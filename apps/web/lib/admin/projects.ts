export type ProjectStatus = "planning" | "active" | "completed" | "hold";

export interface Project {
    id: string;
    leadId: string; // Link back to original lead
    customerName: string;
    address: string;
    projectType: string;
    status: ProjectStatus;
    startDate: string; // ISO Date
    endDate?: string; // ISO Date
    budget: number;
    completionPercentage: number;
    phases: ProjectPhase[];
    logs?: ProjectLog[];
    changeOrders?: ChangeOrder[];
    invoices?: Invoice[];
    messages?: Message[];
}

export interface Message {
    id: string;
    content: string;
    sender: string;
    isAdmin: boolean; // true if sent by internal team, false if by customer
    timestamp: string;
}

export interface Invoice {
    id: string;
    title: string;
    amount: number;
    status: "draft" | "sent" | "paid" | "overdue";
    dueDate: string;
    createdAt: string;
}

export interface ChangeOrder {
    id: string;
    title: string;
    description: string;
    cost: number;
    status: "draft" | "pending" | "approved" | "rejected";
    createdAt: string;
}

export interface ProjectLog {
    id: string;
    date: string;
    weather: string;
    notes: string;
    hoursWorked: number;
    author: string;
}

export interface ProjectPhase {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: "not-started" | "in-progress" | "completed";
}

export const MOCK_PROJECTS: Project[] = [
    {
        id: "proj-1",
        leadId: "lead-old-1",
        customerName: "John Doe",
        address: "123 Maple Ave, Springfield",
        projectType: "Full Backyard Reno",
        status: "active",
        startDate: "2025-12-01T09:00:00Z",
        budget: 45000,
        completionPercentage: 35,
        phases: [
            { id: "ph-1", name: "Prep & Demo", startDate: "2025-12-01", endDate: "2025-12-05", status: "completed" },
            { id: "ph-2", name: "Foundation / Grading", startDate: "2025-12-06", endDate: "2025-12-15", status: "in-progress" },
            { id: "ph-3", name: "Structure / Hardscape", startDate: "2025-12-16", endDate: "2025-12-30", status: "not-started" },
            { id: "ph-4", name: "Finishes & Cleanup", startDate: "2026-01-02", endDate: "2026-01-10", status: "not-started" },
        ],
        logs: [
            { id: "log-1", date: "2025-12-01", weather: "Sunny, 55F", notes: "Started demo. Removed old patio pavers.", hoursWorked: 8, author: "Mike" },
            { id: "log-2", date: "2025-12-02", weather: "Cloudy, 52F", notes: "Continued demo. Cleared shrubs.", hoursWorked: 6, author: "Mike" },
        ],
        changeOrders: [
            { id: "co-1", title: "Extra Pavers", description: "Customer requested 50sqft additional patio.", cost: 1200, status: "approved", createdAt: "2025-12-10" }
        ],
        invoices: [
            { id: "inv-1", title: "Deposit / Mobilization", amount: 15000, status: "paid", dueDate: "2025-11-30", createdAt: "2025-11-20" },
            { id: "inv-2", title: "Foundation Milestone", amount: 10000, status: "sent", dueDate: "2025-12-15", createdAt: "2025-12-10" }
        ],
        messages: [
            { id: "msg-1", content: "Hi! When will the crew start tomorrow?", sender: "James (Client)", isAdmin: false, timestamp: "2025-12-05T18:00:00Z" },
            { id: "msg-2", content: "They will be there at 8 AM sharp.", sender: "Admin", isAdmin: true, timestamp: "2025-12-05T18:15:00Z" }
        ]
    },
    {
        id: "proj-2",
        leadId: "lead-old-2",
        customerName: "Jane Smith",
        address: "456 Oak Dr, Springfield",
        projectType: "Pool Installation",
        status: "planning",
        startDate: "2026-02-15T09:00:00Z",
        budget: 85000,
        completionPercentage: 0,
        phases: [
            { id: "ph-1", name: "Prep & Demo", startDate: "2026-02-15", endDate: "2026-02-20", status: "not-started" },
            { id: "ph-2", name: "Foundation / Grading", startDate: "2026-02-21", endDate: "2026-03-05", status: "not-started" },
        ]
    }
];
