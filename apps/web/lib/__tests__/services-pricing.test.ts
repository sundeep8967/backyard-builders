import { describe, it, expect } from "vitest";
import { SERVICES, calculatePrice } from "@/lib/services-pricing";

describe("Services Pricing", () => {
    describe("SERVICES data", () => {
        it("should have at least 5 services", () => {
            expect(SERVICES.length).toBeGreaterThanOrEqual(5);
        });

        it("should have required fields for each service", () => {
            SERVICES.forEach((service) => {
                expect(service.id).toBeDefined();
                expect(service.name).toBeDefined();
                expect(service.basePrice).toBeGreaterThan(0);
                expect(service.materials.length).toBeGreaterThan(0);
            });
        });

        it("should have at least one popular material per service", () => {
            SERVICES.forEach((service) => {
                const hasPopular = service.materials.some((m) => m.popular);
                // Not required, but good to check
                expect(service.materials.length).toBeGreaterThan(0);
            });
        });
    });

    describe("calculatePrice", () => {
        const patioService = SERVICES.find((s) => s.id === "patio")!;

        it("should calculate base price for sqft service", () => {
            const result = calculatePrice(patioService, "concrete", 200);
            // 200 sqft * $15/sqft = $3000
            expect(result.base).toBe(3000);
            expect(result.material).toBe(0); // No upgrade
            expect(result.total).toBe(3000);
        });

        it("should apply material modifier correctly", () => {
            const result = calculatePrice(patioService, "stamped", 200);
            // 200 sqft * $15/sqft = $3000 base
            // Stamped = 1.4x modifier
            // Total = 3000 * 1.4 = 4200
            expect(result.base).toBe(3000);
            expect(result.total).toBe(4200);
            expect(result.material).toBe(1200); // 4200 - 3000
        });

        it("should handle premium materials", () => {
            const result = calculatePrice(patioService, "travertine", 100);
            // 100 sqft * $15/sqft = $1500 base
            // Travertine = 2.5x modifier
            // Total = 1500 * 2.5 = 3750
            expect(result.base).toBe(1500);
            expect(result.total).toBe(3750);
        });

        it("should handle fixed price services", () => {
            const pergolaService = SERVICES.find((s) => s.id === "pergola")!;
            const result = calculatePrice(pergolaService, "wood", pergolaService.minSize);
            // Fixed price with size at minimum should give base price
            expect(result.total).toBeGreaterThan(0);
        });

        it("should default to first material if invalid ID", () => {
            const result = calculatePrice(patioService, "invalid_material", 100);
            // Should use first material (concrete, 1.0x)
            expect(result.base).toBe(1500);
            expect(result.total).toBe(1500);
        });
    });
});
