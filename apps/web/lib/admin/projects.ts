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
