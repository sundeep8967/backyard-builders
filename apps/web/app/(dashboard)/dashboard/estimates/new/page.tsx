"use client";

import { useState } from "react";
import { SERVICES, ServiceOption, calculatePrice } from "@/lib/services-pricing";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Plus,
    X,
    ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EstimateItem {
    service: ServiceOption;
    materialId: string;
    // New fields for Story 3.4
    colorId?: string;
    patternId?: string;
    size: number;
    price: number;
}

export default function NewEstimatePage() {
    const [step, setStep] = useState<"select" | "configure" | "summary">("select");
    const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
    const [selectedMaterial, setSelectedMaterial] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedPattern, setSelectedPattern] = useState<string>("");
    const [size, setSize] = useState<number>(0);
    const [cart, setCart] = useState<EstimateItem[]>([]);

    // Handle service selection
    const handleSelectService = (service: ServiceOption) => {
        setSelectedService(service);
        const firstMaterial = service.materials.find((m) => m.popular) || service.materials[0];
        setSelectedMaterial(firstMaterial.id);

        // Reset sub-options
        setSelectedColor("");
        setSelectedPattern("");

        setSize(service.defaultSize);
        setStep("configure");
    };

    // Handle add to cart
    const handleAddToCart = () => {
        if (!selectedService) return;

        const price = calculatePrice(selectedService, selectedMaterial, size);
        setCart([
            ...cart,
            {
                service: selectedService,
                materialId: selectedMaterial,
                colorId: selectedColor,
                patternId: selectedPattern,
                size,
                price: price.total,
            },
        ]);
        setSelectedService(null);
        setStep("select");
    };

    // Remove from cart
    const handleRemoveFromCart = (index: number) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal;

    // Current price preview
    const currentPrice = selectedService
        ? calculatePrice(selectedService, selectedMaterial, size, selectedColor, selectedPattern)
        : null;

    // Get current material object to check for colors/patterns
    const currentMaterialObj = selectedService?.materials.find(m => m.id === selectedMaterial);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Create Estimate</h1>
                    <p className="mt-1 text-zinc-400">
                        Select services and configure your outdoor project
                    </p>
                </div>
                {cart.length > 0 && (
                    <Button
                        onClick={() => setStep("summary")}
                        className="bg-white text-zinc-900 hover:bg-zinc-100"
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Review ({cart.length})
                    </Button>
                )}
            </div>

            {/* Service Selection */}
            {step === "select" && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => handleSelectService(service)}
                            className="group rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-left transition-all hover:border-zinc-600 hover:shadow-lg"
                        >
                            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg">
                                <Image
                                    src={service.image}
                                    alt={service.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-zinc-100">
                                {service.name}
                            </h3>
                            <p className="mt-2 text-sm text-zinc-400">{service.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-zinc-500">
                                    From ${service.basePrice.toLocaleString()}
                                    {service.priceUnit === "sqft" && "/sq ft"}
                                    {service.priceUnit === "linear_ft" && "/ft"}
                                </span>
                                <Plus className="h-5 w-5 text-zinc-500 group-hover:text-white" />
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Configuration */}
            {step === "configure" && selectedService && (
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left: Options */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Back Button */}
                        <button
                            onClick={() => setStep("select")}
                            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to services
                        </button>

                        {/* Breadcrumbs / Progress */}
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <span className="text-white">Service</span>
                            <span>/</span>
                            <span className="text-white">Configure</span>
                            <span>/</span>
                            <span>Review</span>
                        </div>

                        {/* Service Header */}
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                                <Image
                                    src={selectedService.image}
                                    alt={selectedService.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {selectedService.name}
                                </h2>
                                <p className="text-zinc-400">{selectedService.description}</p>
                            </div>
                        </div>

                        {/* Size Slider */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-white">Size</h3>
                                <span className="text-lg font-bold text-white">
                                    {size.toLocaleString()}{" "}
                                    {selectedService.priceUnit === "sqft"
                                        ? "sq ft"
                                        : selectedService.priceUnit === "linear_ft"
                                            ? "ft"
                                            : "units"}
                                </span>
                            </div>
                            <Slider
                                value={[size]}
                                onValueChange={([val]) => setSize(val)}
                                min={selectedService.minSize}
                                max={selectedService.maxSize}
                                step={selectedService.priceUnit === "fixed" ? 1 : 10}
                                className="mt-4"
                            />
                            <div className="mt-2 flex justify-between text-xs text-zinc-500">
                                <span>
                                    {selectedService.minSize.toLocaleString()}{" "}
                                    {selectedService.priceUnit === "sqft" ? "sq ft" : ""}
                                </span>
                                <span>
                                    {selectedService.maxSize.toLocaleString()}{" "}
                                    {selectedService.priceUnit === "sqft" ? "sq ft" : ""}
                                </span>
                            </div>
                        </div>

                        {/* Materials */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                            <h3 className="font-medium text-white">Material</h3>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {selectedService.materials.map((material) => (
                                    <button
                                        key={material.id}
                                        onClick={() => setSelectedMaterial(material.id)}
                                        className={`rounded-lg border p-4 text-left transition-all ${selectedMaterial === material.id
                                            ? "border-white bg-zinc-800"
                                            : "border-zinc-700 hover:border-zinc-600"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-white">
                                                        {material.name}
                                                    </span>
                                                    {material.popular && (
                                                        <Badge className="bg-green-500/20 text-green-400">
                                                            Popular
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-sm text-zinc-400">
                                                    {material.description}
                                                </p>
                                            </div>
                                            {selectedMaterial === material.id && (
                                                <Check className="h-5 w-5 text-green-400" />
                                            )}
                                        </div>
                                        <p className="mt-2 text-sm text-zinc-500">
                                            {material.priceModifier === 1
                                                ? "Base price"
                                                : `+${Math.round((material.priceModifier - 1) * 100)}%`}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colors (if available) */}
                        {currentMaterialObj?.colors && currentMaterialObj.colors.length > 0 && (
                            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                                <h3 className="font-medium text-white">Color</h3>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {currentMaterialObj.colors.map((color) => (
                                        <button
                                            key={color.id}
                                            onClick={() => setSelectedColor(color.id === selectedColor ? "" : color.id)}
                                            className={`group relative flex flex-col items-center gap-2 rounded-lg border p-3 transition-all ${selectedColor === color.id
                                                ? "border-white bg-zinc-800"
                                                : "border-zinc-700 hover:border-zinc-600"
                                                }`}
                                        >
                                            <div
                                                className="h-12 w-12 rounded-full border border-zinc-600 shadow-sm"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <span className="text-xs font-medium text-zinc-300">{color.name}</span>
                                            {selectedColor === color.id && (
                                                <div className="absolute right-1 top-1 rounded-full bg-white p-0.5">
                                                    <Check className="h-3 w-3 text-zinc-900" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Patterns (if available) */}
                        {currentMaterialObj?.patterns && currentMaterialObj.patterns.length > 0 && (
                            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                                <h3 className="font-medium text-white">Pattern</h3>
                                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {currentMaterialObj.patterns.map((pattern) => (
                                        <button
                                            key={pattern.id}
                                            onClick={() => setSelectedPattern(pattern.id === selectedPattern ? "" : pattern.id)}
                                            className={`relative rounded-lg border p-3 text-left transition-all ${selectedPattern === pattern.id
                                                ? "border-white bg-zinc-800"
                                                : "border-zinc-700 hover:border-zinc-600"
                                                }`}
                                        >
                                            <span className="font-medium text-zinc-300">{pattern.name}</span>
                                            {pattern.priceModifier > 0 && (
                                                <span className="ml-2 text-xs text-zinc-500">
                                                    +{Math.round(pattern.priceModifier * 100)}%
                                                </span>
                                            )}
                                            {selectedPattern === pattern.id && (
                                                <Check className="absolute right-3 top-3 h-4 w-4 text-white" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Price Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                            <h3 className="text-lg font-semibold text-white">
                                Price Estimate
                            </h3>

                            {currentPrice && (
                                <div className="mt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Base</span>
                                        <span className="text-white">
                                            ${currentPrice.base.toLocaleString()}
                                        </span>
                                    </div>
                                    {currentPrice.material > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Material upgrade</span>
                                            <span className="text-white">
                                                +${currentPrice.material.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                    {currentPrice.extras > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Extras (Color/Pattern)</span>
                                            <span className="text-white">
                                                +${currentPrice.extras.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="border-t border-zinc-700 pt-3">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-white">Estimated Total</span>
                                            <span className="text-2xl font-bold text-white">
                                                ${currentPrice.total.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={handleAddToCart}
                                className="mt-6 w-full bg-white text-zinc-900 hover:bg-zinc-100"
                            >
                                Add to Estimate
                            </Button>

                            <p className="mt-4 text-center text-xs text-zinc-500">
                                Final pricing may vary based on site conditions
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Summary */}
            {step === "summary" && (
                <div className="space-y-6">
                    {/* Back Button */}
                    <button
                        onClick={() => setStep("select")}
                        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Add more services
                    </button>

                    {/* Cart Items */}
                    <div className="space-y-4">
                        {cart.map((item, index) => {
                            const material = item.service.materials.find(
                                (m) => m.id === item.materialId
                            );
                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                                            <Image
                                                src={item.service.image}
                                                alt={item.service.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">
                                                {item.service.name}
                                            </h4>
                                            <p className="text-sm text-zinc-400">
                                                {material?.name} • {item.size.toLocaleString()}{" "}
                                                {item.service.priceUnit === "sqft" ? "sq ft" : "units"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-lg font-semibold text-white">
                                            ${item.price.toLocaleString()}
                                        </span>
                                        <button
                                            onClick={() => handleRemoveFromCart(index)}
                                            className="text-zinc-500 hover:text-red-400"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Totals */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Subtotal</span>
                                <span className="text-white">
                                    ${subtotal.toLocaleString()}
                                </span>
                            </div>
                            <div className="border-t border-zinc-700 pt-3">
                                <div className="flex justify-between">
                                    <span className="text-lg font-medium text-white">
                                        Estimated Total
                                    </span>
                                    <span className="text-2xl font-bold text-white">
                                        ${total.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            asChild
                            className="mt-6 w-full bg-white text-zinc-900 hover:bg-zinc-100"
                        >
                            <Link href="/dashboard/estimates">
                                Request Formal Quote
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <p className="mt-4 text-center text-xs text-zinc-500">
                            A project advisor will contact you within 24 hours to discuss your
                            project and provide a detailed proposal.
                        </p>
                    </div>
                </div>
            )}

            {/* Empty Cart Notice */}
            {step === "summary" && cart.length === 0 && (
                <div className="py-16 text-center">
                    <p className="text-zinc-500">No items in your estimate yet.</p>
                    <Button
                        onClick={() => setStep("select")}
                        variant="outline"
                        className="mt-4 border-zinc-700"
                    >
                        Add Services
                    </Button>
                </div>
            )}
        </div>
    );
}
