"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Zap, Globe, Search, Database, Cpu } from "lucide-react";
import { cn } from "@/src/lib/utils";

const MESSAGES = [
    { text: "Initializing Deep Scraper...", icon: Cpu },
    { text: "Scanning West African Marketplaces...", icon: Globe },
    { text: "Filtering out suspicious listings...", icon: ShieldCheck },
    { text: "Verifying seller credibility scores...", icon: Zap },
    { text: "Aggregating real-time pricing data...", icon: Database },
    { text: "Identifying hidden high-value deals...", icon: Search },
    { text: "Optimizing results for your budget...", icon: Zap },
    { text: "Finalizing market intelligence report...", icon: ShieldCheck },
];

export default function PsychologicalLoader() {
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const msgInterval = setInterval(() => {
            setIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 2500);

        const progInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 0;
                return prev + 1;
            });
        }, 100);

        return () => {
            clearInterval(msgInterval);
            clearInterval(progInterval);
        };
    }, []);

    const CurrentIcon = MESSAGES[index].icon;

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 space-y-12 animate-in fade-in duration-700">
            {/* Main Visual */}
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] animate-pulse rounded-full" />
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <Loader2 className="w-full h-full text-primary animate-spin-slow opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CurrentIcon className="w-12 h-12 text-primary animate-bounce-subtle" />
                    </div>
                </div>
            </div>

            {/* Dynamic Messaging */}
            <div className="text-center space-y-6 max-w-sm">
                <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                        {MESSAGES[index].text}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                            System Active: Phase {index + 1}
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200/50 dark:border-white/5">
                    <div 
                        className="h-full bg-linear-to-r from-primary to-blue-600 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
                    Average verification time: 1.2s per listing
                </p>
            </div>
        </div>
    );
}
