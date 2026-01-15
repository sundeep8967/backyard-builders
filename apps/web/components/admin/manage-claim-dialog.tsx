import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { WarrantyClaim } from "@/lib/admin/projects";

interface ManageClaimDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    claim: WarrantyClaim | undefined;
    onSave: (updatedClaim: WarrantyClaim) => void;
}

export function ManageClaimDialog({ open, onOpenChange, claim, onSave }: ManageClaimDialogProps) {
    const [status, setStatus] = useState<WarrantyClaim["status"]>("Submitted");
    const [resolutionNotes, setResolutionNotes] = useState("");

    useEffect(() => {
        if (claim) {
            setStatus(claim.status);
            setResolutionNotes(claim.resolutionNotes || "");
        }
    }, [claim]);

    const handleSubmit = () => {
        if (!claim) return;

        onSave({
            ...claim,
            status,
            resolutionNotes
        });

        onOpenChange(false);
    };

    if (!claim) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage Claim</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="bg-zinc-50 p-3 rounded-md border text-sm space-y-2">
                        <div><span className="font-semibold">Issue:</span> {claim.title}</div>
                        <div><span className="font-semibold">Description:</span> {claim.description}</div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select value={status} onValueChange={(v) => setStatus(v as WarrantyClaim["status"])}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Submitted">Submitted Envelope</SelectItem>
                                <SelectItem value="In Review">In Review</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Repair Scheduled">Repair Scheduled</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Resolution Notes</Label>
                        <Textarea
                            placeholder="Add notes about the repair or decision..."
                            value={resolutionNotes}
                            onChange={(e) => setResolutionNotes(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update Claim</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
