import { Invoice } from "@/lib/admin/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function formatMoney(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

interface InvoiceListProps {
    invoices: Invoice[] | undefined;
}

export function InvoiceList({ invoices }: InvoiceListProps) {
    if (!invoices || invoices.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-500">
                <p>No invoices generated.</p>
            </div>
        );
    }

    const getStatusColor = (status: Invoice["status"]) => {
        switch (status) {
            case "paid": return "bg-green-100 text-green-700 hover:bg-green-100";
            case "sent": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
            case "overdue": return "bg-red-100 text-red-700 hover:bg-red-100";
            default: return "bg-zinc-100 text-zinc-700 hover:bg-zinc-100";
        }
    };

    return (
        <Card className="overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((inv) => (
                        <TableRow key={inv.id}>
                            <TableCell className="font-medium text-zinc-900">{inv.title}</TableCell>
                            <TableCell>{new Date(inv.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge className={getStatusColor(inv.status)}>
                                    {inv.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right font-bold text-zinc-900">
                                {formatMoney(inv.amount)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
