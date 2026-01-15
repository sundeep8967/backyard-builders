import { ChangeOrder } from "@/lib/admin/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function formatMoney(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

interface ChangeOrderListProps {
    changeOrders: ChangeOrder[] | undefined;
}

export function ChangeOrderList({ changeOrders }: ChangeOrderListProps) {
    if (!changeOrders || changeOrders.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-500">
                <p>No change orders created.</p>
            </div>
        );
    }

    const getStatusColor = (status: ChangeOrder["status"]) => {
        switch (status) {
            case "approved": return "bg-green-100 text-green-700 hover:bg-green-100";
            case "rejected": return "bg-red-100 text-red-700 hover:bg-red-100";
            case "pending": return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
            default: return "bg-zinc-100 text-zinc-700 hover:bg-zinc-100";
        }
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {changeOrders.map((co) => (
                <Card key={co.id} className="overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-semibold text-zinc-900">{co.title}</h4>
                                <p className="text-sm text-zinc-500">{new Date(co.createdAt).toLocaleDateString()}</p>
                            </div>
                            <Badge className={getStatusColor(co.status)}>
                                {co.status}
                            </Badge>
                        </div>
                        <p className="mt-2 text-sm text-zinc-600 line-clamp-2 min-h-[40px]">
                            {co.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t pt-3">
                            <span className="text-sm font-medium text-zinc-500">Cost Impact</span>
                            <span className={`font-bold ${co.cost >= 0 ? 'text-zinc-900' : 'text-green-600'}`}>
                                {co.cost >= 0 ? "+" : ""}{formatMoney(co.cost)}
                            </span>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
