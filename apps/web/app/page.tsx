"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { motion } from "framer-motion";

export default function Home() {
  const { user, loading } = useAuth();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-6 py-4 lg:px-12 border-b border-zinc-100"
      >
        <span className="text-xl font-bold text-zinc-900">Backyard Builders</span>
        <div className="flex items-center gap-6">
          <Link
            href="/gallery"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Gallery
          </Link>
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
          ) : user ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Sign In
            </Link>
          )}
        </div>
      </motion.header>

      {/* Hero */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl"
        >
          Build Your Dream
          <span className="block text-zinc-500">Outdoor Space</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 max-w-xl text-lg text-zinc-600"
        >
          Get accurate estimates for patios, decks, pergolas, and more.
          Connect with trusted local contractors.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/get-started"
            className="rounded-lg bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="rounded-lg border border-zinc-200 px-8 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Features */}
      <section id="features" className="border-t border-zinc-100 bg-zinc-50 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-3xl font-bold text-zinc-900"
          >
            How It Works
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
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
              <motion.div
                key={feature.step}
                variants={fadeInUp}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-lg font-bold text-white">
                  {feature.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white px-6 py-8 text-center text-sm text-zinc-500">
        <p>© 2024 Backyard Builders. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/admin/login" className="text-zinc-400 hover:text-zinc-600 transition-colors text-xs">
            Admin Portal
          </Link>
        </div>
      </footer>
    </main>
  );
}
