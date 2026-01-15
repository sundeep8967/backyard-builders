"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SERVICES } from "@/lib/services-pricing";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProposalPage() {
    const searchParams = useSearchParams();
    const [items, setItems] = useState<any[]>([]);
    const [signedName, setSignedName] = useState("");
    const [isSigned, setIsSigned] = useState(false);

    // In a real app, we'd fetch the proposal by ID.
    // For this demo, we'll try to hydrate from sessionStorage if available,
    // or fall back to a mock demo proposal if accessed directly.
    useEffect(() => {
        // Attempt to load 'cart' from storage to simulate dynamic proposal generation
        const savedCart = sessionStorage.getItem("estimate_cart");
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        } else {
            // Fallback Demo Data
            const patio = SERVICES.find(s => s.id === "patio")!;
            const firepit = SERVICES.find(s => s.id === "fire_pit")!;

            setItems([
                {
                    service: patio,
                    materialId: "pavers",
                    size: 400,
                    price: 8500,
                    colorId: "grey",
                    patternId: "herringbone"
                },
                {
                    service: firepit,
                    materialId: "gas",
                    size: 1,
                    price: 4500
                }
            ]);
        }
    }, []);

    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * 0.08; // 8% mock tax
    const total = subtotal + tax;
    const deposit = total * 0.5;

    const handlePrint = () => {
        window.print();
    };

    const handleSign = () => {
        setIsSigned(true);
    };

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 print:bg-white">
            {/* Print Controls (Hidden when printing) */}
            <div className="border-b border-zinc-200 bg-white px-8 py-4 print:hidden">
                <div className="mx-auto flex max-w-4xl items-center justify-between">
                    <Link
                        href="/dashboard/estimates"
                        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Estimates
                    </Link>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                        </Button>
                        {!isSigned && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
                                        Accept & Sign
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Accept Proposal</DialogTitle>
                                        <DialogDescription>
                                            By signing below, you agree to the terms and conditions of this proposal
                                            and authorize the deposit payment of ${deposit.toLocaleString()}.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                value={signedName}
                                                onChange={(e) => setSignedName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleSign} disabled={!signedName}>
                                            Sign & Pay Deposit
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
            </div>

            {/* Proposal Sheet */}
            <div className="mx-auto max-w-4xl p-8 print:p-0">
                <div className="min-h-[1100px] bg-white p-12 shadow-lg print:min-h-0 print:shadow-none">
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-zinc-100 pb-12">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                                Backyard Builders
                            </h1>
                            <p className="mt-2 text-sm text-zinc-500">
                                123 Construction Ave<br />
                                Phoenix, AZ 85001<br />
                                (555) 123-4567
                            </p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-semibold text-zinc-900">Proposal</h2>
                            <p className="text-sm text-zinc-500">#PRO-2024-001</p>
                            <p className="text-sm text-zinc-500">Date: {new Date().toLocaleDateString()}</p>
                            {isSigned && (
                                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                    <Check className="h-4 w-4" />
                                    Signed & Accepted
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Client Info (Mock) */}
                    <div className="py-12">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Prepared For</h3>
                        <p className="mt-2 text-lg font-medium text-zinc-900">Valued Customer</p>
                        <p className="text-zinc-500">1234 Dream Home Lane</p>
                    </div>

                    {/* Line Items */}
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-zinc-200">
                                <th className="pb-4 text-sm font-medium text-zinc-500">Description</th>
                                <th className="pb-4 text-right text-sm font-medium text-zinc-500">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {items.map((item, i) => {
                                const material = item.service.materials.find((m: any) => m.id === item.materialId);
                                const color = material?.colors?.find((c: any) => c.id === item.colorId);
                                const pattern = material?.patterns?.find((p: any) => p.id === item.patternId);

                                return (
                                    <tr key={i}>
                                        <td className="py-6">
                                            <div className="font-medium text-zinc-900">{item.service.name}</div>
                                            <div className="text-sm text-zinc-500">
                                                {item.size.toLocaleString()} {item.service.priceUnit === 'sqft' ? 'sq ft' : 'units'} • {material?.name}
                                                {color && ` • Color: ${color.name}`}
                                                {pattern && ` • Pattern: ${pattern.name}`}
                                            </div>
                                        </td>
                                        <td className="py-6 text-right font-mono text-zinc-600">
                                            ${item.price.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="mt-8 flex justify-end border-t border-zinc-100 pt-8">
                        <div className="w-64 space-y-3">
                            <div className="flex justify-between text-sm text-zinc-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-zinc-600">
                                <span>Tax (8%)</span>
                                <span>${tax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-t border-zinc-200 pt-3 text-lg font-bold text-zinc-900">
                                <span>Total</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-t border-zinc-200 pt-3 text-sm font-medium text-zinc-900">
                                <span>Deposit Required (50%)</span>
                                <span>${deposit.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="mt-24 border-t border-zinc-200 pt-8 text-sm text-zinc-500">
                        <h4 className="font-semibold text-zinc-900">Terms & Conditions</h4>
                        <p className="mt-2">
                            1. This proposal is valid for 30 days from the date above.
                            <br />
                            2. 50% deposit required to schedule work. Remaining 50% due upon completion.
                            <br />
                            3. Final price subject to on-site verification of measurements and access.
                        </p>
                    </div>

                    {/* Signature Block (Visual) */}
                    {isSigned && (
                        <div className="mt-12 border-t border-zinc-200 pt-8">
                            <p className="font-dancing-script text-3xl text-zinc-900">{signedName}</p>
                            <p className="mt-1 border-t border-zinc-400 pt-1 text-xs uppercase text-zinc-500 max-w-[200px]">
                                Electronically Signed • {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
