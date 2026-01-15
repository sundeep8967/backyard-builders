import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ChangeOrder } from "@/lib/admin/projects";

interface CreateChangeOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (co: Omit<ChangeOrder, "id" | "date" | "status" | "createdAt">) => void;
}

export function CreateChangeOrderDialog({ open, onOpenChange, onSave }: CreateChangeOrderDialogProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");

    const handleSubmit = () => {
        if (!title || !description || !cost) return;

        onSave({
            title,
            description,
            cost: parseFloat(cost)
        });

        // Reset
        setTitle("");
        setDescription("");
        setCost("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create Change Order</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input
                            placeholder="e.g. Additional Pavers"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Cost Impact ($)</Label>
                        <Input
                            type="number"
                            placeholder="1200"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                        <p className="text-xs text-zinc-500">Use negative values for credits.</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Description / Reason</Label>
                        <Textarea
                            placeholder="Explain why this change is needed..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create Change Order</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
