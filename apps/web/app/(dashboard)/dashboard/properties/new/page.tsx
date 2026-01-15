
import { AddPropertyForm } from "@/components/properties/add-property-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddPropertyPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link
                    href="/dashboard"
                    className="flex items-center text-sm text-zinc-400 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-white">Add New Property</h1>
                <p className="mt-2 text-zinc-400">Enter the details for your new property to get started.</p>
            </div>

            <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader>
                    <CardTitle className="text-white">Property Details</CardTitle>
                    <CardDescription className="text-zinc-500">
                        We currently only serve the Phoenix Metro Area.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AddPropertyForm />
                </CardContent>
            </Card>
        </div>
    );
}

