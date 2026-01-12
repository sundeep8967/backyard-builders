export interface DesignElement {
    id: string;
    type: "furniture" | "plant" | "hardscape" | "feature";
    name: string;
    icon: string;
    defaultWidth: number;
    defaultHeight: number;
}

export const DESIGN_ELEMENTS: DesignElement[] = [
    // Furniture
    { id: "chair", type: "furniture", name: "Patio Chair", icon: "🪑", defaultWidth: 60, defaultHeight: 60 },
    { id: "table-round", type: "furniture", name: "Round Table", icon: "⭕", defaultWidth: 100, defaultHeight: 100 },
    { id: "table-rect", type: "furniture", name: "Dining Table", icon: "▭", defaultWidth: 160, defaultHeight: 90 },
    { id: "lounger", type: "furniture", name: "Sun Lounger", icon: "🏖️", defaultWidth: 80, defaultHeight: 200 },

    // Features
    { id: "grill", type: "feature", name: "Grill Station", icon: "🍳", defaultWidth: 120, defaultHeight: 80 },
    { id: "firepit", type: "feature", name: "Fire Pit", icon: "🔥", defaultWidth: 100, defaultHeight: 100 },
    { id: "planter", type: "plant", name: "Large Planter", icon: "🪴", defaultWidth: 50, defaultHeight: 50 },

    // Hardscape
    { id: "paver-area", type: "hardscape", name: "Paver Patio", icon: "⬜", defaultWidth: 400, defaultHeight: 300 },
];
