"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    LayoutDashboard,
    Home,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Properties",
        href: "/dashboard/properties",
        icon: Home,
    },
    {
        title: "Estimates",
        href: "/dashboard/estimates",
        icon: FileText,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className={cn(
                "relative flex flex-col border-r bg-white transition-all duration-300",
                collapsed ? "w-16" : "w-64",
                className
            )}
        >
            {/* Logo */}
            <div className="flex h-16 items-center border-b border-zinc-200 px-4">
                {!collapsed && (
                    <span className="text-lg font-bold tracking-tight text-zinc-900">
                        Dream Home Constructors
                    </span>
                )}
                {collapsed && (
                    <span className="text-lg font-bold text-zinc-900">DHC</span>
                )}
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 py-4">
                <nav className="space-y-1 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                    isActive
                                        ? "bg-zinc-100 text-zinc-900"
                                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {!collapsed && <span>{item.title}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>

            {/* Collapse Toggle */}
            <div className="border-t border-zinc-200 p-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center text-zinc-500 hover:text-zinc-900"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </div>
    );
}
