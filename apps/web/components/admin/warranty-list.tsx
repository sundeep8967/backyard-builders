import { Warranty } from "@/lib/admin/projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Calendar, AlertTriangle } from "lucide-react";

interface WarrantyListProps {
    warranties: Warranty[] | undefined;
}

export function WarrantyList({ warranties }: WarrantyListProps) {
    if (!warranties || warranties.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-6 text-center text-zinc-500">
                <p>No warranties registered.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {warranties.map((w) => (
                <Card key={w.id} className="p-4 bg-white border-zinc-200">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 p-2 bg-green-50 rounded-full">
                                <ShieldCheck className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-zinc-900 text-sm">{w.type} Warranty</h4>
                                <p className="text-xs text-zinc-500 mt-1">{w.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-zinc-600">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>Start: {new Date(w.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>End: {new Date(w.endDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={w.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}
                        >
                            {w.status}
                        </Badge>
                    </div>
                </Card>
            ))}
        </div>
    );
}
