"use client";
import React from "react";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";

const sections = [
    { name: "Marketplace", href: "/LookForProduct" },
    { name: "Pricing", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Login", href: "/login", secondary: true },
    { name: "Get Started", href: "/signup", primary: true },
];

export const NavBar = () => {
    return (
        <nav className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 mr-4">
                {sections.filter(s => !s.primary && !s.secondary).map((section) => (
                    <li key={section.name}>
                        <Link 
                            href={section.href} 
                            className="text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            {section.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
                {sections.filter(s => s.secondary).map(s => (
                    <Link key={s.name} href={s.href}>
                        <Button variant="ghost" className="font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 px-6">
                            {s.name}
                        </Button>
                    </Link>
                ))}
                {sections.filter(s => s.primary).map(s => (
                    <Link key={s.name} href={s.href}>
                        <Button className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-8 rounded-xl font-bold h-11">
                            {s.name}
                        </Button>
                    </Link>
                ))}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-slate-900 dark:text-white">
                            <BiMenu className="w-7 h-7" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-white dark:bg-zinc-950 border-l border-slate-100 dark:border-white/5 p-0">
                        <SheetHeader className="p-8 border-b border-slate-50 dark:border-white/5">
                            <SheetTitle className="text-left text-slate-900 dark:text-white font-black text-2xl">Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-6 p-8">
                            {sections.map((section) => (
                                <Link 
                                    key={section.name} 
                                    href={section.href}
                                    className="text-xl font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                                >
                                    {section.name}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};


