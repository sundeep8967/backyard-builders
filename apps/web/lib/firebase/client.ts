import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let googleProvider: GoogleAuthProvider | undefined;

// Only initialize Firebase on the client side
function getFirebaseApp() {
    if (typeof window === "undefined") {
        return undefined;
    }

    if (!app) {
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    }
    return app;
}

function getFirebaseAuth() {
    if (typeof window === "undefined") {
        return undefined;
    }

    if (!auth) {
        const firebaseApp = getFirebaseApp();
        if (firebaseApp) {
            auth = getAuth(firebaseApp);
        }
    }
    return auth;
}

function getGoogleProvider() {
    if (typeof window === "undefined") {
        return undefined;
    }

    if (!googleProvider) {
        googleProvider = new GoogleAuthProvider();
    }
    return googleProvider;
}

export { getFirebaseApp as app, getFirebaseAuth as auth, getGoogleProvider as googleProvider };
