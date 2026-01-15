import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { RFI } from "@/lib/admin/projects";

interface CreateRFIDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (rfi: Omit<RFI, "id" | "status" | "createdAt">) => void;
}

export function CreateRFIDialog({ open, onOpenChange, onSave }: CreateRFIDialogProps) {
    const [question, setQuestion] = useState("");
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

    const handleSubmit = () => {
        if (!question) return;

        onSave({
            question,
            dueDate: dueDate ? dueDate.toISOString() : undefined,
        });

        // Reset
        setQuestion("");
        setDueDate(undefined);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create RFI</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Question</Label>
                        <Input
                            placeholder="e.g. Which tile color for the backsplash?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Due Date (Optional)</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !dueDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={dueDate}
                                    onSelect={setDueDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create RFI</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
