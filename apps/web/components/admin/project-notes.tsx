import { ProjectNote } from "@/lib/admin/projects";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Lock, Globe } from "lucide-react";
import { useState } from "react";

interface ProjectNotesProps {
    notes: ProjectNote[] | undefined;
    onSaveNote: (content: string, isInternal: boolean) => void;
}

export function ProjectNotes({ notes, onSaveNote }: ProjectNotesProps) {
    const [content, setContent] = useState("");
    const [isInternal, setIsInternal] = useState(true);

    const handleSave = () => {
        if (!content.trim()) return;
        onSaveNote(content, isInternal);
        setContent("");
    };

    return (
        <Card className="h-[500px] flex flex-col">
            <CardHeader>
                <CardTitle>Project Notes</CardTitle>
                <CardDescription>Private team notes & shared info</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                        {!notes || notes.length === 0 ? (
                            <p className="text-center text-sm text-zinc-500 py-10">No notes yet.</p>
                        ) : (
                            notes.map((note) => (
                                <div
                                    key={note.id}
                                    className={`p-3 rounded-lg border ${note.isInternal ? "bg-amber-50 border-amber-200" : "bg-zinc-50 border-zinc-200"}`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {note.isInternal ? (
                                                <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 gap-1">
                                                    <Lock className="h-3 w-3" /> Internal
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200 gap-1">
                                                    <Globe className="h-3 w-3" /> Shared
                                                </Badge>
                                            )}
                                            <span className="text-xs text-zinc-400">
                                                {new Date(note.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-zinc-700 whitespace-pre-wrap">{note.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t flex-col gap-3">
                <Textarea
                    placeholder="Add a note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[80px]"
                />
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Switch id="internal-mode" checked={isInternal} onCheckedChange={setIsInternal} />
                        <Label htmlFor="internal-mode" className="text-sm text-zinc-600">
                            {isInternal ? "Internal Only" : "Shared with Client"}
                        </Label>
                    </div>
                    <Button onClick={handleSave} size="sm">Save Note</Button>
                </div>
            </CardFooter>
        </Card>
    );
}
