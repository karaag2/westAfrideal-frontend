import React from 'react'
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import { NavBar } from "@/src/components/ui/HomePage";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import Link from "next/link";
import { Zap } from "lucide-react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "WestAfrideal | Best Facebook Marketplace Deals in West Africa",
    description: "Compare prices and find the best deals on Facebook Marketplace across Abidjan, Dakar, Lagos, and more. Real-time search and analytics for West African shoppers.",
    keywords: ["Facebook Marketplace", "West Africa", "Price Comparison", "Abidjan deals", "Dakar marketplace", "Lagos deals", "WestAfrideal"],
    openGraph: {
        title: "WestAfrideal - Smart Marketplace Shopping",
        description: "Find the best deals across West African cities instantly.",
        type: "website",
        locale: "en_US",
        url: "https://westafrideal.com",
    }
};

import {Providers} from "@/src/components/providers";
import {Toaster} from "@/src/components/ui/sonner";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/10`}
            >
                <Providers>
                    <div className="relative min-h-screen flex flex-col">
                        {/* Header */}
                        <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-xl dark:bg-zinc-950/70">
                            <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center gap-2">
                                    <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                                        <div className="w-10 h-10 bg-linear-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                                            <Zap className="w-6 h-6 text-white fill-white" />
                                        </div>
                                        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">WestAfriDeal</span>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4">
                                    <NavBar />
                                    <ThemeToggle />
                                </div>
                            </div>
                        </header>

                        {/* Main Content */}
                        <main className="flex-1 flex flex-col pt-0">
                            {children}
                        </main>
                    </div>
                    <Toaster richColors position="top-right" />
                </Providers>
            </body>
        </html>
    );
}


