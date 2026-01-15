
import { getProperties } from "@/lib/customer/properties";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building, Home } from "lucide-react";
import Link from "next/link";

export default async function PropertiesPage() {
    const properties = await getProperties();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Properties</h1>
                    <p className="mt-1 text-zinc-400">Manage your properties here.</p>
                </div>
                <Button asChild className="bg-white text-zinc-900 hover:bg-zinc-200">
                    <Link href="/dashboard/properties/new">
                        Add Property
                    </Link>
                </Button>
            </div>

            {properties.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 py-16">
                    <div className="rounded-full bg-white p-4 shadow-sm border border-zinc-100">
                        <Home className="h-8 w-8 text-zinc-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-zinc-900">No properties yet</h3>
                    <p className="mt-2 text-sm text-zinc-500">
                        Add your first property to get started with estimates.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <Card key={property.id} className="border-zinc-200 bg-white shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-900">
                                    {property.nickname || "Property"}
                                </CardTitle>
                                {property.propertyType === 'commercial' ? <Building className="h-4 w-4 text-zinc-400" /> : <Home className="h-4 w-4 text-zinc-400" />}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-zinc-900 truncate">{property.streetAddress}</div>
                                <p className="text-xs text-zinc-500 flex items-center mt-1">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {property.city}, {property.state} {property.zipCode}
                                </p>
                                <div className="mt-4">
                                    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2">
                                        {property.propertyType.replace("_", " ")}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

