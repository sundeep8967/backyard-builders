export interface Property {
    id: string;
    streetAddress: string;
    unit?: string;
    city: string;
    state: string;
    zipCode: string;
    propertyType: "single_family" | "townhouse" | "condo" | "commercial";
    nickname?: string;
    createdAt: string;
}

export const MOCK_PROPERTIES: Property[] = [
    {
        id: "prop-1",
        streetAddress: "123 Main St",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85001",
        propertyType: "single_family",
        nickname: "Primary Residence",
        createdAt: new Date().toISOString()
    }
];

import { z } from "zod";

export const propertySchema = z.object({
    streetAddress: z.string().min(5, "Street address must be at least 5 characters"),
    unit: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().regex(/^\d{5}$/, "Must be a valid 5-digit zip code"),
    propertyType: z.enum(["single_family", "townhouse", "condo", "commercial"], {
        message: "Please select a property type"
    }),
    nickname: z.string().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

export async function getProperties(): Promise<Property[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_PROPERTIES;
}
