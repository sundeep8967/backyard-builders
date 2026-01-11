import { describe, it, expect } from "vitest";
import { SAMPLE_PROJECTS, PROJECT_TYPES } from "@/lib/sample-projects";

describe("Sample Projects", () => {
    it("should have at least 5 sample projects", () => {
        expect(SAMPLE_PROJECTS.length).toBeGreaterThanOrEqual(5);
    });

    it("should have valid project types", () => {
        const validTypes = PROJECT_TYPES.map((t) => t.value);
        SAMPLE_PROJECTS.forEach((project) => {
            expect(validTypes).toContain(project.type);
        });
    });

    it("should have required fields for each project", () => {
        SAMPLE_PROJECTS.forEach((project) => {
            expect(project.id).toBeDefined();
            expect(project.title).toBeDefined();
            expect(project.description).toBeDefined();
            expect(project.image).toBeDefined();
            expect(project.location).toBeDefined();
            expect(project.features).toBeDefined();
            expect(project.features.length).toBeGreaterThan(0);
        });
    });

    it("should have unique IDs", () => {
        const ids = SAMPLE_PROJECTS.map((p) => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });
});

describe("Project Types", () => {
    it("should have standard outdoor project types", () => {
        const typeValues = PROJECT_TYPES.map((t) => t.value);
        expect(typeValues).toContain("patio");
        expect(typeValues).toContain("deck");
        expect(typeValues).toContain("pergola");
    });

    it("should have labels for all types", () => {
        PROJECT_TYPES.forEach((type) => {
            expect(type.label).toBeDefined();
            expect(type.label.length).toBeGreaterThan(0);
        });
    });
});
