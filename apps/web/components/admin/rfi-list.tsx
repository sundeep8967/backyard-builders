import { RFI } from "@/lib/admin/projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle, Clock } from "lucide-react";

interface RFIListProps {
    rfis: RFI[] | undefined;
    onSimulateAnswer: (id: string) => void;
}

export function RFIList({ rfis, onSimulateAnswer }: RFIListProps) {
    if (!rfis || rfis.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-500">
                <p>No active RFIs.</p>
            </div>
        );
    }

    const getStatusBadge = (status: RFI["status"]) => {
        switch (status) {
            case "open":
                return <Badge variant="destructive" className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200 gap-1"><HelpCircle className="h-3 w-3" /> Open</Badge>;
            case "answered":
                return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 gap-1"><Clock className="h-3 w-3" /> Answered</Badge>;
            case "closed":
                return <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 gap-1"><CheckCircle className="h-3 w-3" /> Closed</Badge>;
        }
    };

    return (
        <div className="space-y-3">
            {rfis.map((rfi) => (
                <Card key={rfi.id} className="p-4 bg-white border-zinc-200">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-zinc-900 text-sm">RFI: {rfi.question}</h4>
                                {getStatusBadge(rfi.status)}
                            </div>
                            <p className="text-xs text-zinc-400">Created: {new Date(rfi.createdAt).toLocaleDateString()}</p>

                            {rfi.answer && (
                                <div className="mt-3 p-2 bg-blue-50 text-blue-900 text-sm rounded border border-blue-100">
                                    <span className="font-semibold">Answer:</span> {rfi.answer}
                                </div>
                            )}
                        </div>
                        {rfi.status === "open" && (
                            <Button size="sm" variant="outline" onClick={() => onSimulateAnswer(rfi.id)}>
                                Simulate Answer
                            </Button>
                        )}
                        {rfi.status === "answered" && (
                            <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => onSimulateAnswer(rfi.id)}>
                                Close RFI
                            </Button>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
}
