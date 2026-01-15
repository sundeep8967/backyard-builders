"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 lg:px-12">
        <span className="text-xl font-bold text-white">Backyard Builders</span>
        <div className="flex items-center gap-6">
          <Link
            href="/gallery"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Gallery
          </Link>
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
          ) : user ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Build Your Dream
          <span className="block text-zinc-500">Outdoor Space</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          Get accurate estimates for patios, decks, pergolas, and more.
          Connect with trusted local contractors.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/get-started"
            className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="border-t border-zinc-800 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white">How It Works</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Add Your Property",
                description: "Enter your address and property details to get started.",
              },
              {
                step: "2",
                title: "Request Estimates",
                description: "Tell us what you want to build and we'll calculate costs.",
              },
              {
                step: "3",
                title: "Connect & Build",
                description: "Work with verified contractors to bring your vision to life.",
              },
            ].map((feature) => (
              <div
                key={feature.step}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-zinc-900">
                  {feature.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-sm text-zinc-500">
        <p>© 2024 Backyard Builders. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/admin/login" className="text-zinc-700 hover:text-zinc-500 transition-colors text-xs">
            Admin Portal
          </Link>
        </div>
      </footer>
    </main>
  );
}
