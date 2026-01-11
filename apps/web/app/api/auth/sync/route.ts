import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/firebase/admin";
import { supabase } from "@/lib/supabase/server";

// POST /api/auth/sync - Sync Firebase user to Supabase after login
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing authorization header" },
                { status: 401 }
            );
        }

        const token = authHeader.split("Bearer ")[1];
        const decoded = await verifyIdToken(token);

        if (!decoded) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        // Upsert user in Supabase
        const { data: user, error } = await supabase
            .from("users")
            .upsert(
                {
                    firebase_uid: decoded.uid,
                    email: decoded.email,
                    display_name: decoded.name || decoded.email?.split("@")[0],
                    photo_url: decoded.picture,
                    updated_at: new Date().toISOString(),
                },
                {
                    onConflict: "firebase_uid",
                }
            )
            .select()
            .single();

        if (error) {
            console.error("Error syncing user:", error);
            return NextResponse.json(
                { error: "Failed to sync user" },
                { status: 500 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Auth sync error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
