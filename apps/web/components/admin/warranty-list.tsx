import { Warranty, WarrantyClaim } from "@/lib/admin/projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Calendar, AlertTriangle, FileText } from "lucide-react";

interface WarrantyListProps {
    warranties: Warranty[] | undefined;
    claims: WarrantyClaim[] | undefined;
    onFileClaim: (warrantyId: string) => void;
}

export function WarrantyList({ warranties, claims, onFileClaim }: WarrantyListProps) {
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
                    {w.status === 'Active' && (
                        <div className="mt-4 pt-4 border-t flex justify-end">
                            <Button variant="outline" size="sm" onClick={() => onFileClaim(w.id)}>
                                File Claim
                            </Button>
                        </div>
                    )}
                    {claims && claims.filter(c => c.warrantyId === w.id).length > 0 && (
                        <div className="mt-4 pt-4 border-t space-y-2">
                            <h5 className="text-xs font-semibold text-zinc-900">Active Claims</h5>
                            {claims.filter(c => c.warrantyId === w.id).map(claim => (
                                <div key={claim.id} className="bg-red-50 border border-red-100 p-2 rounded flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="h-3 w-3 text-red-600" />
                                        <span className="text-xs text-red-900 font-medium">{claim.title}</span>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] bg-white border-red-200">
                                        {claim.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
}
