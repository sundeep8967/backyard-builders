"use client";

import { useState, useRef, useEffect } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    useDroppable,
    pointerWithin,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DESIGN_ELEMENTS, DesignElement } from "@/lib/design-elements";
import { DraggableElement } from "@/components/design/draggable-element";
import { SidebarItem } from "@/components/design/sidebar-item";
import { Button } from "@/components/ui/button";
import { Save, Trash2, RotateCcw } from "lucide-react";

interface CanvasItem {
    id: string;
    elementId: string;
    x: number;
    y: number;
}

export default function DesignCenterPage() {
    const [items, setItems] = useState<CanvasItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeElement, setActiveElement] = useState<DesignElement | null>(null);

    // Droppable canvas area
    const { setNodeRef: setCanvasRef } = useDroppable({
        id: "canvas",
    });

    // Load state from sessionStorage
    useEffect(() => {
        const saved = sessionStorage.getItem("design_canvas");
        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);

    // Save state
    const handleSave = () => {
        sessionStorage.setItem("design_canvas", JSON.stringify(items));
        alert("Design saved successfully!");
    };

    const handleClear = () => {
        if (confirm("Clear canvas?")) {
            setItems([]);
            sessionStorage.removeItem("design_canvas");
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as string);

        // If dragging from sidebar
        if (active.id.toString().startsWith("sidebar-")) {
            const element = active.data.current?.element as DesignElement;
            setActiveElement(element);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over, delta } = event;
        setActiveId(null);
        setActiveElement(null);

        // Dropped on canvas
        if (over && over.id === "canvas") {
            // New item from sidebar
            if (active.id.toString().startsWith("sidebar-")) {
                const element = active.data.current?.element as DesignElement;
                if (element) {
                    // Adjust coordinates to be relative to canvas
                    // Simplified for MVP - centering on drop
                    const newItem: CanvasItem = {
                        id: `item-${Date.now()}`,
                        elementId: element.id,
                        x: Math.max(0, 100 + delta.x), // Offset from sidebar start
                        y: Math.max(0, 100 + delta.y),
                    };
                    setItems((prev) => [...prev, newItem]);
                }
            }
            // Moving existing item
            else {
                setItems((prev) =>
                    prev.map((item) => {
                        if (item.id === active.id) {
                            return {
                                ...item,
                                x: item.x + delta.x,
                                y: item.y + delta.y,
                            };
                        }
                        return item;
                    })
                );
            }
        }
    };

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={pointerWithin}
            modifiers={[restrictToWindowEdges]}
        >
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-zinc-950">
                {/* Sidebar */}
                <div className="w-80 overflow-y-auto border-r border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="mb-4 text-lg font-bold text-white">Elements</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-3 text-sm font-medium text-zinc-400">Furniture</h3>
                            <div className="grid gap-3">
                                {DESIGN_ELEMENTS.filter((e) => e.type === "furniture").map((e) => (
                                    <SidebarItem key={e.id} element={e} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-3 text-sm font-medium text-zinc-400">Features</h3>
                            <div className="grid gap-3">
                                {DESIGN_ELEMENTS.filter((e) => e.type === "feature").map((e) => (
                                    <SidebarItem key={e.id} element={e} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-3 text-sm font-medium text-zinc-400">Hardscape</h3>
                            <div className="grid gap-3">
                                {DESIGN_ELEMENTS.filter((e) => e.type === "hardscape").map((e) => (
                                    <SidebarItem key={e.id} element={e} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="relative flex-1 bg-zinc-950 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px]">
                    {/* Toolbar */}
                    <div className="absolute left-4 top-4 z-10 flex gap-2">
                        <Button
                            onClick={handleSave}
                            className="bg-white text-zinc-900 hover:bg-zinc-100"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Save Design
                        </Button>
                        <Button
                            onClick={handleClear}
                            variant="outline"
                            className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Clear
                        </Button>
                    </div>

                    {/* Droppable Zone */}
                    <div
                        ref={setCanvasRef}
                        className="h-full w-full"
                    >
                        {items.map((item) => {
                            const element = DESIGN_ELEMENTS.find((e) => e.id === item.elementId);
                            if (!element) return null;
                            return (
                                <DraggableElement
                                    key={item.id}
                                    id={item.id}
                                    element={element}
                                    x={item.x}
                                    y={item.y}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Drag Overlay */}
            <DragOverlay>
                {activeId && activeElement ? (
                    <div className="flex cursor-grabbing items-center justify-center rounded-lg border-2 border-white bg-zinc-800 opacity-80 shadow-2xl"
                        style={{
                            width: activeElement.defaultWidth,
                            height: activeElement.defaultHeight
                        }}
                    >
                        <span className="text-2xl">{activeElement.icon}</span>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
