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
        <span className="text-xl font-bold tracking-tight text-zinc-900">Dream Home Constructors</span>
        <div className="flex items-center gap-6">
          <Link
            href="/gallery"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Showcase
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
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900"
        >
          Master-Crafted Custom Homes
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-5xl font-bold tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl"
        >
          Building Your Vision,
          <span className="block text-zinc-500">From the Ground Up.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-8 max-w-2xl text-lg sm:text-xl text-zinc-600 leading-relaxed"
        >
          Precision-engineered custom homes and architectural transformations.
          Manage your entire build with complete transparency and real-time clarity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/get-started"
            className="rounded-lg bg-zinc-900 px-10 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 hover:scale-105"
          >
            Start Your Project
          </Link>
          <Link
            href="#features"
            className="rounded-lg border border-zinc-200 px-10 py-4 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50"
          >
            Our Approach
          </Link>
        </motion.div>
      </div>

      {/* Expertise Section */}
      <section className="bg-white px-6 py-24 lg:px-12 border-t border-zinc-100">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 sm:text-4xl">Architecture, Engineering, and Craftsmanship.</h2>
              <p className="mt-6 text-lg text-zinc-600">
                We don't just build structures; we create environments. Our platform integrates advanced
                logistics with traditional artistry to deliver projects that stand the test of time.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Full-Scale Custom Residential",
                  "Architectural Home Additions",
                  "Complete Site Development & Planning",
                  "Interior Structural Re-engineering"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-900 font-medium">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-zinc-100 aspect-square lg:aspect-video flex items-center justify-center overflow-hidden border border-zinc-200">
              <div className="text-zinc-400 font-medium">Craftsmanship in every detail</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-zinc-100 bg-zinc-50 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 sm:text-4xl">The Execution Engine</h2>
            <p className="mt-4 text-zinc-600">Experience a project management process built for professional results.</p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                step: "01",
                title: "Strategic Planning",
                description: "Digital property mapping and full-scale architectural feasibility analysis.",
              },
              {
                step: "02",
                title: "Precision Estimates",
                description: "Exact material takeoffs and transparent, itemized pricing for every component.",
              },
              {
                step: "03",
                title: "Managed Build",
                description: "Real-time communication, daily logs, and milestone tracking through to completion.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.step}
                variants={fadeInUp}
                className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
              >
                <div className="text-xs font-bold tracking-widest text-zinc-400 group-hover:text-zinc-900 transition-colors">
                  {feature.step}
                </div>
                <h3 className="mt-4 text-xl font-bold text-zinc-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-zinc-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-zinc-900">Dream Home Constructors</span>
            <p className="mt-2 text-sm text-zinc-500">© 2024 Dream Home Constructors. Built for professional precision.</p>
          </div>
          <div className="flex gap-8">
            <Link href="/gallery" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Showcase</Link>
            <Link href="/admin/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
