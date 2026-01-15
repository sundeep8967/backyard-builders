import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { WarrantyClaim } from "@/lib/admin/projects";

interface SubmitClaimDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    warrantyId: string;
    onSave: (claim: Omit<WarrantyClaim, "id" | "status" | "createdAt" | "warrantyId">) => void;
}

export function SubmitClaimDialog({ open, onOpenChange, warrantyId, onSave }: SubmitClaimDialogProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (!title || !description) return;

        onSave({
            title,
            description
        });

        // Reset
        setTitle("");
        setDescription("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>File Warranty Claim</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <p className="text-sm text-zinc-500">
                        Submitting claim for Warranty ID: <span className="font-mono text-xs">{warrantyId}</span>
                    </p>
                    <div className="grid gap-2">
                        <Label>Issue Title</Label>
                        <Input
                            placeholder="e.g. Cracked Paver"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Describe the issue in detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit Claim</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
