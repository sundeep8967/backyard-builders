// Sample projects for the gallery
// Replace with real data from Supabase later

export type ProjectType =
    | "patio"
    | "deck"
    | "pergola"
    | "outdoor_kitchen"
    | "pool"
    | "landscape";

export interface Project {
    id: string;
    title: string;
    description: string;
    type: ProjectType;
    image: string;
    location: string;
    completedDate: string;
    features: string[];
}

export const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
    { value: "patio", label: "Patios" },
    { value: "deck", label: "Decks" },
    { value: "pergola", label: "Pergolas" },
    { value: "outdoor_kitchen", label: "Outdoor Kitchens" },
    { value: "pool", label: "Pools" },
    { value: "landscape", label: "Landscaping" },
];

// Placeholder images using picsum.photos
const getPlaceholderImage = (seed: number) =>
    `https://picsum.photos/seed/${seed}/800/600`;

export const SAMPLE_PROJECTS: Project[] = [
    {
        id: "1",
        title: "Modern Desert Patio",
        description:
            "A stunning modern patio with clean lines, integrated lighting, and native desert landscaping.",
        type: "patio",
        image: getPlaceholderImage(101),
        location: "Scottsdale, AZ",
        completedDate: "2024-06",
        features: ["Stamped concrete", "LED lighting", "Fire pit", "Native plants"],
    },
    {
        id: "2",
        title: "Elevated Composite Deck",
        description:
            "Two-level composite deck with built-in seating and shade structure.",
        type: "deck",
        image: getPlaceholderImage(102),
        location: "Phoenix, AZ",
        completedDate: "2024-05",
        features: ["Composite decking", "Built-in benches", "Shade sail", "Railing"],
    },
    {
        id: "3",
        title: "Luxury Pergola Retreat",
        description:
            "Custom cedar pergola with motorized louvers and ambient lighting.",
        type: "pergola",
        image: getPlaceholderImage(103),
        location: "Tempe, AZ",
        completedDate: "2024-04",
        features: ["Cedar construction", "Motorized louvers", "String lights", "Fans"],
    },
    {
        id: "4",
        title: "Full Outdoor Kitchen",
        description:
            "Complete outdoor kitchen with grill station, bar seating, and pizza oven.",
        type: "outdoor_kitchen",
        image: getPlaceholderImage(104),
        location: "Gilbert, AZ",
        completedDate: "2024-03",
        features: ["Built-in grill", "Pizza oven", "Bar counter", "Refrigerator"],
    },
    {
        id: "5",
        title: "Resort-Style Pool",
        description:
            "Freeform pool with raised spa, water features, and travertine decking.",
        type: "pool",
        image: getPlaceholderImage(105),
        location: "Chandler, AZ",
        completedDate: "2024-02",
        features: ["Raised spa", "Waterfall", "Travertine deck", "LED pool lights"],
    },
    {
        id: "6",
        title: "Desert Landscape Design",
        description:
            "Low-maintenance desert landscape with decomposed granite, boulders, and succulents.",
        type: "landscape",
        image: getPlaceholderImage(106),
        location: "Mesa, AZ",
        completedDate: "2024-01",
        features: ["DG pathways", "Boulder accents", "Succulents", "Drip irrigation"],
    },
    {
        id: "7",
        title: "Travertine Patio Extension",
        description:
            "Seamless patio extension with travertine pavers and integrated planter boxes.",
        type: "patio",
        image: getPlaceholderImage(107),
        location: "Paradise Valley, AZ",
        completedDate: "2023-12",
        features: ["Travertine pavers", "Planters", "Outdoor fireplace", "Seating wall"],
    },
    {
        id: "8",
        title: "Multi-Level Deck System",
        description:
            "Connected deck system with dining area, lounge space, and hot tub platform.",
        type: "deck",
        image: getPlaceholderImage(108),
        location: "Fountain Hills, AZ",
        completedDate: "2023-11",
        features: ["Multiple levels", "Hot tub platform", "Privacy screens", "Stairs"],
    },
];
