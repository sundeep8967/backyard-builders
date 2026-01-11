import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/api/with-auth";
import { supabase } from "@/lib/supabase/server";

// GET /api/properties - Get all properties for current user's household
export async function GET(request: NextRequest) {
    return withAuth(request, async (req: AuthenticatedRequest) => {
        // First get user's household
        const { data: membership } = await supabase
            .from("household_members")
            .select("household_id")
            .eq("user_id", (
                await supabase
                    .from("users")
                    .select("id")
                    .eq("firebase_uid", req.userId)
                    .single()
            ).data?.id)
            .single();

        if (!membership) {
            return NextResponse.json({ properties: [] });
        }

        const { data: properties, error } = await supabase
            .from("properties")
            .select("*")
            .eq("household_id", membership.household_id)
            .eq("status", "active")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching properties:", error);
            return NextResponse.json(
                { error: "Failed to fetch properties" },
                { status: 500 }
            );
        }

        return NextResponse.json({ properties });
    });
}

// POST /api/properties - Create a new property
export async function POST(request: NextRequest) {
    return withAuth(request, async (req: AuthenticatedRequest) => {
        const body = await request.json();

        // Get user and their household
        const { data: user } = await supabase
            .from("users")
            .select("id")
            .eq("firebase_uid", req.userId)
            .single();

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Get or create household
        let householdId: string;

        const { data: membership } = await supabase
            .from("household_members")
            .select("household_id")
            .eq("user_id", user.id)
            .single();

        if (membership) {
            householdId = membership.household_id;
        } else {
            // Create new household for user
            const { data: household, error: householdError } = await supabase
                .from("households")
                .insert({ name: "My Household" })
                .select()
                .single();

            if (householdError || !household) {
                return NextResponse.json(
                    { error: "Failed to create household" },
                    { status: 500 }
                );
            }

            householdId = household.id;

            // Add user as owner
            await supabase.from("household_members").insert({
                household_id: householdId,
                user_id: user.id,
                role: "owner",
            });
        }

        // Create property
        const { data: property, error } = await supabase
            .from("properties")
            .insert({
                household_id: householdId,
                street_address: body.street_address,
                unit: body.unit,
                city: body.city,
                state: body.state,
                zip_code: body.zip_code,
                lot_size_sqft: body.lot_size_sqft,
                property_type: body.property_type,
                is_primary: body.is_primary ?? true,
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating property:", error);
            return NextResponse.json(
                { error: "Failed to create property" },
                { status: 500 }
            );
        }

        return NextResponse.json({ property }, { status: 201 });
    });
}
