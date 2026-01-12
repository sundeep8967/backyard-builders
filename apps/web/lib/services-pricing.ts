// Services and pricing data for estimate wizard

export interface ServiceOption {
    id: string;
    name: string;
    description: string;
    image: string;
    basePrice: number;
    priceUnit: "sqft" | "linear_ft" | "fixed";
    minSize: number;
    maxSize: number;
    defaultSize: number;
    materials: MaterialOption[];
}

export interface MaterialOption {
    id: string;
    name: string;
    description: string;
    priceModifier: number; // Multiplier (1.0 = base, 1.5 = 50% more)
    popular?: boolean;
}

export interface SizeOption {
    label: string;
    value: number;
    recommended?: boolean;
}

export const SERVICES: ServiceOption[] = [
    {
        id: "patio",
        name: "Patio",
        description: "Stamped concrete or paver patios for outdoor living",
        image: "https://picsum.photos/seed/patio/800/600",
        basePrice: 15, // per sqft
        priceUnit: "sqft",
        minSize: 100,
        maxSize: 1000,
        defaultSize: 300,
        materials: [
            { id: "concrete", name: "Standard Concrete", description: "Durable and economical", priceModifier: 1.0 },
            { id: "stamped", name: "Stamped Concrete", description: "Decorative patterns", priceModifier: 1.4, popular: true },
            { id: "pavers", name: "Concrete Pavers", description: "Interlocking paver stones", priceModifier: 1.8 },
            { id: "travertine", name: "Travertine", description: "Premium natural stone", priceModifier: 2.5 },
        ],
    },
    {
        id: "deck",
        name: "Deck",
        description: "Wood or composite decking for elevated outdoor spaces",
        image: "https://picsum.photos/seed/deck/800/600",
        basePrice: 25, // per sqft
        priceUnit: "sqft",
        minSize: 100,
        maxSize: 800,
        defaultSize: 250,
        materials: [
            { id: "pressure_treated", name: "Pressure-Treated Wood", description: "Budget-friendly option", priceModifier: 1.0 },
            { id: "cedar", name: "Cedar", description: "Natural beauty, naturally resistant", priceModifier: 1.5 },
            { id: "composite", name: "Composite", description: "Low maintenance, long lasting", priceModifier: 2.0, popular: true },
            { id: "ipe", name: "Ipe Hardwood", description: "Premium exotic hardwood", priceModifier: 3.0 },
        ],
    },
    {
        id: "pergola",
        name: "Pergola",
        description: "Shade structures for patios and outdoor areas",
        image: "https://picsum.photos/seed/pergola/800/600",
        basePrice: 3500, // base price for small
        priceUnit: "fixed",
        minSize: 100,
        maxSize: 400,
        defaultSize: 150,
        materials: [
            { id: "wood", name: "Wood", description: "Traditional look", priceModifier: 1.0 },
            { id: "aluminum", name: "Aluminum", description: "Modern, maintenance-free", priceModifier: 1.3, popular: true },
            { id: "vinyl", name: "Vinyl", description: "Weather resistant", priceModifier: 1.2 },
            { id: "louvered", name: "Motorized Louvers", description: "Adjustable sun control", priceModifier: 3.0 },
        ],
    },
    {
        id: "outdoor_kitchen",
        name: "Outdoor Kitchen",
        description: "Built-in grills, counters, and cooking stations",
        image: "https://picsum.photos/seed/kitchen/800/600",
        basePrice: 8000, // base price
        priceUnit: "fixed",
        minSize: 1,
        maxSize: 5,
        defaultSize: 2,
        materials: [
            { id: "basic", name: "Basic Package", description: "Grill + counter", priceModifier: 1.0 },
            { id: "standard", name: "Standard Package", description: "Grill + counter + sink", priceModifier: 1.5, popular: true },
            { id: "premium", name: "Premium Package", description: "Full kitchen with appliances", priceModifier: 2.5 },
            { id: "ultimate", name: "Ultimate Package", description: "Pizza oven, bar, refrigeration", priceModifier: 4.0 },
        ],
    },
    {
        id: "fire_pit",
        name: "Fire Pit",
        description: "Gathering spots with gas or wood-burning fire features",
        image: "https://picsum.photos/seed/firepit/800/600",
        basePrice: 2500,
        priceUnit: "fixed",
        minSize: 1,
        maxSize: 3,
        defaultSize: 1,
        materials: [
            { id: "basic", name: "Basic", description: "Simple fire ring", priceModifier: 1.0 },
            { id: "gas", name: "Gas Fire Pit", description: "Convenient push-button start", priceModifier: 1.8, popular: true },
            { id: "table", name: "Fire Table", description: "Tabletop fire feature", priceModifier: 2.2 },
            { id: "custom", name: "Custom Fireplace", description: "Full outdoor fireplace", priceModifier: 4.0 },
        ],
    },
    {
        id: "landscape",
        name: "Landscaping",
        description: "Desert-friendly plants, hardscape, and irrigation",
        image: "https://picsum.photos/seed/landscape/800/600",
        basePrice: 8, // per sqft
        priceUnit: "sqft",
        minSize: 200,
        maxSize: 2000,
        defaultSize: 500,
        materials: [
            { id: "basic", name: "Basic", description: "DG and minimal plants", priceModifier: 1.0 },
            { id: "enhanced", name: "Enhanced", description: "Boulders, varied plants", priceModifier: 1.5, popular: true },
            { id: "premium", name: "Premium", description: "Full design with lighting", priceModifier: 2.2 },
            { id: "resort", name: "Resort Style", description: "Luxury landscape design", priceModifier: 3.5 },
        ],
    },
];

export function calculatePrice(
    service: ServiceOption,
    materialId: string,
    size: number
): { base: number; material: number; total: number; breakdown: string } {
    const material = service.materials.find((m) => m.id === materialId) || service.materials[0];

    let base: number;
    let sizeLabel: string;

    if (service.priceUnit === "sqft") {
        base = service.basePrice * size;
        sizeLabel = `${size} sq ft × $${service.basePrice}/sq ft`;
    } else if (service.priceUnit === "linear_ft") {
        base = service.basePrice * size;
        sizeLabel = `${size} linear ft × $${service.basePrice}/ft`;
    } else {
        // Fixed price with size multiplier
        const sizeMultiplier = 1 + (size - service.minSize) / (service.maxSize - service.minSize);
        base = service.basePrice * sizeMultiplier;
        sizeLabel = `Size factor: ${sizeMultiplier.toFixed(2)}x`;
    }

    const materialCost = base * (material.priceModifier - 1);
    const total = base * material.priceModifier;

    return {
        base: Math.round(base),
        material: Math.round(materialCost),
        total: Math.round(total),
        breakdown: sizeLabel,
    };
}
