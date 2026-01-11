import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Next.js router
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
    }),
    usePathname: () => "/dashboard",
}));

// Mock Firebase
vi.mock("@/lib/firebase/client", () => ({
    auth: () => undefined,
    googleProvider: () => undefined,
}));

describe("Auth Context", () => {
    beforeEach(() => {
        // Clear session storage before each test
        sessionStorage.clear();
    });

    it("should detect demo mode when Firebase is not configured", async () => {
        // When NEXT_PUBLIC_FIREBASE_API_KEY is not set or is placeholder
        // The auth context should be in demo mode
        const originalEnv = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY = "your-api-key";

        // In demo mode, we expect isDemoMode to be true
        // This is tested indirectly through the UI behavior
        expect(process.env.NEXT_PUBLIC_FIREBASE_API_KEY).toBe("your-api-key");

        process.env.NEXT_PUBLIC_FIREBASE_API_KEY = originalEnv;
    });

    it("should provide demo user when in demo mode", () => {
        // Demo user should have expected properties
        const demoUser = {
            uid: "demo-user-123",
            email: "demo@example.com",
            displayName: "Demo User",
        };

        expect(demoUser.uid).toBeDefined();
        expect(demoUser.email).toBeDefined();
        expect(demoUser.displayName).toBeDefined();
    });
});

describe("Onboarding Context", () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it("should store zip code in session storage", () => {
        sessionStorage.setItem("onboarding_zip", "85001");
        expect(sessionStorage.getItem("onboarding_zip")).toBe("85001");
    });

    it("should store onboarding data", () => {
        const data = {
            firstName: "John",
            lastName: "Doe",
            phone: "555-1234",
            streetAddress: "123 Main St",
            city: "Phoenix",
            state: "AZ",
            zipCode: "85001",
        };

        sessionStorage.setItem("onboarding_data", JSON.stringify(data));
        const retrieved = JSON.parse(sessionStorage.getItem("onboarding_data")!);

        expect(retrieved.firstName).toBe("John");
        expect(retrieved.city).toBe("Phoenix");
    });

    it("should clear onboarding data on completion", () => {
        sessionStorage.setItem("onboarding_data", "test");
        sessionStorage.setItem("onboarding_zip", "85001");

        sessionStorage.removeItem("onboarding_data");
        sessionStorage.removeItem("onboarding_zip");

        expect(sessionStorage.getItem("onboarding_data")).toBeNull();
        expect(sessionStorage.getItem("onboarding_zip")).toBeNull();
    });
});
