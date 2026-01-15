import { Notification } from "@/lib/admin/projects";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationsPopoverProps {
    notifications: Notification[] | undefined;
    onMarkAsRead: (id: string) => void;
}

export function NotificationsPopover({ notifications, onMarkAsRead }: NotificationsPopoverProps) {
    const unreadCount = notifications?.filter(n => !n.read).length || 0;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                </div>
                <ScrollArea className="h-[300px]">
                    {!notifications || notifications.length === 0 ? (
                        <div className="p-8 text-center text-sm text-zinc-500">
                            No notifications.
                        </div>
                    ) : (
                        <div className="grid">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={cn(
                                        "p-4 border-b last:border-0 hover:bg-zinc-50 cursor-pointer transition-colors",
                                        !notif.read && "bg-blue-50/50"
                                    )}
                                    onClick={() => onMarkAsRead(notif.id)}
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <p className={cn("text-sm font-medium", !notif.read ? "text-blue-900" : "text-zinc-900")}>
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                                {notif.message}
                                            </p>
                                            <p className="text-[10px] text-zinc-400 mt-2">
                                                {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(notif.timestamp).toLocaleDateString()}
                                            </p>
                                        </div>
                                        {!notif.read && (
                                            <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <div className="p-2 border-t text-center">
                    <Button variant="ghost" size="sm" className="text-xs w-full">
                        View All
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
