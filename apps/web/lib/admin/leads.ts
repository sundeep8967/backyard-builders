export type LeadStatus = "new" | "contacted" | "scheduled" | "proposal" | "won" | "lost";

export interface Lead {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    projectType: string;
    estBudget: number;
    status: LeadStatus;
    createdAt: string;
    lastContact: string;
}

export const MOCK_LEADS: Lead[] = [
    {
        id: "lead-1",
        customerName: "Alice Johnson",
        email: "alice@example.com",
        phone: "(555) 123-4567",
        projectType: "Patio & Fire Pit",
        estBudget: 14500,
        status: "new",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        lastContact: "Never",
    },
    {
        id: "lead-2",
        customerName: "Bob Smith",
        email: "bob.smith@example.com",
        phone: "(555) 987-6543",
        projectType: "Outdoor Kitchen",
        estBudget: 28000,
        status: "contacted",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        lastContact: "Called 1/14 - Left VM",
    },
    {
        id: "lead-3",
        customerName: "Carol White",
        email: "carol.w@example.com",
        phone: "(555) 456-7890",
        projectType: "Deck Replacement",
        estBudget: 12000,
        status: "scheduled",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        lastContact: "Site visit confirmed for 1/20",
    },
    {
        id: "lead-4",
        customerName: "David Brown",
        email: "dbrown@example.com",
        phone: "(555) 555-5555",
        projectType: "Pool Landscaping",
        estBudget: 45000,
        status: "proposal",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        lastContact: "Proposal sent 1/12",
    },
];
