export default function PropertiesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Properties</h1>
                    <p className="mt-1 text-zinc-400">Manage your properties here.</p>
                </div>
                <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors">
                    Add Property
                </button>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 py-16">
                <div className="rounded-full bg-zinc-800 p-4">
                    <svg
                        className="h-8 w-8 text-zinc-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">No properties yet</h3>
                <p className="mt-2 text-sm text-zinc-500">
                    Add your first property to get started with estimates.
                </p>
            </div>
        </div>
    );
}
