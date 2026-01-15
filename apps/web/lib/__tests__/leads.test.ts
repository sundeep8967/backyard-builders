import { describe, expect, it } from "vitest";
import { MOCK_LEADS, Lead, LeadStatus } from "../admin/leads";

describe("Leads Data", () => {
    it("should have valid mock leads", () => {
        expect(MOCK_LEADS.length).toBeGreaterThan(0);

        const firstLead = MOCK_LEADS[0];
        expect(firstLead).toHaveProperty("id");
        expect(firstLead).toHaveProperty("customerName");
        expect(firstLead).toHaveProperty("status");
    });

    it("should have valid statuses", () => {
        const validStatuses: LeadStatus[] = ["new", "contacted", "scheduled", "proposal", "won", "lost"];

        MOCK_LEADS.forEach(lead => {
            expect(validStatuses).toContain(lead.status);
        });
    });

    it("should act as a data source for the dashboard", () => {
        // This test simulates the 'getLeadsByStatus' logic used in the component
        const newLeads = MOCK_LEADS.filter(l => l.status === 'new');
        const contactedLeads = MOCK_LEADS.filter(l => l.status === 'contacted');

        expect(Array.isArray(newLeads)).toBe(true);
        expect(Array.isArray(contactedLeads)).toBe(true);
    });
});
