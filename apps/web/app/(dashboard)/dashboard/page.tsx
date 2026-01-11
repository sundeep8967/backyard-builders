import { FileText, Home, TrendingUp, Users } from "lucide-react";

const stats = [
    {
        title: "Properties",
        value: "0",
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

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
                <p className="mt-2 text-zinc-400">
                    Here&apos;s what&apos;s happening with your properties.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-lg border border-zinc-800 bg-zinc-950 p-6"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-zinc-400">
                                {stat.title}
                            </span>
                            <stat.icon className="h-5 w-5 text-zinc-600" />
                        </div>
                        <div className="mt-2">
                            <span className="text-3xl font-bold text-white">{stat.value}</span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">{stat.description}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
                <p className="mt-1 text-sm text-zinc-400">
                    Get started by adding your first property.
                </p>
                <div className="mt-4 flex gap-4">
                    <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors">
                        Add Property
                    </button>
                    <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
                        Request Estimate
                    </button>
                </div>
            </div>
        </div>
    );
}
