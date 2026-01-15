"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bell, LogOut } from "lucide-react";
import { Sidebar } from "./sidebar";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const { user, signOut, isDemoMode } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/sign-in");
    };

    const initials = user?.displayName
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U";

    return (
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:px-6">
            {/* Mobile Menu */}
            <div className="flex items-center gap-4 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-zinc-500">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0 bg-white border-zinc-200">
                        <Sidebar className="border-0" />
                    </SheetContent>
                </Sheet>
                <span className="text-lg font-bold text-zinc-900">DHC</span>
            </div>

            {/* Demo Mode indicator */}
            <div className="hidden lg:block">
                {isDemoMode && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-600 border border-amber-200">
                        Demo Mode
                    </span>
                )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-900">
                    <Bell className="h-5 w-5" />
                </Button>

                {/* User Menu */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                        <AvatarFallback className="bg-zinc-100 text-zinc-900 text-sm">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-zinc-900">{user?.displayName || "User"}</p>
                        <p className="text-xs text-zinc-500">{user?.email}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-500 hover:text-zinc-900"
                        onClick={handleSignOut}
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
