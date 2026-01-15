import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function EstimatesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Estimates</h1>
                    <p className="mt-1 text-zinc-500">
                        View and manage your project estimates.
                    </p>
                </div>
                <Button asChild className="bg-zinc-900 text-white hover:bg-zinc-800">
                    <Link href="/dashboard/estimates/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Estimate
                    </Link>
                </Button>
            </div>

            {/* Demo Proposal Card */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold text-zinc-900">Patio & Fire Pit</h3>
                            <p className="mt-1 text-sm text-zinc-500">Created just now</p>
                        </div>
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 border border-yellow-200">
                            Draft
                        </span>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <div>
                            <p className="text-sm text-zinc-500">Est. Cost</p>
                            <p className="text-xl font-bold text-zinc-900">$14,040</p>
                        </div>

                        <Button asChild variant="outline" size="sm" className="border-zinc-200 text-zinc-700 hover:bg-zinc-50 bg-white">
                            <Link href="/dashboard/proposals/demo">View Proposal</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 py-16">
                <div className="rounded-full bg-white p-4 shadow-sm border border-zinc-100">
                    <svg
                        className="h-8 w-8 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-zinc-900">No estimates yet</h3>
                <p className="mt-2 text-sm text-zinc-500">
                    Create your first estimate to see pricing for your project.
                </p>
                <Button
                    asChild
                    variant="outline"
                    className="mt-4 border-zinc-200 text-zinc-700 hover:bg-zinc-50 bg-white"
                >
                    <Link href="/dashboard/estimates/new">Create Estimate</Link>
                </Button>
            </div>
        </div>
    );
}
