"use client";

import { useDraggable } from "@dnd-kit/core";
import { DesignElement } from "@/lib/design-elements";

export function SidebarItem({ element }: { element: DesignElement }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `sidebar-${element.id}`,
        data: { element, type: "sidebar" },
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            zIndex: 1000,
        }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="flex cursor-grab items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 p-3 hover:border-zinc-500 hover:bg-zinc-750"
        >
            <span className="text-2xl">{element.icon}</span>
            <div>
                <p className="text-sm font-medium text-white">{element.name}</p>
                <p className="text-xs text-zinc-400">
                    {element.defaultWidth}x{element.defaultHeight}cm
                </p>
            </div>
        </div>
    );
}
