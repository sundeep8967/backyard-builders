import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client with service role key
// This bypasses RLS and has full database access
// NEVER use this on the client side

let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
    if (supabaseInstance) {
        return supabaseInstance;
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error(
            "Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
        );
    }

    supabaseInstance = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

    return supabaseInstance;
}

// Lazy initialization - only create client when actually needed
export const supabase = new Proxy({} as SupabaseClient, {
    get(_, prop) {
        const client = getSupabaseClient();
        const value = client[prop as keyof SupabaseClient];
        if (typeof value === "function") {
            return value.bind(client);
        }
        return value;
    },
});
