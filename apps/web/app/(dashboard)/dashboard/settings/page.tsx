export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
                <p className="mt-1 text-zinc-500">Manage your account and preferences.</p>
            </div>

            {/* Profile Section */}
            <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-zinc-900">Profile</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Your personal information and account settings.
                </p>
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700">Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            disabled
                            className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-zinc-500 cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-zinc-500">Email is managed by Google Sign-in</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
                <p className="mt-1 text-sm text-red-600/80">
                    Irreversible actions for your account.
                </p>
                <div className="mt-4">
                    <button className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors shadow-sm">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
