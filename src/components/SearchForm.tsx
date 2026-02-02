"use client";

import { Search, MapPin, X, Zap, Loader2, Filter, Info, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useSearch } from "./providers";
import { Button } from "./ui/button";
import { cn } from "@/src/lib/utils";
import { toast } from "@/src/components/ui/sonner";

interface SearchFormProps {
    defaultQuery?: string;
    className?: string;
}

const AVAILABLE_CITIES = [
    "maradi", "agadez", "niamey", "tahoua", "zinder", "dosso", "konni", "arlit", "diffa",
    "lomé", "lome", "kara", "sokodé", "sokode", "dapaong", "kpalimé", "kpalime",
    "abidjan", "yamoussoukro", "bouaké", "bouake", "khorgo"
];

const QUICK_FILTERS = [
    { label: "iPhone", query: "iphone" },
    { label: "Macbook", query: "macbook" },
    { label: "Toyota", query: "toyota" },
    { label: "PlayStation", query: "ps5" },
    { label: "Fridge", query: "frigo" },
    { label: "Apartment", query: "appartement" }
];

export default function SearchForm({
    defaultQuery = "",
    className
}: SearchFormProps) {
    const [query, setQuery] = useState(defaultQuery);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [cityInput, setCityInput] = useState("");
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const { performSearch, logging } = useSearch();


    const fetchData = async (overrideQuery?: string) => {
        const activeQuery = overrideQuery ?? query;
        if (!activeQuery.trim()) return;
        
        await performSearch({
            q: activeQuery,
            location: selectedCities,
            minPrice,
            maxPrice
        });
    };

    const handleQuickFilter = (q: string) => {
        setQuery(q);
        fetchData(q);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData();
    };

    const addCity = (city: string) => {
        if (!selectedCities.includes(city)) {
            setSelectedCities([...selectedCities, city]);
        }
        setCityInput("");
        setShowCityDropdown(false);
    };

    const removeCity = (city: string) => {
        setSelectedCities(selectedCities.filter((c) => c !== city));
    };

    const filteredCities = AVAILABLE_CITIES.filter(
        (city) =>
            city.toLowerCase().includes(cityInput.toLowerCase()) &&
            !selectedCities.includes(city),
    );

    return (
        <form onSubmit={handleSubmit} className={cn("space-y-8", className)}>
            {/* Search Input Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        Product Search
                    </label>
                    <Zap className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/5 rounded-[24px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="I'm looking for..."
                            className="w-full h-16 pl-14 pr-6 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[22px] text-lg font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Price Range Section */}
            <div className="space-y-4">
                <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 block">
                    Price Range (FCFA)
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min Price"
                            className="w-full h-14 px-5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max Price"
                            className="w-full h-14 px-5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* City Selection Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        Locations
                    </label>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {selectedCities.length} selected
                    </span>
                </div>
                <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        type="text"
                        placeholder="Add a city (e.g. Abidjan)"
                        value={cityInput}
                        onChange={(e) => {
                            setCityInput(e.target.value);
                            setShowCityDropdown(true);
                        }}
                        onFocus={() => setShowCityDropdown(true)}
                        className="w-full h-16 pl-14 pr-12 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[22px] text-lg font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                    />
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                    
                    {showCityDropdown && filteredCities.length > 0 && (
                        <div className="absolute top-[110%] left-0 w-full bg-white dark:bg-zinc-900 rounded-[24px] shadow-2xl border border-slate-100 dark:border-white/10 p-2 z-[60] animate-reveal overflow-hidden">
                            <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
                                {filteredCities.map((city) => (
                                    <button
                                        key={city}
                                        type="button"
                                        onClick={() => addCity(city)}
                                        className="w-full px-5 py-3.5 text-left rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 font-bold text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-all flex items-center justify-between group/item"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-slate-200 group-hover/item:bg-primary transition-colors" />
                                            {city.charAt(0).toUpperCase() + city.slice(1)}
                                        </div>
                                        <ChevronDown className="w-4 h-4 rotate-[-90deg] opacity-0 group-hover/item:opacity-100 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Selected Cities Badges */}
                {selectedCities.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1 animate-reveal">
                        {selectedCities.map((city) => (
                            <Badge
                                key={city}
                                className="h-9 px-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none font-bold text-xs flex items-center gap-2"
                            >
                                {city}
                                <button
                                    type="button"
                                    onClick={() => removeCity(city)}
                                    className="hover:scale-125 transition-transform"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </Badge>
                        ))}
                        {selectedCities.length > 1 && (
                            <button 
                                type="button" 
                                onClick={() => setSelectedCities([])}
                                className="text-xs font-bold text-slate-400 hover:text-rose-500 underline underline-offset-4 px-2"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Quick Filters */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 px-2">
                    <Filter className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Quick Filters</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {QUICK_FILTERS.map((f) => (
                        <button 
                            key={f.label}
                            type="button"
                            onClick={() => handleQuickFilter(f.query)}
                            className="h-10 rounded-xl border border-slate-100 dark:border-white/5 text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range Info */}
            <div className="p-5 bg-primary/5 dark:bg-primary/10 rounded-[24px] border border-primary/10 flex items-start gap-4">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
                    We compare prices across multiple cities to find the absolute best market value for your search.
                </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <Button 
                    type="submit" 
                    disabled={logging || !query.trim()}
                    className="w-full h-18 rounded-[28px] bg-primary text-white text-lg font-black hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 transition-all group"
                >
                    {logging ? (
                        <Loader2 className="w-7 h-7 animate-spin" />
                    ) : (
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <Zap className="w-5 h-5 text-white fill-white" />
                            </div>
                            Find the Best Deals
                        </div>
                    )}
                </Button>
            </div>
        </form>
    );
}
