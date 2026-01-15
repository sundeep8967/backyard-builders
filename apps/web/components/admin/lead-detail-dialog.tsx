import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Lead, SiteConditions } from "@/lib/admin/leads";
import { useState, useEffect } from "react";

interface LeadDetailDialogProps {
    lead: Lead | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (leadId: string, conditions: SiteConditions) => void;
}

export function LeadDetailDialog({ lead, open, onOpenChange, onSave }: LeadDetailDialogProps) {
    const [access, setAccess] = useState<"good" | "limited" | "crane">("good");
    const [slope, setSlope] = useState<"flat" | "gentle" | "steep">("flat");
    const [notes, setNotes] = useState("");
    // Determine if we show Site Conditions form
    // Only for Scheduled or later, or just enable it always for ease of testing
    const showConditions = lead && (lead.status === 'scheduled' || lead.status === 'proposal' || lead.status === 'won');

    // Reset or load state when lead opens
    useEffect(() => {
        if (lead && lead.siteConditions) {
            setAccess(lead.siteConditions.access);
            setSlope(lead.siteConditions.slope);
            setNotes(lead.siteConditions.notes || "");
        } else {
            setAccess("good");
            setSlope("flat");
            setNotes("");
        }
    }, [lead]);

    const handleSave = () => {
        if (lead) {
            onSave(lead.id, { access, slope, notes });
            onOpenChange(false);
        }
    };

    if (!lead) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Lead Details: {lead.customerName}</DialogTitle>
                    <DialogDescription>
                        {lead.projectType} • Estimated Budget: ${lead.estBudget.toLocaleString()}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Lead Info */}
                    <div className="grid grid-cols-2 gap-4 rounded-lg bg-zinc-50 p-4 text-sm">
                        <div>
                            <span className="text-zinc-500">Email:</span>
                            <p className="font-medium">{lead.email}</p>
                        </div>
                        <div>
                            <span className="text-zinc-500">Phone:</span>
                            <p className="font-medium">{lead.phone}</p>
                        </div>
                        <div>
                            <span className="text-zinc-500">Status:</span>
                            <p className="font-medium capitalize">{lead.status}</p>
                        </div>
                        <div>
                            <span className="text-zinc-500">Scheduled:</span>
                            <p className="font-medium">
                                {lead.scheduledDate ? new Date(lead.scheduledDate).toLocaleDateString() : "Not scheduled"}
                            </p>
                        </div>
                    </div>

                    {/* Site Conditions Form */}
                    {showConditions && (
                        <div className="space-y-4 border-t pt-4">
                            <h3 className="font-semibold text-zinc-900">Site Conditions Verification</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Access</Label>
                                    <Select value={access} onValueChange={(v: any) => setAccess(v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select access" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="good">Good (Standard)</SelectItem>
                                            <SelectItem value="limited">Limited (Narrow Gate)</SelectItem>
                                            <SelectItem value="crane">Crane Needed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Slope</Label>
                                    <Select value={slope} onValueChange={(v: any) => setSlope(v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select slope" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="flat">Flat</SelectItem>
                                            <SelectItem value="gentle">Gentle Slope</SelectItem>
                                            <SelectItem value="steep">Steep / Retention Needed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label>Site Notes</Label>
                                <Textarea
                                    placeholder="Enter notes about tree removal, drainage, utilities..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    {lead.status === 'proposal' && (
                        <Button asChild variant="secondary">
                            <Link href="/dashboard/proposals/demo" target="_blank">
                                View Proposal
                            </Link>
                        </Button>
                    )}
                    {lead.status === 'scheduled' && (
                        <Button onClick={() => onSave(lead.id, { ...lead.siteConditions!, notes: (lead.siteConditions?.notes || "") + " [Proposal Generated]" })}>
                            Generate Contract
                        </Button>
                    )}
                    {lead.status === 'won' && (
                        <Button asChild className="bg-green-600 hover:bg-green-700">
                            <Link href={`/admin/projects/new-from-lead-${lead.id}`}>
                                Create Project
                            </Link>
                        </Button>
                    )}
                    {showConditions && (
                        <Button onClick={handleSave}>Save Conditions</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
