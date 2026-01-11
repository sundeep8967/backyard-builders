import { describe, it, expect } from "vitest";
import {
    isZipCodeValid,
    isZipCodeInServiceArea,
    getServiceAreaMessage,
} from "@/lib/service-areas";

describe("Service Area Validation", () => {
    describe("isZipCodeValid", () => {
        it("should return true for valid 5-digit zip code", () => {
            expect(isZipCodeValid("85001")).toBe(true);
            expect(isZipCodeValid("10001")).toBe(true);
            expect(isZipCodeValid("00000")).toBe(true);
        });

        it("should return false for invalid zip codes", () => {
            expect(isZipCodeValid("")).toBe(false);
            expect(isZipCodeValid("1234")).toBe(false);
            expect(isZipCodeValid("123456")).toBe(false);
            expect(isZipCodeValid("abcde")).toBe(false);
            expect(isZipCodeValid("8500a")).toBe(false);
        });
    });

    describe("isZipCodeInServiceArea", () => {
        it("should return true for Phoenix metro zip codes", () => {
            expect(isZipCodeInServiceArea("85001")).toBe(true);
            expect(isZipCodeInServiceArea("85250")).toBe(true); // Scottsdale
            expect(isZipCodeInServiceArea("85281")).toBe(true); // Tempe
        });

        it("should return false for non-service area zip codes", () => {
            expect(isZipCodeInServiceArea("10001")).toBe(false); // NYC
            expect(isZipCodeInServiceArea("90210")).toBe(false); // Beverly Hills
            expect(isZipCodeInServiceArea("00000")).toBe(false);
        });
    });

    describe("getServiceAreaMessage", () => {
        it("should return error for invalid zip code", () => {
            const result = getServiceAreaMessage("123");
            expect(result.isValid).toBe(false);
            expect(result.inServiceArea).toBe(false);
            expect(result.message).toContain("valid 5-digit");
        });

        it("should return success for zip in service area", () => {
            const result = getServiceAreaMessage("85001");
            expect(result.isValid).toBe(true);
            expect(result.inServiceArea).toBe(true);
            expect(result.message).toContain("serve your area");
        });

        it("should return waitlist message for zip outside service area", () => {
            const result = getServiceAreaMessage("10001");
            expect(result.isValid).toBe(true);
            expect(result.inServiceArea).toBe(false);
            expect(result.message).toContain("waitlist");
        });
    });
});
