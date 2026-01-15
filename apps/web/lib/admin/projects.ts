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
    }
];
