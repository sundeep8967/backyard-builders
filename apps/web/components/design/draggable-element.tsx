"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { DesignElement } from "@/lib/design-elements";

interface DraggableElementProps {
    id: string;
    element: DesignElement;
    x: number;
    y: number;
}

export function DraggableElement({ id, element, x, y }: DraggableElementProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: { element, x, y },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        left: `${x}px`,
        top: `${y}px`,
        width: `${element.defaultWidth}px`,
        height: `${element.defaultHeight}px`,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="absolute flex cursor-move items-center justify-center rounded-lg border-2 border-zinc-700 bg-zinc-800 shadow-xl hover:border-white"
        >
            <span className="text-2xl">{element.icon}</span>
        </div>
    );
}
