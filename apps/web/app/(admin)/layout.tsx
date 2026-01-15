import { LayoutDashboard, Users, FileText, Settings, LogOut, CheckSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-zinc-100">
            {/* Admin Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white">
                <div className="flex h-16 items-center border-b border-zinc-200 px-6">
                    <span className="text-lg font-bold text-zinc-900">BB Admin</span>
                </div>

                <nav className="space-y-1 p-4">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/leads"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    >
                        <Users className="h-4 w-4" />
                        Leads
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    >
                        <CheckSquare className="h-4 w-4" />
                        Projects
                    </Link>
                    <Link
                        href="/admin/estimates"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    >
                        <FileText className="h-4 w-4" />
                        Estimates
                    </Link>
                </nav>

                <div className="absolute bottom-4 left-0 w-full border-t border-zinc-200 p-4">
                    <Button variant="ghost" className="w-full justify-start text-zinc-500 hover:text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
