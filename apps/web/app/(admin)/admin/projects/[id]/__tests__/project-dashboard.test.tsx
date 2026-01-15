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

    it("renders placeholder for schedule", () => {
        render(<ProjectDashboardPage />);
        expect(screen.getByText(/Project Schedule & Tasks Coming Soon/i)).toBeInTheDocument();
    });
});
