export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="mt-1 text-zinc-400">Manage your account and preferences.</p>
            </div>

            {/* Profile Section */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-lg font-semibold text-white">Profile</h2>
                <p className="mt-1 text-sm text-zinc-400">
                    Your personal information and account settings.
                </p>
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300">Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-300">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            disabled
                            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-zinc-400 cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-zinc-500">Email is managed by Google Sign-in</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-lg border border-red-900/50 bg-zinc-950 p-6">
                <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
                <p className="mt-1 text-sm text-zinc-400">
                    Irreversible actions for your account.
                </p>
                <div className="mt-4">
                    <button className="rounded-lg border border-red-700 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900/20 transition-colors">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
