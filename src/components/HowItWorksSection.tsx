"use client";
import {Card, CardContent} from "@/src/components/ui/card";
import {BarChart3, Search, TrendingUp} from "lucide-react";
import React from "react";
import {useSearch} from "@/src/components/providers";

const HowItWorksSection = () => {
    const {results} = useSearch()
    if (results?.Title?.length) return <></>
    
    return (
        <div className="py-20 animate-reveal">
            <h2 className="mb-12 font-bold text-4xl text-center text-gradient">
                How It Works
            </h2>
            <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
                {[
                    {
                        step: "1. Search",
                        icon: Search,
                        title: "Find Your Need",
                        desc: "Enter your product name and select multiple West African cities to compare.",
                        color: "text-blue-500",
                        bg: "bg-blue-500/10"
                    },
                    {
                        step: "2. Analyze",
                        icon: BarChart3,
                        title: "Compare Prices",
                        desc: "Our engine fetches real-time data from Facebook Marketplace to show you the best value.",
                        color: "text-purple-500",
                        bg: "bg-purple-500/10"
                    },
                    {
                        step: "3. Save",
                        icon: TrendingUp,
                        title: "Greatest Value",
                        desc: "Connect directly with sellers and save up to 40% on your local purchases.",
                        color: "text-green-500",
                        bg: "bg-green-500/10"
                    }
                ].map((item, i) => (
                    <Card key={i} className="glass border-white/5 p-2 group hover:bg-white/5 transition-all">
                        <CardContent className="p-6 text-center">
                            <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                <item.icon className={`w-7 h-7 ${item.color}`} />
                            </div>
                            <h3 className="mb-3 font-bold text-xl">{item.step}</h3>
                            <p className="text-zinc-400 leading-relaxed italic mb-2 font-medium">{item.title}</p>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HowItWorksSection;

