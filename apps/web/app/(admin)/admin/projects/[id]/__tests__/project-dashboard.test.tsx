import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProjectDashboardPage from "../page";

// Mock useParams to simulate visiting a specific project
vi.mock("next/navigation", () => ({
    useParams: () => ({ id: "proj-1" }),
}));

describe("ProjectDashboardPage", () => {
    it("renders project title and status", () => {
        render(<ProjectDashboardPage />);
        expect(screen.getByText("Full Backyard Reno")).toBeInTheDocument();
        expect(screen.getByText("active")).toBeInTheDocument();
    });

    it("renders budget and progress", () => {
        render(<ProjectDashboardPage />);
        expect(screen.getByText("$45,000")).toBeInTheDocument();
        expect(screen.getByText("35%")).toBeInTheDocument();
    });

    it("renders schedule component", () => {
        render(<ProjectDashboardPage />);
        // MOCK Project 1 (id: "proj-1" which we verify is default in test but we mocked useParams)
        // MOCK_PROJECTS[0] has phases in recent update.
        // So we should expect "Construction Schedule" (the card title)
        expect(screen.getByText("Construction Schedule")).toBeInTheDocument();
        expect(screen.getByText("Prep & Demo")).toBeInTheDocument();
    });
});
