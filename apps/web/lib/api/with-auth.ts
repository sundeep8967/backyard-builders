import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/firebase/admin";

export type AuthenticatedRequest = NextRequest & {
    userId: string;
    userEmail: string | undefined;
};

export async function withAuth(
    request: NextRequest,
    handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json(
            { error: "Missing or invalid authorization header" },
            { status: 401 }
        );
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = await verifyIdToken(token);

    if (!decoded) {
        return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 }
        );
    }

    // Attach user info to request
    const authenticatedRequest = request as AuthenticatedRequest;
    authenticatedRequest.userId = decoded.uid;
    authenticatedRequest.userEmail = decoded.email;

    return handler(authenticatedRequest);
}
