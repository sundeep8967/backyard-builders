import { z } from "zod";

const envSchema = z.object({
    // Client-side (Public)
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().optional(),

    // Server-side (Private)
    FIREBASE_SERVICE_ACCOUNT_KEY: z.string().optional(),
    SUPABASE_URL: z.string().url().optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
});

export function validateEnv() {
    const env = {
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    const parsed = envSchema.safeParse(env);

    if (!parsed.success) {
        console.warn(
            "❌ Invalid environment variables:",
            parsed.error.flatten().fieldErrors
        );
        // We don't throw here to allow build/demo mode to work, 
        // but in strict production this should throw.
        return { valid: false, errors: parsed.error.flatten().fieldErrors };
    }

    return { valid: true, env: parsed.data };
}
