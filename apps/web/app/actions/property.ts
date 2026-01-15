"use server";

import { revalidatePath } from "next/cache";
import { propertySchema, PropertyFormData } from "@/lib/customer/properties";
import { isZipCodeInServiceArea } from "@/lib/service-areas";
import { redirect } from "next/navigation";

export interface ActionState {
    success?: boolean;
    message?: string;
    errors?: {
        [K in keyof PropertyFormData]?: string[];
    };
}

export async function createProperty(prevState: ActionState, formData: FormData): Promise<ActionState> {
    // 1. Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 2. Parse and validate form data
    const rawData = Object.fromEntries(formData.entries());

    // Handle select/enum fields if they come in as empty strings or similar? 
    // Zod handles that if we pass the object.

    const validatedFields = propertySchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please fix the errors in the form",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { zipCode } = validatedFields.data;

    // 3. Service Area Validation
    if (!isZipCodeInServiceArea(zipCode)) {
        return {
            success: false,
            message: "Sorry, this zip code is currently outside our service area.",
            errors: {
                zipCode: ["Zip code not in service area"],
            },
        };
    }

    // 4. "Save" to database (Mock)
    console.log("Saving property:", validatedFields.data);
    // In a real app: await db.property.create({ data: validatedFields.data });

    // 5. Revalidate and Redirect
    revalidatePath("/dashboard");
    redirect("/dashboard?property_created=true");
}
