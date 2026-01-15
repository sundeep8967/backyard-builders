import { FileText, Home, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { getProperties } from "@/lib/customer/properties";

export default async function DashboardPage() {
    const properties = await getProperties();

    const stats = [
        {
            title: "Properties",
            value: properties.length.toString(),
            description: "Active properties",
            icon: Home,
        },
        {
            title: "Estimates",
            value: "0",
            description: "Pending estimates",
            icon: FileText,
        },
        {
            title: "Projects",
            value: "0",
            description: "In progress",
            icon: TrendingUp,
        },
        {
            title: "Team",
            value: "1",
            description: "Household members",
            icon: Users,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-3xl font-bold text-zinc-900">Welcome back!</h1>
                <p className="mt-2 text-zinc-600">
                    Here&apos;s what&apos;s happening with your properties.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-zinc-500">
                                {stat.title}
                            </span>
                            <stat.icon className="h-5 w-5 text-zinc-400" />
                        </div>
                        <div className="mt-2">
                            <span className="text-3xl font-bold text-zinc-900">{stat.value}</span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">{stat.description}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-zinc-900">Quick Actions</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Get started by adding your first property.
                </p>
                <div className="mt-4 flex gap-4">
                    <Link
                        href="/dashboard/properties/new"
                        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
                    >
                        Add Property
                    </Link>
                    <Link
                        href="/dashboard/estimates/new"
                        className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
                    >
                        Request Estimate
                    </Link>
                </div>
            </div>
        </div>
    );
}
