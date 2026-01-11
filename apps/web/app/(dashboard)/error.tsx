"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-red-900/50 bg-red-900/10 p-8 text-center">
            <h2 className="text-xl font-bold text-white">Something went wrong!</h2>
            <p className="mt-2 text-zinc-400">
                We encountered an unexpected error while loading this page.
            </p>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                variant="outline"
                className="mt-6 border-red-500 text-red-500 hover:bg-red-950"
            >
                Try again
            </Button>
        </div>
    );
}
