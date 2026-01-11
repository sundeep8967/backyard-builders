import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";

let adminAuth: Auth | null = null;

function getFirebaseAuth(): Auth {
    if (adminAuth) {
        return adminAuth;
    }

    if (getApps().length === 0) {
        const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

        if (!serviceAccountKey) {
            throw new Error(
                "Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable"
            );
        }

        try {
            const serviceAccount = JSON.parse(serviceAccountKey);
            initializeApp({
                credential: cert(serviceAccount),
            });
        } catch {
            throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY JSON");
        }
    }

    adminAuth = getAuth();
    return adminAuth;
}

// Helper to verify ID tokens
export async function verifyIdToken(token: string) {
    try {
        const auth = getFirebaseAuth();
        const decoded = await auth.verifyIdToken(token);
        return decoded;
    } catch (error) {
        console.error("Error verifying Firebase token:", error);
        return null;
    }
}
