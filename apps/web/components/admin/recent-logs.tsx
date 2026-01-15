import { Project, ProjectLog } from "@/lib/admin/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CloudSun, Clock } from "lucide-react";

interface RecentLogsProps {
    logs: ProjectLog[] | undefined;
}

export function RecentLogs({ logs }: RecentLogsProps) {
    if (!logs || logs.length === 0) {
        return (
            <Card className="col-span-1 md:col-span-1">
                <CardHeader>
                    <CardTitle>Recent Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-zinc-500">No logs recorded yet.</p>
                </CardContent>
            </Card>
        );
    }

    // Sort by date descending
    const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <Card className="col-span-1 md:col-span-1 h-full">
            <CardHeader>
                <CardTitle>Recent Logs</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-6">
                        {sortedLogs.map((log) => (
                            <div key={log.id} className="flex gap-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{log.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium leading-none">{log.author}</p>
                                        <span className="text-xs text-zinc-500">{new Date(log.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-zinc-500 line-clamp-2">{log.notes}</p>
                                    <div className="flex items-center gap-3 pt-1">
                                        <div className="flex items-center gap-1 text-xs text-zinc-400">
                                            <CloudSun className="h-3 w-3" />
                                            {log.weather}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-zinc-400">
                                            <Clock className="h-3 w-3" />
                                            {log.hoursWorked}h
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
