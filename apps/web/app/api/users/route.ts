import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/api/with-auth";
import { supabase } from "@/lib/supabase/server";

// GET /api/users - Get current user profile
export async function GET(request: NextRequest) {
    return withAuth(request, async (req: AuthenticatedRequest) => {
        const { data: user, error } = await supabase
            .from("users")
            .select("*, household_members(household_id, role, households(*))")
            .eq("firebase_uid", req.userId)
            .single();

        if (error) {
            console.error("Error fetching user:", error);
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    });
}

// PATCH /api/users - Update current user profile
export async function PATCH(request: NextRequest) {
    return withAuth(request, async (req: AuthenticatedRequest) => {
        const body = await request.json();

        // Only allow updating specific fields
        const allowedFields = ["display_name", "phone", "onboarding_state"];
        const updates: Record<string, unknown> = {};

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updates[field] = body[field];
            }
        }

        const { data: user, error } = await supabase
            .from("users")
            .update(updates)
            .eq("firebase_uid", req.userId)
            .select()
            .single();

        if (error) {
            console.error("Error updating user:", error);
            return NextResponse.json(
                { error: "Failed to update user" },
                { status: 500 }
            );
        }

        return NextResponse.json({ user });
    });
}
